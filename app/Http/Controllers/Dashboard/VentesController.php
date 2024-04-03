<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestEtatAchat;
use App\Models\Achat;
use App\Models\Notification;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class VentesController extends Controller
{
    private static $viewFolder = "Dashboard/CVentes";
    private static $imageFolder = "storage/datas/cventes/";
    private static $pageId = "ccommandes";
    private static $pageSubid = "cventes";
    private static $pageSubid2 = "clocations";
    private static $nbPerPage = 10;

    public function __construct(){
        $statics=[
            'page_id' => self::$pageId,
            'page_subid'=>self::$pageSubid

        ];
        Inertia::share($statics);
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function getCVentes(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total = Achat::where('etat','>',0)->count();
        Inertia::share(['total'=>$total,]);
        

        if(!empty($keyword)){
            $achats = Achat::where('etat',">",0)
            ->with('pays')
            ->with('transaction')
            ->with('ventes')
           ->whereHas('voitures', function ($query) use ($keyword) {
                $query  ->where('nom', 'like', "%{$keyword}%")
                        ->orWhere('couleur', 'like', "%{$keyword}%")
                        ->orWhere('puissance_moteur', 'like', "%{$keyword}%")
                        ->orWhere('type_transmission', 'like', "%{$keyword}%")
                        ->orWhere('immatriculation', 'like', "%{$keyword}%")
                        ->orWhere('description', 'like', "%{$keyword}%");
            })        
            
            ->orWhere('nom', 'like', "%{$keyword}%")
            ->orWhere('prenom', 'like', "%{$keyword}%")
            ->orWhere('montant', 'like', "{$keyword}%")
            ->with('voitures')->latest()->paginate($perPage);
        }else{            
            $achats = Achat::where('etat',">",0)
            ->with('pays')
            ->with('transaction')
            ->with('voitures')
            ->with('ventes')
            ->latest()->paginate($perPage);
        }
        
        $count = $achats->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'achats' => $achats,
            'page_title' => "Achats des ventes",
            'page_subtitle' => "Gestion des ventes de véhicules",
        ]);
    }

    public function getCVente($id)
    {
        $commande = Achat::where('etat',">",0)
        ->with('pays')
        ->with('transaction')
        ->with('voitures')
        ->with('ventes')
        ->with('user')->where('id',$id)->firstOrFail();
       
        $data_transation=null;
        $trans=$commande->transaction;
        if($trans){
            $data_transation=unserialize($trans->data);
        }
        $code =$commande->code_achat;
        return Inertia::render(self::$viewFolder . '/Show', [
            'commande' => $commande,
            'data_transation' => $data_transation,
            'page_title' => "Achat de voitures",
            'page_subtitle' => "Affichage de la commande ".$code,
        ]);
    }

    public function export()
    {
        $achats =  Achat::where('etat',">",0)
        ->with('pays')
        ->with('transaction')
        ->with('voitures')
        ->with('ventes')->get();
        return Inertia::render(self::$viewFolder . '/Export', [
            'achats' => $achats,
            'page_title' => "Achat de voitures",
            'page_subtitle' => "Export de la liste des achats de voitures ",
        ]);
    }
    public function updateEtat(Request $request)
    {
        $achatId=$request->input('id');
        $achat = Achat::where('id',$achatId)->firstOrFail();
        $etat=$request->input('etat');
        $a_etat=$achat->etat;
        $newetat=$request->input('newetat');
        $tableEtat=[0,1,2,3,4,5,6];
        
        if(in_array($newetat,$tableEtat)){
            $achat->etat =$newetat;
            $achat->save();
            $sms="L'état de l'achat a été effectuée avec succès.";
            $sms1="L'état d'un achat a été modifié avec succès.";
            $sms2="L'état de votre commande a été modifié";
            $link1= route('dashboard.cvente', ['id'=>$achat->id]);
            $link2= route('profile.getachat', ['id'=>$achat->id]);
            $user = Auth::user();
            $tn1 = new Notification([
                'message'=>$sms1,
                'type'=>"ADMIN",
                'lien'=>$link1,
            ]);
            $tn2 = new Notification( [
                'message'=>$sms2,
                'type'=>"ACHAT",
                'lien'=>$link2,
            ]);
            $tn1->save();
            $tn2->save(); 
            $user->notifications()->attach([$tn2->id]);
            
            Session::flash('success',
            [
                'title'=>'Mise à jour effectuée',
                'message'=>$sms,
            ]
            );
        }else{
            Session::flash('danger',
            [
                'title'=>'Mise à jour échouée',
                'message'=>"La mise a jour n'a pas aboutie. Veuillez revoir l'état choisie !",
            ]);
        }
       return back();
    }

}

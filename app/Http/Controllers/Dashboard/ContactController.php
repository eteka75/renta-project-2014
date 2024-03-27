<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestContact;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactController extends Controller
{
    private static $viewFolder = "Dashboard/Contacts";
    private static $imageFolder = "storage/datas/contacts/";
    private static $pageId = "support";
    private static $pageSubid = "contact";
    private static $nbPerPage = 10;
    /**
     * Display a listing of the resource.
     */
    public function __construct(){
        $statics=[
            
            'page_id' => self::$pageId,
            'page_subid' => self::$pageSubid,
        ];
        Inertia::share($statics);
    }
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10;
        Inertia::share(['total'=>Contact::count()]);

        if (!empty($keyword)) {
            $contacts = Contact::where('nom_prenom', 'LIKE', "%$keyword%")
                ->orWhere('email', 'LIKE', "%$keyword%")
                ->orWhere('telephone', 'LIKE', "%$keyword%")
                ->orWhere('message', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $contacts = Contact::latest()->paginate($perPage);
        }
       
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'contacts' => $contacts, 
            'count' => $contacts->count(), 
            'page_title' => "Pages",
            'page_subtitle' => "Gestion des messages envoyés du site",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       /* return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle page",
            'page_subtitle' => "Ajouter une nouvelle page du site",
        ]);*/
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'nom' => ["required","unique:marques,nom"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestContact())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);
        $data['slug']=$this->generateUniqueSlug($data['titre']);
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        Contact::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        return to_route('dashboard.contacts');
    }
    private static function generateUniqueSlug($title='')
    {
        $title=$title==''?Str::random(10) : $title;
        $slug = Str::slug($title);
        $count = Contact::where('slug', $slug)->count();
        
        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $contact=Contact::where('id', $id)->firstOrFail();
        $contact->update(['read'=>1]);
        $contact_name=$contact->nom_prenom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'contact' => $contact,
            'page_title' => "Message de ".$contact_name,
            'page_subtitle' => "Affichage de détail sur ".$contact_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $contact = Contact::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'contact' => $contact,
            'page_title' => "Edition de Page",
            'page_subtitle' => "Modification d'une page du site",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $contacts = Contact::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'contacts' => $contacts,
            'page_title' => "Liste des messages envoyés par les clients",
            'page_subtitle' => "Exportations des messages envoyés par les clients depuis le site",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestContact $request, $id){

        $contact = Contact::findOrFail($id);
        $data = $request->except('photo');
        //dd($request->all());
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $contact->update($data);
        if(isset($data['photo']) && $data['photo']!=''){
            $contact->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.contacts');
    }

    public function saveLogo(Request $request)
    {
        $nomLogo = '';
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
            $destinationPath = (self::$imageFolder);
            if (!Storage::exists($destinationPath)) {
                Storage::makeDirectory($destinationPath);
            }
            $file->move($destinationPath, $fileName);
            $nomLogo = self::$imageFolder . $fileName;
        }
        return $nomLogo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
        $contact = Contact::findOrFail($id);
        $contact->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.contacts');
    }
}

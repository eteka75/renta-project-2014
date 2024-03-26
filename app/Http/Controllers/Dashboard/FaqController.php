<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestFaq;
use App\Models\Faq;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RequestMarqueCategorieRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use App\Models\Categorie;
use Inertia\Inertia;

class FaqController extends Controller
{
    
    private static $viewFolder = "Dashboard/Faqs";
    private static $imageFolder = "storage/datas/faqs/";
    private static $pageId = "support";
    private static $pageSubid = "faqs";
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
        Inertia::share(['total'=>Faq::count()]);

        if (!empty($keyword)) {
            $faqs = Faq::where('question', 'LIKE', "%$keyword%")
                ->orWhere('reponse', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $faqs = Faq::latest()->paginate($perPage);
        }
        
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'faqs' => $faqs, 
            'count' => $faqs->count(), 
            'page_title' => "Forum aux questions",
            'page_subtitle' => "Gestion de questions et réponses clients",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle FAQ",
            'page_subtitle' => "Ajouter une nouvelle FAQ",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'question' => ["required","unique:marques,nom"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestFaq())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);
        $data['slug']=$this->generateUniqueSlug($data['question']);
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        Faq::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        return to_route('dashboard.faqs');
    }
    private static function generateUniqueSlug($title='')
    {
        $title=$title==''?Str::random(10) : $title;
        $slug = Str::slug($title);
        $count = Faq::where('slug', $slug)->count();
        
        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $faq=Faq::where('id', $id)->firstOrFail();
        $faq_name=$faq->question;
        return Inertia::render(self::$viewFolder . '/Show', [
            'faq' => $faq,
            'page_title' => "Page - ".$faq_name,
            'page_subtitle' => "Affichage de détail sur ".$faq_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $faq = Faq::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'faq' => $faq,
            'page_title' => "Edition de Page",
            'page_subtitle' => "Modification d'une page du site",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $faqs = Faq::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'faqs' => $faqs,
            'page_title' => "Liste des informations du FAQ",
            'page_subtitle' => "Exportations questions et réponses du Forum Aux Questions",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestFaq $request, $id){

        $faq = Faq::findOrFail($id);
        $data = $request->except('photo');
        //dd($request->all());
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $faq->update($data);
        if(isset($data['photo']) && $data['photo']!=''){
            $faq->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.faqs');
    }

    public function saveLogo(FormRequest $request)
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
        
        $faq = Faq::findOrFail($id);
        $faq->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.faqs');
    }
}

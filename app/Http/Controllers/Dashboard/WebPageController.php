<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestWebpage;
use App\Models\WebPage;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class WebPageController extends Controller
{
    private static $viewFolder = "Dashboard/WebPages";
    private static $imageFolder = "storage/datas/webpages/";
    private static $pageId = "support";
    private static $pageSubid = "pages";
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
        Inertia::share(['total'=>WebPage::count()]);

        if (!empty($keyword)) {
            $webpages = WebPage::where('nom', 'LIKE', "%$keyword%")
                ->orWhere('titre', 'LIKE', "%$keyword%")
                ->orWhere('contenu', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $webpages = WebPage::latest()->paginate($perPage);
        }
       
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'webpages' => $webpages, 
            'count' => $webpages->count(), 
            'page_title' => "Pages",
            'page_subtitle' => "Gestion des pages du site",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle page",
            'page_subtitle' => "Ajouter une nouvelle page du site",
        ]);
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
        $rules = array_merge((new RequestWebpage())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);
        $data['slug']=$this->generateUniqueSlug($data['titre']);
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        WebPage::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        return to_route('dashboard.webpages');
    }
    private static function generateUniqueSlug($title='')
    {
        $title=$title==''?Str::random(10) : $title;
        $slug = Str::slug($title);
        $count = WebPage::where('slug', $slug)->count();
        
        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $webpage=WebPage::where('id', $id)->firstOrFail();
        $webpage_name=$webpage->nom;
        return Inertia::render(self::$viewFolder . '/Show', [
            'webpage' => $webpage,
            'page_title' => "Page - ".$webpage_name,
            'page_subtitle' => "Affichage de détail sur ".$webpage_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $webpage = WebPage::findOrFail($id);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'webpage' => $webpage,
            'page_title' => "Edition de Page",
            'page_subtitle' => "Modification d'une page du site",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $webpages = WebPage::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'webpages' => $webpages,
            'page_title' => "Export des pages",
            'page_subtitle' => "Exportations des pages du site",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestWebpage $request, $id){

        $webpage = WebPage::findOrFail($id);
        $data = $request->except('photo');
        //dd($request->all());
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $webpage->update($data);
        if(isset($data['photo']) && $data['photo']!=''){
            $webpage->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.webpages');
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
        
        $webpage = WebPage::findOrFail($id);
        $webpage->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.webpages');
    }
}

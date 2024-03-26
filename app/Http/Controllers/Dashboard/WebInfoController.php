<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Requests\RequestWebInfo;
use App\Models\WebInfo;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WebInfoController extends Controller
{
    private static $viewFolder = "Dashboard/WebInfos";
    private static $imageFolder = "storage/datas/web_infos/";
    private static $pageId = "support";
    private static $pageSubid = "infos";
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
        Inertia::share(['total'=>WebInfo::count()]);

        if (!empty($keyword)) {
            $WebInfos = WebInfo::where('titre', 'LIKE', "%$keyword%")
                ->orWhere('code', 'LIKE', "%$keyword%")
                ->orWhere('contenu', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage)->withQueryString();
        } else {
            $WebInfos = WebInfo::latest()->paginate($perPage);
        }
       
        return Inertia::render(self::$viewFolder . '/Index', [
            'search_text' => $keyword,
            'infos' => $WebInfos, 
            'count' => $WebInfos->count(), 
            'page_title' => "Informations",
            'page_subtitle' => "Gestion des informations statiques du site",
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(self::$viewFolder . '/Create', [
            'page_title' => "Nouvelle informations",
            'page_subtitle' => "Ajouter une nouvelle information du site",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $additionalRules = [
            'titre' => ["required","unique:web_infos,titre"],
            'code' => ["required","unique:web_infos,code"],
        ];
        // Merge additional rules with the rules defined in the form request
        $rules = array_merge((new RequestWebInfo())->rules(), $additionalRules);
        $request->validate($rules);
        $data = $request->except(['photo']);
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        WebInfo::create($data);
        Session::flash('success',
        [
            'title'=>'Enrégistrement effectué',
            'message'=>'Les données ont été enregistrées avec succès!',
        ]
        );
        return to_route('dashboard.infos');
    }
    private static function generateUniqueSlug($title='')
    {
        $title=$title==''?Str::random(10) : $title;
        $slug = Str::slug($title);
        $count = WebInfo::where('slug', $slug)->count();
        
        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $WebInfo=WebInfo::where('id', $id)->firstOrFail();
        $WebInfo_name=$WebInfo->titre;
        return Inertia::render(self::$viewFolder . '/Show', [
            'info' => $WebInfo,
            'page_title' => " ".$WebInfo_name,
            'page_subtitle' => "Affichage de détail sur ".$WebInfo_name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $WebInfo = WebInfo::findOrFail($id);
        //dd($WebInfo);
        return Inertia::render(self::$viewFolder . '/Edit', [
            'info' => $WebInfo,
            'page_title' => "Edition de Page",
            'page_subtitle' => "Modification d'une page du site",
        ]);
    }
    /**
     * Export the form for editing the specified resource.
     */
    public function export(Request $request)
    {
        $WebInfos = WebInfo::all();
        return Inertia::render(self::$viewFolder . '/Export', [
            'infos' => $WebInfos,
            'page_title' => "Export des informations ",
            'page_subtitle' => "Liste des informations des pages du site",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, $id){
    public function update(RequestWebInfo $request, $id){

        $WebInfo = WebInfo::findOrFail($id);
        $data = $request->except('photo');
        //dd($request->all());
        if($request->hasFile('photo')){
            $getSave = $this->saveLogo($request);
            if ($getSave !== '') {
                $data['photo'] = $getSave;
            }
        }
        $WebInfo->update($data);
        if(isset($data['photo']) && $data['photo']!=''){
            $WebInfo->update([
                'photo' => $data['photo']
            ]);  
        }
        Session::flash('info',
        [
            'title'=>'Mise à jour effectuée',
            'message'=>'Les données ont été modifiées avec succès!',
        ]
        );
        return to_route('dashboard.infos');
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
        
        $WebInfo = WebInfo::findOrFail($id);
        $WebInfo->delete();
        Session::flash('warning',
        [
            'title'=>'Suppression effectuée',
            'message'=>"La Suppression de l'enrégistrement a été effectuée avec succès!",
        ]
        );
        return to_route('dashboard.infos');
    }
}

<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Achat;
use App\Models\Notification;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationsController extends Controller
{
    private static $viewFolder = "Dashboard/Notifications";
    private static $imageFolder = "storage/datas/notifications/";
    private static $pageId = "notifications";
    private static $pageSubid = "inotifications";
    private static $pageSubid2 = "anotifications";
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
    public function getNotifications(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total = Notification::admin()->count();
        Inertia::share(['total'=>$total,]);
        

        if(!empty($keyword)){
            $notifications = Notification::admin()
            ->where('message', 'like', "%{$keyword}%")
            ->latest()->paginate($perPage);
        }else{            
            $notifications = Notification::admin()
            ->latest()->paginate($perPage);
        }
        
        $count = $notifications->count();
        return Inertia::render(self::$viewFolder . '/Index', [
            'count' => $count,
            'search_text' => $keyword,
            'notifications' => $notifications,
            'page_title' => "Notifications",
            'page_subtitle' => "Consultation des notifications",
        ]);
    }

    public function getArchives(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = self::$nbPerPage > 0 ? self::$nbPerPage : 10; 
        $total = Notification::archived()->count();
        Inertia::share(['total'=>$total, 'page_subid'=>self::$pageSubid2]);
        

        if(!empty($keyword)){
            $notifications = Notification::archived()
            ->where('message', 'like', "%{$keyword}%")
            ->latest()->paginate($perPage);
        }else{            
            $notifications = Notification::archived()
            ->latest()->paginate($perPage);
        }
        
        $count = $notifications->count();
        return Inertia::render(self::$viewFolder . '/Archives', [
            'count' => $count,
            'search_text' => $keyword,
            'notifications' => $notifications,
            'page_title' => "Notifications",
            'page_subtitle' => "Liste des notifications archivées",
        ]);
    }

}

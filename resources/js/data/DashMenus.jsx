import { AiOutlineSetting } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsCart2, BsInfoCircle } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCarSportOutline, IoKeyOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { VscDashboard } from "react-icons/vsc";


export const menuItemsData = [
  {
    title: 'Tableau de bord',
    url: '/dashboard',
    id: 'dash',
    icon: <VscDashboard className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
  },  
  {
    title: 'Gérer les voitures',
    url: '',
    id: 'voitures',
    icon: <IoCarSportOutline className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
    sub: [
      {
        title: "Voitures",
        route: 'dashboard.voitures',
        sid:'voitures',
      },
      {
        title: "Marques",
        route: 'dashboard.marques',
        sid:'marques',
      },
      {
        title: "Catégories",
        route: 'dashboard.categories',
        sid:'categories'
      },
      {
        title: "Types de carburant",
        route: 'dashboard.carburants',
        sid:'carburants'
      }, 
      {
        title: "Systèmes de sécurité",
        route: 'dashboard.sys_securites',
        sid:'sys_securites'
      },
      {
        title: "Contrôles techniques",
        route: 'dashboard.controle_techniques',
        sid:'controles'
      },
      {
        title: "Opérations",
        route: 'dashboard.operations',
        sid:'operations'
      },     
    ],

  },
  {
    title: 'Gérer les locations',
    url: '',
    id: 'locations',
    icon: <IoKeyOutline className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
    sub: [
      {
        title: "En location",
        route: 'dashboard.locations',
        sid:'locations'
      },
      {
        title: "Points de retrait",
        route: 'dashboard.point_retraits',
        sid:'points'
      }, 
      {
        title: "Options de location",
        route: 'dashboard.location_options',
        sid:'options'
      }, 
      {
        title: "Localisations",
        route: 'dashboard.localisations',
        sid:'localisations'
      }, 
      {
        title: "Codes promo",
        route: 'dashboard.location_reductions',
        sid:'reductions'
      },
    ],

  },
  {
    title: 'Gérer les ventes',
    url: '',
    id: 'ventes',
    icon: <BsCart2 className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
    sub: [
      {
        title: "En vente",
        route: 'dashboard.ventes',
        sid:'ventes'
      },
      {
        title: "Options de vente",
        route: 'dashboard.option_ventes',
        sid:'options_vente'
      }
    ],

  },
  {
    title: 'Support clients',
    url: '',
    id: 'support',
    icon: <BsInfoCircle className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
    sub: [
      
      {
        title: "Pages",
        route: 'dashboard.webpages',
        sid:'pages'
      },
     
      {
        title: "Forums aux questions",
        route: 'dashboard.faqs',
        sid:'faqs'
      },
      {
        title: "Avis clients",
        route: 'dashboard.avis_clients',
        sid:'avis'
      },
      {
        title: "Informations",
        route: 'dashboard.infos',
        sid:'infos'
      },
      {
        title: "Messages contact",
        route: 'dashboard.contacts',
        sid:'contact'
      },
    ],
  },
  
  {
    title: 'Notifications',
    url: '',
    id: 'notifications',
    icon: <IoMdNotificationsOutline className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
    sub: [
      {
        title: "Notifications",
        route: 'dashboard.voitures',
        sid:'notifications'
      },
      {
        title: "Archives",
        route: 'dashboard.voitures.create',
        sid:'archives'
      }
    ],

  },
  {
    title: 'Gérer les utilisateurs',
    url: '',
    id: 'users',
    icon: <PiUsersThree className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
    sub: [
      {
        title: "Clients",
        route: 'dashboard.clients',
        sid:'clients'
      },
      {
        title: "Administrateurs",
        route: 'dashboard.voitures.create',
        sid:'admin'
      }
    ],

  }
];



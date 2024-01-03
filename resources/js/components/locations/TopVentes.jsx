
import '@/css/front.css';
import { setTarif } from '@/tools/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaAngleRight } from "react-icons/fa6";
import { LocaVoitureCard, VenteVoitureCard } from './LocaVoitureCard';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { FcNext, FcPrevious } from 'react-icons/fc';



export default function TopVentes({ ventes,className }) {
    const {t}=useTranslation();
    const smartphone = useMediaQuery({ maxWidth: 600 }); // Adjust the breakpoint as needed
    const tablette = useMediaQuery({ maxWidth: 1024 }); // Adjust the breakpoint as needed
    let slidesToShow = smartphone ? 1 :(tablette?2:3);
    let next='',prev='',arrows,nb_elt=0;
    next=(smartphone || tablette)?'':<FcNext />;
    prev=(smartphone || tablette)?'':<FcPrevious   />;
    arrows=(smartphone || tablette)?false:true;
    nb_elt=parseInt(ventes?.length);
    if(slidesToShow>nb_elt){slidesToShow=nb_elt;}
    const settings = {
        dots: true,
        arrows:arrows,
        autoplay:true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 5500,
        autoplay: true,
        fade: false,
        variableWidth: false,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        prevArrow: prev,
        nextArrow: next,
      };
    return (
        <>
        {ventes && ventes?.length>0 && 
            <div className={"dark:bg-slate-800 dark:text-slate-100 "+className}>
            <div className="max-w-screen-xl mx-auto  p-4">
                <h2 className="font-bold text-2xl  flex">
                    En ventes
                </h2>
                <p className="text-slate-600">Achetez et profitez de la liberté au quotidien</p>
                
                <div id='car' className="car-vehicules py-4">
                <Slider {...settings} className=''>
                    {ventes?.map(({voiture,id,tarif_location_heure,
                    tarif_location_journalier,tarif_location_hebdomadaire,
                    tarif_location_mensuel,prix_defaut,duree_garantie,kilometrage,prix_vente
                }, index) =>
                        <VenteVoitureCard 
                        className={'sm:p-2 sm:ps-0'} 
                        id={id}
                        garantie={duree_garantie}
                        prix_defaut={prix_defaut}
                        prix_vente={prix_vente}
                        kilometrage={kilometrage}
                        nb_personne={voiture?.nombre_place}
                        type_boite ={voiture?.type_transmission} 
                        vitesse={voiture?.nombre_vitesse}
                        nb_grande_valise={voiture?.nombre_grande_valise}
                        nb_petite_valise={voiture?.nombre_petite_valise}
                        volume_coffre={voiture?.volume_coffre}
                        marque={voiture?.marque?.nom}
                        categorie={voiture?.categorie?.nom}
                        nom={voiture?.nom} 
                        carburant={voiture?.type_carburant?.nom} 
                        photo={voiture?.photo} 
                        puissance={voiture?.puissance_moteur} 
                        tarif={setTarif(tarif_location_heure,tarif_location_journalier,tarif_location_hebdomadaire,tarif_location_mensuel)} 
                        key={index}/>
                        )}
                </Slider>
                </div>
                <div className='  my-6'>
                    <Link href={route('front.achats')} className=' items-center px-0 mx-auto flex  hover:opacity-70   text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:text-white'>
                        Consulter le catalogue
                        <FaAngleRight className="ms-1" />
                    </Link>
                </div>
                
            </div>
            </div>
    }
        </>
    )
}


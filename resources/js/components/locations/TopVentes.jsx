
import '@/css/front.css';
import { setTarif } from '@/tools/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaAngleRight } from "react-icons/fa6";
import { LocaVoitureCard, VenteVoitureCard } from './LocaVoitureCard';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { FcNext, FcPrevious } from 'react-icons/fc';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function TopVentes({ ventes,marque_id=0,nextbtn=1,toptext="Achetez et profitez de la liberté au quotidien",className }) {
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
            <div className={"dark:bg-gray-800/30  shadow dark:border-t dark:border-slate-700 relative dark:text-slate-100 "+className}>
                <div className="max-w-screen-xl mx-auto  p-4">
                <h2 className="font-bold text-2xl  flex">
                    En ventes
                </h2>
                <p className="text-slate-600 dark:text-slate-100">{toptext}</p>
                
                <div id='car' className="car-vehicules py-4 grid grid-cols-1">
                <Slider {...settings} className=''>
                    {ventes?.map(({voiture,id,tarif_location_heure,
                    tarif_location_journalier,tarif_location_hebdomadaire,
                    tarif_location_mensuel,prix_defaut,duree_garantie,kilometrage,prix_vente
                }, index) =>
                       ( <VenteVoitureCard 
                        className={'sm:m-2 max-w-[500px] rounded-md border sm:ps-0'} 
                        id={id}
                        garantie={duree_garantie}
                        prix_defaut={prix_defaut}
                        prix_vente={prix_vente}
                        kilometrage={kilometrage}
                        annee_fabrication={voiture?.annee_fabrication}
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
                        nb_images={voiture?.medias?.length}
                        tarif={setTarif(tarif_location_heure,tarif_location_journalier,tarif_location_hebdomadaire,tarif_location_mensuel)} 
                        key={index}/>
                        )
                        )}
                </Slider>
                </div>
                {nextbtn>0 && nextbtn==1 &&
                <div className='  my-6'>
                    <Link href={route('front.achats')} className='  w-max px-4 md:px-0 rounded-md py-2 dark:bg-gray-900 dark:border-slate-500 dark:border  md:dark:border-0 md:dark:bg-transparent  md:justify-start items-center mx-auto md:mx-0 flex  hover:opacity-70   text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:text-white'>
                        Consulter le catalogue
                        <FaAngleRight className="ms-1" />
                    </Link>
                </div>
                }
                {nextbtn>0 && nextbtn==2 && ventes?.length>3 && marque_id>0 &&
                <div className='  my-6'>
                    <Link href={route('front.marques.achats',{id:marque_id})} className=' items-center px-0 mx-auto flex  hover:opacity-70   text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:text-white'>
                        Découvrir plus
                        <FaAngleRight className="ms-1" />
                    </Link>
                </div>
                }
            </div>
            </div>
    }
        </>
    )
}



import '@/css/front.css';
import { setTarif } from '@/tools/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaAngleRight } from "react-icons/fa6";
import { LocaVoitureCard } from './LocaVoitureCard';
import { useState } from 'react';
import { useEffect } from 'react';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';
import { FcNext, FcPrevious } from 'react-icons/fc';

export default function LocationTop({ locations, className,marque_id=0, nextbtn=1, toptext="Louez à petit prix et voyagez en grand" }) {
    const { t } = useTranslation();
   

    const smartphone = useMediaQuery({ maxWidth: 600 }); // Adjust the breakpoint as needed
    const tablette = useMediaQuery({ maxWidth: 1024 }); // Adjust the breakpoint as needed
    let slidesToShow = smartphone ? 1 :(tablette?2:3);
    if(locations?.length<slidesToShow){
        slidesToShow=locations?.length;
    }
    let next='',prev='',arrows;
    next=(smartphone || tablette)?'':<FcNext className='absolute bg-white top-[47%] w-[40px] h-[40px] -right-6 border rounded-md  cursor-pointer -translate-[50] ' />;
    prev=(smartphone || tablette)?'':<FcPrevious   />;
    arrows=(smartphone || tablette)?false:true;

    //alert(slidesToShow)
    const settings = {
        dots: true,
        infinite: true,
        arrows:arrows,
        autoplay:true,
        autoplaySpeed: 7000,
        speed: 1100,
        pauseOnHover: true,
        variableWidth: false,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        prevArrow: prev,
        nextArrow: next,
      };
    
    return (
        <>
        {locations?.length>0 && 
        <div className=" darks:bg-gray-900 text-white dark:text-slate-100">
            <div className={"max-w-screen-xl mx-auto p-4 " + className}>
                <h2 className="font-bold text-2xl  mt-8 flex">
                    En location
                </h2>
                <p className="text-slate-600 dark:text-slate-400">{toptext}</p>                
                <div id='car' className="car-vehicules py-4">
                    {locations && locations?.length>0 &&
                        <Slider {...settings} className=''>
                    {locations && locations?.map(({id, voiture, tarif_location_heure,
                        tarif_location_journalier, tarif_location_hebdomadaire,
                        tarif_location_mensuel
                    }, index) =>
                        (
                            
                        <LocaVoitureCard
                            className='px-0 sm:px-2'
                            id={id}
                            nb_personne={voiture?.nombre_place}
                            type_boite={voiture?.type_transmission}
                            vitesse={voiture?.nombre_vitesse}
                            nb_grande_valise={voiture?.nombre_grande_valise}
                            nb_petite_valise={voiture?.nombre_petite_valise}
                            volume_coffre={voiture?.volume_coffre}
                            marque={voiture?.marque?.nom}
                            categorie={voiture?.nombre_petite_valise}
                            nom={voiture?.nom}
                            carburant={voiture?.type_carburant?.nom}
                            photo={voiture?.photo}
                            puissance={voiture?.puissance_moteur}
                            tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                            key={index} />
                            )
                    )}
                    </Slider>
                }
                </div>



                {nextbtn>0 && nextbtn==1 &&
                <div className='  my-6'>
                    <Link href={route('front.achats')} className=' items-center px-0 mx-auto dark:text-white flex bg-white hover:opacity-70   text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Plus d'offres
                        <FaAngleRight className="ms-1" />
                    </Link>
                </div>
                }
                 {nextbtn>0 && nextbtn==2 && marque_id>0 &&
                <div className='  my-6'>
                    <Link href={route('front.marques.locations',{id:marque_id})} className=' items-center px-0 mx-auto flex  hover:opacity-70   text-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold   text-center dark:text-white'>
                        Plus de locations
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


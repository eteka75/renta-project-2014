import FrontLayout from '@/Layouts/FrontLayout'
import ModaleShow from '@/components/ModaleShow';
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs';
import PageTitle from '@/components/front/PageTitle';
import { ShowInfo } from '@/components/locations/LocaVoitureCard';
import SuggestionsLocation from '@/components/locations/SuggestionsLocation';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { formaterMontant, setTarif } from '@/tools/utils';
import { Link } from '@inertiajs/react';
import {
    Button, Card, CardBody, Carousel} from '@material-tailwind/react';
import { t } from 'i18next';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
//import { Carousel } from 'react-responsive-carousel';
export default function ShowLocation({ location,locations_suggestion }) {
    const [datas, setData] = useState('');
    const [voiture, setVoiture] = useState();
    const { tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel } = location;
    useEffect(() => {
        setData(location);
        setVoiture(location?.voiture)
    }, [])
    return (
        <FrontLayout>
            <PageTitle  head={false} title={voiture?.nom} >
            <FrontBreadcrumbs pages={[{url:route('front.locations'),page:'Locations'},{url:'',page:voiture?.nom}]}  />
            </PageTitle>
            <div >
            <div className="bg-slate-50_ py-4 ">
            <div className="max-w-screen-xl mx-auto px-4 ">
                
                <div className="md:grid md:grid-cols-12 gap-4 ">
                    <div className="col-span-12 hidden">
                        <h1 className='text-2xl font-extrabold'>{voiture?.nom}</h1>
                        <div className="text-xl font-normal text-slate-600 dark:text-white">{voiture?.marque?.nom}</div>

                    </div>
                    <div className="lg:col-span-8 col-span-12">

                        <div className="">
                            {(voiture?.location_medias && voiture?.location_medias?.length > 0) ?
                                <div className="relative">
                                    <ModaleShow title={voiture?.nom}>
                                    <div className="p  rounded-lg  flex absolute h-32 lg:h-44 bottom-0 bg-gradient-to-t from-gray-800 z-10  w-full">
                                    </div>
                                    <Carousel
                                        className="carrousel rounded-xl "
                                        loop={true}
                                        transition= {{ type : "tween", duration: .65 }}
                                        autoplay={true}
                                        //autoplayDelay={10000}
                                        navigation={({ setActiveIndex, activeIndex, length }) => (
                                            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                                {new Array(length).fill("").map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                                            }`}
                                                        onClick={() => setActiveIndex(i)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    >

                                            {voiture?.photo && <img src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] md:h-[550px] transition-all duration-300 w-full  max-w-full rounded-none object-cover shadow-sm object-center' alt={voiture?.nom} />}
                                        {voiture?.location_medias?.map((media, index) => (
                                                <img key={index} src={HTTP_FRONTEND_HOME + "" + media?.url} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-none object-cover shadow-sm object-center' alt={media?.nom} />
                                        ))}
                                    </Carousel>
                                    </ModaleShow>

                                </div>
                                :
                                <div>
                                    {voiture?.photo && <img src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-xl  object-cover shadow-md object-center' alt={voiture?.nom} />}
                                </div>
                            }
                            {location?.views>0 && 
                            <div className="pt-4 text-slate-500">
                                Nombre de vues : {location?.views}
                            </div>}
                            {console.log("location",location)}
                            <div className='py-4'>

                                <ShowInfo
                                    nb_personne={voiture?.nombre_place}
                                    type_boite={voiture?.type_transmission}
                                    vitesse={voiture?.nombre_vitesse}
                                    nb_grande_valise={voiture?.nombre_grande_valise}
                                    nb_petite_valise={voiture?.nombre_petite_valise}
                                    volume_coffre={voiture?.volume_coffre}
                                    marque={voiture?.marque?.nom}
                                    dimenssions={voiture?.dimenssions}
                                    categorie={voiture?.nombre_petite_valise}
                                    np_portes={voiture?.nombre_portes}
                                    nom={voiture?.nom}
                                    consommation={voiture?.consommation}
                                    carburant={voiture?.type_carburant?.nom}
                                    photo={voiture?.photo}
                                    puissance={voiture?.puissance_moteur}
                                    emission_co2={voiture?.emission_co2}
                                    eclairage={voiture?.type_eclairage}
                                    suspenssion={voiture?.type_suspenssion}
                                    capacite={voiture?.capacite_reservoir}
                                    tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                                />
                                {voiture?.systeme_securites?.length > 0 &&
                                    <div className=" py-8 pb-4 border-b  ">
                                        <h2 className="text-xl font-bold">Systèmes de sécurité à bord</h2>
                                        <p className="text-md py-4">
                                            <ul>
                                                {voiture?.systeme_securites?.map((system, index) => (
                                                    <li className='flex text-md pb-2'>
                                                        <AiOutlineCheck className='me-2' />
                                                        {system?.nom}
                                                    </li>
                                                ))}
                                            </ul>
                                        </p>
                                    </div>
                                }
                                {voiture?.technologies_a_bord != null &&
                                    <div className='py-6 border-b'>
                                        <h2 className="text-xl font-bold">Autres technologies </h2>
                                        {voiture?.technologies_a_bord}
                                    </div>
                                }
                                <div className="py-6 ">
                                    <h2 className="text-xl font-bold">Conditions de location</h2>
                                    <p className="text-md py-4">
                                        <div id='_html' className='html' dangerouslySetInnerHTML={{ __html: location?.conditions }}></div>

                                    </p>
                                </div>
                                {location?.description &&
                                    <div className="py-4 border-t">
                                        <h2 className="text-xl font-bold">Description</h2>
                                        <p className="text-md">
                                            <div id='__html' className='html' dangerouslySetInnerHTML={{ __html: location?.description }}></div>
                                        </p>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 pb-12">
                        <Card className="shadow-none border border-yellow-500 bg-yellow-50 mb-6 rounded-lg">
                            <CardBody className="pb-2">
                            <div className="mb-4 border-b_">
                                <h1 className='text-2xl font-extrabold'>{voiture?.nom}</h1>
                                <div className="text-xl font-normal text-slate-600 dark:text-white">{voiture?.categorie?.nom}</div>

                            </div>
                            <div className="flex bg-zinc-50_shadow-sm justify-between border-yellow-500 py-4 border-b border-slate-100 flex-wrap bg gap-4  ">
                                    <div className=' w-1/4 font-bold'>
                                        {t('Marque')} 
                                    </div>
                                    <div >
                                      {voiture?.marque?.nom}
                                    </div>
                                </div>
                                {voiture?.annee_fabrication != "null" &&
                                    <div className="flex   py-4 border-b border-yellow-500 justify-between border-slate-100 flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Année')}
                                        </div>
                                        <div>
                                         {voiture?.annee_fabrication}
                                        </div>
                                    </div>}
                                {voiture?.couleur != null &&
                                    <div className="flex justify-between py-4 border-yellow-500 border-b   flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Couleur')}
                                        </div>
                                        <div>
                                         {voiture?.couleur}
                                        </div>
                                    </div>
                                }
                                
                                <div className="py-4 ">
                                    <div className="class rounded-md shadow-lgs border-[#c0d4ff]border ">
                                        <div className="mb-2 text-slate-600 text-md">Tarifs</div>
                                    <div className="grid grid-cols-1 p-4s gap-3">
                                        {location?.tarif_location_heure!=null && location.tarif_location_heure>0 &&
                                        <div className="tjour  p-4 hover:bg-white bg-[#fff] border-[#c0d4ff] border rounded-md">
                                            <h1 className="text-l font-extrabold">{formaterMontant(location?.tarif_location_heure??'0',i18n.language)}</h1>
                                            <small>Heure</small>
                                        </div>
                                        }
                                        {location?.tarif_location_journalier!=null && location?.tarif_location_journalier>0 &&
                                        <div className="tjour p-4 hover:bg-white bg-[#fff] border-[#c0d4ff] border rounded-md">
                                            <h1 className="text-l font-extrabold">{formaterMontant(location?.tarif_location_journalier??'0',i18n.language)}</h1>
                                            <small>Jour</small>
                                        </div>
                                        }
                                        {location?.tarif_location_hebdomadaire!=null && location?.tarif_location_hebdomadaire>0 &&
                                        <div className="tjour p-4 hover:bg-white bg-[#fff] border-[#91adeb] border rounded-md">
                                            <h1 className="text-l font-extrabold">{formaterMontant(location?.tarif_location_hebdomadaire??'0',i18n.language)}</h1>
                                            <small>Semaine</small>
                                        </div>
                                        }
                                        {location?.tarif_location_mensuel!=null && location.tarif_location_mensuel>0 &&
                                        <div className="tjour p-4 hover:bg-white bg-[#fff] border-[#c0d4ff] border rounded-md">
                                            <h1 className="text-l font-extrabold">{formaterMontant(location.tarif_location_mensuel??'0',i18n.language)}</h1>
                                            <small>Mois</small>
                                        </div>
                                        }
                                    </div>
                                </div>
                                </div>
                                <div className="">
                                    <Button color='yellow'  className='w-full  x-6 mb-4'>
                                        Réserver 
                                    </Button>                                    
                                    <Button color='blue'  className='w-full  x-6 mb-4'>
                                        Envoyer un message 
                                    </Button>                                    
                                </div>
                            </CardBody>
                        </Card>

                        <Card className=" bg-[#F2FFF7] border-[#39935d] border  shadow-none rounded-lg ">
                            <div className="p-4 rounded-t-md text-xl font-extrabol font-bold">Centre d'aide</div>
                            <div className="px-4 pb-4">
                                Pour réserver ou obtenir plus d'informations, contactez-nous par téléphone ou par e-mail. Nous sommes là pour vous aider ! 🚗✨
                            </div>
                            <div className="p-4 py-1 text-xl font-bold border-dashedt">
                                (+229) 44 17 77 44
                            </div>
                            <div className="p-4 font-bold text-blue-500 text-lg">
                                support@rentalcarbenin.com
                                <Link href={route('front.faqs')}>
                                    <Button variant='text' color='white' className='w-full dark:text-white hover:bg-black bg-[#39935d] text-white mt-4 mt-4'>
                                    Consulter le FAQ
                                </Button>
                                </Link>
                            </div>

                        </Card>
                    </div>
                </div>
                </div>
            </div>
            <SuggestionsLocation locations={locations_suggestion}/>
            </div>
        </FrontLayout>
    )
}

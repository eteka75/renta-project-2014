import FrontLayout from '@/Layouts/FrontLayout'
import ModaleShow from '@/components/ModaleShow';
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs';
import PageTitle from '@/components/front/PageTitle';
import CardShowInfo from '@/components/locations/CardShowInfo';
import { ShowInfo } from '@/components/locations/LocaVoitureCard';
import SuggestionsLocation from '@/components/locations/SuggestionsLocation';
import i18n from '@/i18n';
import { AddCartBtn } from '@/reducers/Cart';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { formaterMontant, isInFavoris, setTarif } from '@/tools/utils';
import { Link, usePage } from '@inertiajs/react';
import {
    Button, Card, CardBody, Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip
} from '@material-tailwind/react';
import { t } from 'i18next';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FaEye, FaHeart } from 'react-icons/fa';
import { FaHeartCrack } from 'react-icons/fa6';
import { IoIosChatbubbles } from 'react-icons/io';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ConrtactForm from './ContactForm';
//import { Carousel } from 'react-responsive-carousel';
export default function ShowLocation({ location, locations_suggestion, info }) {
    const { auth } = usePage().props;
    const [datas, setData] = useState('');
    const [voiture, setVoiture] = useState();
    const [open, setOpen] = React.useState(false);
    const handleContact = () => setOpen(!open);
    const [mobject, setMObjet] = useState('');

    const { tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel } = location;
    useEffect(() => {
        setData(location);
        setVoiture(location?.voiture);
        let m = "A propos de la location : " + voiture?.nom;
        if (location?.voiture?.immatriculation != '') {
            m = m + ' / ' + location?.voiture?.immatriculation;
        }
        if (location?.voiture?.annee_fabrication != '') {
            m = m + ' / ' + location?.voiture?.annee_fabrication;
        }
        setMObjet(m);
    }, []);

    return (
        <FrontLayout>
            <PageTitle head={false} title={voiture?.nom} >
                <FrontBreadcrumbs pages={[{ url: route('front.locations'), page: 'Locations' }, { url: '', page: voiture?.nom }]} />
            </PageTitle>
            <div >
                <Dialog open={open} handler={handleContact}>
                    <DialogHeader className='justify-between'>
                        <div> Envoyer un message</div>
                        <IconButton
                            color="blue-gray"
                            size="sm"
                            variant="text"
                            onClick={handleContact}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>

                    </DialogHeader>
                    <DialogBody className="px-4 md:px-8">
                        <ConrtactForm objet={mobject} />
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" onClick={handleContact}>
                            <span>Fermer</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
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
                                                    transition={{ type: "tween", duration: .65 }}
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

                                                    {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] md:h-[550px] transition-all duration-300 w-full  max-w-full rounded-none object-cover shadow-sm object-center' alt={voiture?.nom} />}
                                                    {voiture?.location_medias?.map((media, index) => (
                                                        <img key={index} src={HTTP_FRONTEND_HOME + "" + media?.url} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-none object-cover shadow-sm object-center' alt={media?.nom} />
                                                    ))}
                                                </Carousel>
                                            </ModaleShow>

                                        </div>
                                        :
                                        <div>
                                            {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] md:h-[550px] transition-all duration-300 w-full max-w-full rounded-xl  object-cover shadow-md object-center' alt={voiture?.nom} />}
                                        </div>
                                    }
                                    <div className="md:flex justify-between">

                                        {location?.views > 0 &&
                                            <Tooltip placement='top-start' title='Nombre de vues' content='Nombre de vues'>
                                                <div className="pt-3 mx-2 items-center flex flex-wrap gap-2 text-slate-500">
                                                    <FaEye /> <span className="flex md:hidden">Nombre de vues : </span>  {location?.views}
                                                </div>
                                            </Tooltip>
                                        }
                                        <div className="md:pt-2 flex flex-wrap md:gap-4">
                                            {auth?.user != null &&
                                                <>
                                                    {(isInFavoris(auth?.favoris, location?.id, 'LOCATION') == true) ?
                                                        <Tooltip placement="top-start"
                                                            className="border-0 border-blue-gray-50 bg-red-700  px-4 py-1 shadow-xl shadow-black/10"
                                                            content={t('Retirer des favoris')}>
                                                            <Link href={route('front.favoris.remove', { location_id: location?.id ?? 0, type: "LOCATION" })} 
                                                                className="flex hover:px-4 rounded-md hover:text-white hover:bg-red-700 transition-all duration-500 text-xs items-center py-1 font-medium gap-2 uppercase">

                                                                <FaHeartCrack className=" h-4 w-4" /> <span className='hidden md:flex'>Retirer des favoris</span>
                                                            </Link>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip placement="top-start" content={t('Ajouter aux favoris')} className="bg-gray-800">
                                                            <Link href={route('front.favoris.add', { location_id: location?.id ?? 0, type: "LOCATION" })} 
                                                                className="flex hover:px-4 rounded-md hover:text-white hover:bg-gray-800 transition-all duration-500 text-xs items-center py-1 font-medium gap-2 uppercase">

                                                                <FaHeart className=" h-5 w-5" /><span className='hidden md:flex'>Ajouter aux favoris</span>
                                                            </Link>
                                                        </Tooltip>}
                                                </>
                                            }

                                        </div>
                                    </div>
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
                                                                <AiOutlineCheck className='me-2 text-emerald-600' />
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
                                                    {location?.tarif_location_heure != null && location.tarif_location_heure > 0 &&
                                                        <div className="tjour  p-4 hover:bg-white bg-[#fff] border-[#c0d4ff] border rounded-md">
                                                            <h1 className="text-l font-extrabold">{formaterMontant(location?.tarif_location_heure ?? '0', i18n.language)}</h1>
                                                            <small>Heure</small>
                                                        </div>
                                                    }
                                                    {location?.tarif_location_journalier != null && location?.tarif_location_journalier > 0 &&
                                                        <div className="tjour p-4 hover:bg-white bg-[#fff] border-[#c0d4ff] border rounded-md">
                                                            <h1 className="text-l font-extrabold">{formaterMontant(location?.tarif_location_journalier ?? '0', i18n.language)}</h1>
                                                            <small>Jour</small>
                                                        </div>
                                                    }
                                                    {location?.tarif_location_hebdomadaire != null && location?.tarif_location_hebdomadaire > 0 &&
                                                        <div className="tjour p-4 hover:bg-white bg-[#fff] border-[#91adeb] border rounded-md">
                                                            <h1 className="text-l font-extrabold">{formaterMontant(location?.tarif_location_hebdomadaire ?? '0', i18n.language)}</h1>
                                                            <small>Semaine</small>
                                                        </div>
                                                    }
                                                    {location?.tarif_location_mensuel != null && location.tarif_location_mensuel > 0 &&
                                                        <div className="tjour p-4 hover:bg-white bg-[#fff] border-[#c0d4ff] border rounded-md">
                                                            <h1 className="text-l font-extrabold">{formaterMontant(location.tarif_location_mensuel ?? '0', i18n.language)}</h1>
                                                            <small>Mois</small>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">

                                            <Button color='yellow' v className='w-full  text-gray-800 flex gap-2 items-center justify-center py-4 dark:text-gray-900 hover:bg-yellow-600  my-4'>
                                                <MdOutlineShoppingCartCheckout className='h-5 w-6' />
                                                Louer cette voiture
                                            </Button>
                                            <Button color='blue' onClick={handleContact} className='w-full flex gap-2 items-center justify-center hover:bg-blue-700 x-6 mb-4'>
                                                <IoIosChatbubbles className='h-6 w-6' />  Envoyer un message
                                            </Button>

                                        </div>
                                    </CardBody>
                                </Card>
                                {info?.id > 0 &&
                                    <CardShowInfo
                                        title="Besoin d'aide ? "
                                        url={route('front.faq', { id: info?.id })}
                                        photo={info?.photo}
                                        content={info?.contenu}
                                        btninfo='Consulter le FAQ'
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
                <SuggestionsLocation locations={locations_suggestion} />
            </div>
        </FrontLayout>
    )
}

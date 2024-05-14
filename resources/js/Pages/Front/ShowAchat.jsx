import FrontLayout from '@/Layouts/FrontLayout';
import ModaleImage from '@/components/ModaleImage';
import ModaleShow from '@/components/ModaleShow';
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs';
import PageTitle from '@/components/front/PageTitle';
import CardShowInfo from '@/components/locations/CardShowInfo';
import { ShowInfo, VenteVoitureCard2 } from '@/components/locations/LocaVoitureCard';
import "@/css/front.css";
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { formaterMontant, formaterMontantCFA, isInFavoris, setTarif } from '@/tools/utils';
import { Link, usePage } from '@inertiajs/react';
import { Button, Card, CardBody, Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaHeart } from 'react-icons/fa';
import { IoIosChatbubbles } from 'react-icons/io';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { TbHeartOff } from 'react-icons/tb';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ConrtactForm from './ContactForm';
import { AddCartBtn } from '@/reducers/Cart';
import MetaHeader from '@/components/MetaHeader';
export default function ShowAchat({ vente, info, ventes_suggestion }) {
    const { auth } = usePage().props;
    const [voiture, setVoiture] = useState(null);
    const [open, setOpen] = useState(false);
    const handleContact = () => setOpen(!open);
    const [mobject, setMObjet] = useState('');
    useEffect(() => {
        const { voiture } = vente;
        setVoiture(voiture);
        let m = "A propos de la vente : " + voiture?.nom;
        if (vente?.voiture?.immatriculation) {
            m = m + ' / ' + vente?.voiture?.immatriculation;
        }
        if (vente?.voiture?.annee_fabrication) {
            m = m + ' / ' + vente?.voiture?.annee_fabrication;
        }
        setMObjet(m);
    }, [])
    const { t } = useTranslation();
    return (
        <FrontLayout>
            <PageTitle head={false} title={vente?.voiture?.nom +" à "+formaterMontantCFA(vente?.prix_vente??0)}>
                <FrontBreadcrumbs pages={[{ 'url': route("front.achats"), 'page': ("Achat de voitures") }, { 'url': "", 'page': (vente?.voiture?.nom) }]} />

            </PageTitle>
            <MetaHeader
            description={vente?.voiture?.description??vente?.voiture?.nom} 
            imageUrl={vente?.voiture?HTTP_FRONTEND_HOME+""+vente?.voiture?.photo:null} 
            author="ETEKA Wilfried" 
            title={vente?.voiture?.nom +" à "+formaterMontantCFA(vente?.prix_vente??0)} />
            <Dialog open={open} className='dark:bg-slate-800 dark:text-white' handler={handleContact}>
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
                    <Button variant="text" className='dark:text-gray-200' onClick={handleContact}>
                        <span>Fermer</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="grid grid-cols-12 gap-4 ">
                    <div className="col-span-12 hidden">
                        <h1 className='text-2xl font-extrabold'>{voiture?.nom}</h1>
                        <div className="text-xl font-normal text-slate-600 dark:text-white">{voiture?.marque?.nom}</div>

                    </div>
                    <div className="lg:col-span-8 col-span-12">

                        <div className="">
                            {(voiture?.medias && voiture?.medias?.length > 0) ?
                                <div className="relative">
                                    <div className="p  rounded-lg absolute h-32 lg:h-44 bottom-0 bg-gradient-to-t from-gray-800 z-10  w-full">
                                    </div>
                                    <ModaleShow title={voiture?.nom}>

                                        <Carousel
                                            className="carrousel rounded-xl "
                                            loop={true}
                                            transition={{ type: "tween", duration: .65 }}
                                            autoplay={true}
                                            //autoplayDelay={10000}
                                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                                <div className="absolute bottom-4 left-2/4 z-50 flex flex-wrap -translate-x-2/4 gap-2">
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
                                            {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] bg-gray-500 md:h-[550px] transition-all duration-300 w-full max-w-full rounded-none object-cover shadow-sm object-center' alt={voiture?.nom} />}
                                            {voiture?.medias?.map((media, idx) => (
                                                <LazyLoadImage key={idx} src={HTTP_FRONTEND_HOME + "" + media?.url} className='h-[350px] bg-gray-500 md:h-[550px] transition-all duration-300 w-full max-w-full rounded-none object-cover shadow-sm object-center' alt={media?.nom} />
                                            ))}
                                        </Carousel>
                                    </ModaleShow>

                                </div>
                                :
                                <ModaleImage url={HTTP_FRONTEND_HOME + "" + voiture?.photo} title={voiture?.nom} >
                                    {voiture?.photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + "" + voiture?.photo} className='h-[350px] bg-gray-500 md:h-[550px] transition-all duration-300 w-full max-w-full rounded-xl  object-cover shadow-md object-center' alt={voiture?.nom} />}
                                </ModaleImage>
                            }
                            <div className="md:flex justify-between">

                                {vente?.views > 0 &&
                                    <Tooltip placement='top-start' title='Nombre de vues' content='Nombre de vues'>
                                        <div className="pt-3 mx-2 items-center flex flex-wrap gap-2 text-slate-500">
                                            <FaEye /> <span className="flex md:hidden">Nombre de vues : </span>  {vente?.views}
                                        </div>
                                    </Tooltip>
                                }
                                <div className="md:pt-2 md:flex md:flex-wrap md:gap-4">
                                    {auth?.user != null &&
                                        <>
                                            {(isInFavoris(auth?.favoris, vente?.id, 'ACHAT') == true) ?
                                                <Tooltip placement="top-start"
                                                    className="border-0 border-blue-gray-50 bg-red-700  px-4 py-1 shadow-xl shadow-black/10"
                                                    content={t('Retirer des favoris')}>
                                                    <Link href={route('front.favoris.remove', { achat_id: vente?.id ?? 0, type: "ACHAT" })} method="post"
                                                        className="flex hover:px-4 bg-yellow-50 border border-yellow-500 md:border-0 w-full md:w-auto my-2 md:my-0  px-4 md:px-0 justify-center md:bg-transparent rounded-md hover:text-white hover:bg-gray-800 transition-all duration-500 text-xs items-center py-4 md:py-1 font-medium gap-2 uppercase">

                                                        <TbHeartOff className=" h-4 w-4" /> <span className=' md:flex'>Supprimer des favoris</span>
                                                    </Link>
                                                </Tooltip>
                                                :
                                                <Tooltip placement="top-start" content={t('Ajouter aux favoris')} className="bg-gray-800">
                                                    <Link href={route('front.favoris.add', { achat_id: vente?.id ?? 0, type: "ACHAT" })} method="post"
                                                        className="flex hover:px-4 bg-yellow-500 border border-yellow-500 md:border-0 w-full md:w-auto my-2 md:my-0  px-4 md:px-0 justify-center md:bg-transparent rounded-md hover:text-white hover:bg-gray-800 transition-all duration-500 text-xs items-center py-4 md:py-1 font-medium gap-2 uppercase">

                                                        <FaHeart className=" h-5 w-5" /><span className='md:flex'>Ajouter aux favoris</span>
                                                    </Link>
                                                </Tooltip>}
                                        </>
                                    }
                                    <AddCartBtn
                                        className='rounded-0'
                                        id={vente?.id}
                                        nom={vente?.voiture?.nom}
                                        photo={vente?.voiture?.photo}
                                        prix={vente?.prix_vente}
                                    />
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
                                    categorie={voiture?.categorie?.nom}
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
                                    tarif={formaterMontant(vente?.prix_vente, i18n.language)}
                                />
                                 {vente?.lien_video?.length > 0 &&
                                        <div className='html py-4 mt-4 text-sm rounded-sm' dangerouslySetInnerHTML={{__html:vente.lien_video}}></div>
                                               
                                        }
                                {voiture?.systeme_securites?.length > 0 &&
                                    <div className=" py-8 pb-4 border-b  ">
                                        <h2 className="text-xl font-bold">Systèmes de sécurité à bord</h2>
                                        <p className="text-md py-4">
                                            <ul>
                                                {voiture?.systeme_securites?.map((system, idx) => (
                                                    <li key={idx} className='flex text-md pb-2'>
                                                        <AiOutlineCheck className='me-2' />
                                                        {system?.nom}
                                                    </li>
                                                ))}
                                            </ul>
                                        </p>
                                    </div>
                                }
                                {voiture?.technologies_a_bord != null &&
                                    <div className='py-6 border-b dark:border-slate-600'>
                                        <h2 className="text-xl font-bold">Autres technologies </h2>
                                        {voiture?.technologies_a_bord}
                                    </div>
                                }

                                {vente?.description!=null &&
                                    <div className="py-8">
                                        <h2 className="text-xl font-bold">Description</h2>
                                        <p className="text-md py-2">
                                            <div id='_html' className='html' dangerouslySetInnerHTML={{ __html: vente?.description }}></div>
                                        </p>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 pb-12">
                        <Card className="shadow-none w-full bg-[#F2FFF7] border-[#39935d] dark:border-gray-600/60 dark:shadow-xl dark:text-white dark:bg-slate-500/40 border mb-6 rounded-lg">
                            <CardBody className="pb-2">
                                <div className="mb-4 border-b_">
                                    <h1 className='text-2xl font-extrabold'>{voiture?.nom}</h1>
                                    <div className="text-xl font-normal text-slate-600 dark:text-white">{voiture?.categorie?.nom}</div>

                                </div>
                                <div className="flex bg-zinc-50_shadow-sm justify-between py-4 border-[#cfddd5] dark:border-slate-600 border-b flex-wrap bg gap-4  ">
                                    <div className=' w-1/4 font-bold'>
                                        {t('Marque')}
                                    </div>
                                    <div >
                                        {voiture?.marque?.nom}
                                    </div>
                                </div>
                                {voiture?.annee_fabrication != "null" &&
                                    <div className="flex   py-4 border-b border-[#cfddd5] dark:border-slate-600 justify-between  flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Année')}
                                        </div>
                                        <div>
                                            {voiture?.annee_fabrication}
                                        </div>
                                    </div>}
                                {parseInt(voiture?.kilometrage) > 0 &&
                                    <div className="flex   py-4 border-b justify-between border-[#cfddd5] dark:border-slate-600 flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Kilométrage')} Km
                                        </div>
                                        <div>
                                            {vente?.kilometrage}
                                        </div>
                                    </div>}
                                {voiture?.couleur != null && voiture?.couleur != '' &&
                                    <div className="flex justify-between py-4 border-b  border-[#cfddd5] dark:border-slate-600 flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Couleur')}
                                        </div>
                                        <div>
                                            {voiture?.couleur}
                                        </div>
                                    </div>
                                }

                                {vente?.prix_vente > 0 &&
                                    <div className="flex justify-between py-4 border-b  border-[#cfddd5] dark:border-slate-600  flex-wrap gap-4  ">
                                        <div className='w-1/4 font-bold'>
                                            {t('Prix')}
                                        </div>
                                        <div className='text-2xl font-extrabold text-emerald-500 dark:text-yellow-500'>
                                            {formaterMontant(vente?.prix_vente, i18n.language)}
                                        </div>
                                    </div>
                                }
                                <div className="">
                                    <Link href={route('front.lachat1',{vid:vente.id??0})}>
                                    <Button color='white' v className='w-full  text-white bg-emerald-600 flex flex-wrap gap-2 border items-center justify-center py-4 dark:bg-yellow-500 dark:text-gray-800 dark:border-yellow-500 hover:bg-emerald-500/80 my-4'>
                                          {auth?.user===null ?         "Connectez-vous pour commander"  : "Commander"  }  <MdOutlineShoppingCartCheckout className='h-5 w-6' />
                                    </Button>
                                    </Link>
                                    <Button color='blue' onClick={handleContact} className='w-full flex flex-wrap gap-2 items-center hover:bg-blue-700 justify-center x-6 mb-4'>
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
                        {ventes_suggestion != null && ventes_suggestion?.length > 0 &&
            <div className="bg-gray-100 dark:bg-slate-700 shadow-inner py-4 lg:py-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="px-4">
                        <h2 className="text-lg lg:text-2xl font-bold uppercase mb-4">Recommandations</h2>
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 mt-4  lg:grid-cols-3 md:mt-8  gap-4">
                                    {ventes_suggestion?.map(({ voiture, id, tarif_location_heure,
                                        tarif_location_journalier, tarif_location_hebdomadaire,
                                        tarif_location_mensuel, duree_garantie, kilometrage, prix_vente
                                    }, index) => {
                                        return <VenteVoitureCard2
                                            id={id}
                                            garantie={duree_garantie}
                                            prix_vente={prix_vente}
                                            kilometrage={kilometrage}
                                            annee_fabrication={voiture?.annee_fabrication}
                                            nb_personne={voiture?.nombre_place}
                                            type_boite={voiture?.type_transmission}
                                            vitesse={voiture?.nombre_vitesse}
                                            nb_grande_valise={voiture?.nombre_grande_valise}
                                            nb_petite_valise={voiture?.nombre_petite_valise}
                                            volume_coffre={voiture?.volume_coffre}
                                            marque={voiture?.marque?.nom}
                                            categorie={voiture?.categorie?.nom}
                                            nom={voiture?.nom}
                                            carburant={voiture?.type_carburant?.nom}
                                            photo={voiture?.photo}
                                            nb_images={22}
                                            puissance={voiture?.puissance_moteur}
                                            tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                                            key={index} />
                                    })}

                                </div>
                            </>
                    </div>
                </div>
            </div>
                        }
        </FrontLayout>
    )
}

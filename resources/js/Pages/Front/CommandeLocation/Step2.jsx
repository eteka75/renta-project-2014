import InputLabel from '@/components/InputLabel'
import MiniFixedFooter from '@/components/MiniFixedFooter'
import PrimaryButton from '@/components/PrimaryButton'
import TextInput from '@/components/TextInput'
import { Head, useForm, usePage } from '@inertiajs/react'
import Logo from "@/assets/images/logo-v0-min.png";
import React from 'react';
import FooterMega from '@/components/FooterMega';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import InputError from '@/components/InputError'
import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { FaCog } from 'react-icons/fa'
import { AiOutlineMonitor } from 'react-icons/ai'
import { DateToFront, formaterMontant, getYearFromStringDate } from '@/tools/utils'
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import i18n from '@/i18n'
import { FaLocationDot } from 'react-icons/fa6'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { t } from 'i18next'
import { useState } from 'react'
export default function Step1({ date_debut, date_fin, location_id, location, montant, mtaxe, mtotal, voiture,points }) {
  const { auth, countries } = usePage().props
  const [date_naissance,setDateNais]=useState({
    startDate:null,
    endDate:null
  })
  const [date_expiration_permis,setDateExp]=useState({
    startDate:null,
    endDate:null
  })
  const page = usePage().props;
  const types_pieces = [
    { 'nom': "Carte d'itentité" },
    { 'nom': "Passport" },
    { 'nom': "Carte d'électeur" },
  ]
  const { data, setData, post, processing, errors, reset } = useForm({
    location_id: location_id,
    date_debut: date_debut,
    date_fin: date_fin,
    nom_complet: '',
    date_naissance: '',
    lieu_naissance: '',
    pays_id: '',
    type_piece_identite: '',
    numero_piece_identite: '',
    numero_permis: '',
    date_expiration_permis: '',
    nb_annee_conduite: '',
    adresse_residence: '',
    ville_residence: '',
    point_retrait_id: '',
    point_retrait: '',
    // _token: this.$page.props.csrf_token,
  });
  const handleDateNaisChange = (newValue) => {
    if (newValue) {
        const { startDate } = newValue;
        setDateNais(newValue);
        let year = getYearFromStringDate(startDate);
        if (startDate != '' && startDate != null && year != '1970') {
            let frDate = DateToFront(startDate, 'fr', 'd/m/Y');
            setData("date_naissance", frDate);
        } else {
          setDateNais({
                startDate: null,
                endDate: null
            });

            setData("date_naissance", '');
        }
    }
}
  const handlePointChange = (e) => {
    let value=e.target.value;
    setData('point_retrait_id',value)
    let getP=points.find((p)=>p.id==value);
    if(getP){
      setData('point_retrait',getP.lieu)
    }
  }
  const handleDateExpChange = (newValue) => {
    if (newValue) {
        const { startDate } = newValue;
        let year = getYearFromStringDate(startDate);
        if (startDate != '' && startDate != null && year != '1970') {
            setDateExp(newValue);
            let frDate = DateToFront(startDate, 'fr', 'd/m/Y');
            setData("date_expiration_permis", frDate);
        } else {
          setDateExp({
                startDate: null,
                endDate: null
            });
            setData("date_expiration_permis", '');
        }
    }
}
  useEffect(() => {
    setActiveStep(1);
    if(points && points.length>=1){
      let p=points[0];
      const  {lieu}=p;
      setData('point_retrait',lieu)
      //console.log(data.point_retrait)
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData(id, value);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(data)
//return;
    post(route('front.plcommande1'));
  };


  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const bg_active = "bg-emerald-500";

  return (
    <GuestLayout>
      <Head title="Conexion à votre compte" />
      <div className="bg-slate-50">
        <div className="py-2 bg-white shadow-sm">
          <div className='max-w-screen-xl mx-auto px-4 '>
            <Link
              href={"/"}
              className="flex items-center   space-x-3 rtl:space-x-reverse"
            >
              <img
                src={Logo}
                className="h-10"
                alt="Logo CRS Bénin"
              />
              <span className="self-center  sm:flex md:text-xl uppercase_ font-semibold whitespace-nowrap dark:text-white">
                Rental Car Services
              </span>
            </Link>
          </div>
        </div>
        <div className='max-w-screen-xl mx-auto p-4 px-[2%] relative'>

          <div>
            <h1 className="text-ms text-slate-500 py-4 uppercase mb-8 font-bold">Réservation de location</h1>
          </div>
          <div className="w-full md:px-12 ">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              activeLineClassName="!bg-emerald-400"
            >
              <Step className="h-4 w-4"

                activeClassName="ring-0 !bg-white !text-black border text-slate-50"
                completedClassName="!bg-emerald-500 text-emerald-600"
                onClick={() => setActiveStep(0)}>
                <div className="absolute -bottom-[2.3rem] w-maxs text-center">
                  <Typography
                    variant="h6"
                    className=' text-md'
                  >
                    Renseignements
                  </Typography>
                </div>
              </Step>
              <Step
                activeClassName="ring-0 !bg-white !text-black border text-slate-50"
                completedClassName="!bg-emerald-500 text-emerald-600"

                className={activeStep == 1 ? '  h-4 w-4' : ' h-4 w-4'} onClick={() => setActiveStep(1)}>

                <div className="absolute -bottom-[2.3rem] w-max text-center">
                  <Typography
                    variant="h6"

                  >
                    Payement
                  </Typography>
                </div>
              </Step>
              <Step className="h-4 w-4 !bg-blue-gray-50"
                activeClassName="ring-0 !bg-white border text-red-100"
                completedClassName="!bg-emerald-500 "
                onClick={() => setActiveStep(2)}>
                <div className="absolute -bottom-[2.3rem] w-max text-center">
                  <Typography
                    variant="h6"
                    color={activeStep === 2 ? "black" : "gray"}
                  >
                    Validation
                  </Typography>
                </div>
              </Step>
            </Stepper>

          </div>
          <form onSubmit={submit}>
            <div className=' py-14 min-h-[900px]'>
              <div className="md:grid md:grid-cols-12 gap-4">
                <div className="col-span-8 mb-6">
                  <Card className='shadow-sm border'>
                    <CardBody>
                      <div className="max-w-lg mx-auto xl:py-14">
                        <h2 className="text-lg uppercase font-bold text-black">Payement</h2>
                        <h2 className="text-sm mb-4 text-slate-500 font-bold">Renseigner vos informations et payez !</h2>
                        <div className="py-2">
                          <InputLabel htmlFor="nom_complet" value="Nom complet" />

                          <TextInput
                            id="nom_complet"
                            type="text"
                            name="nom_complet"
                            value={data.nom_complet}
                            className="mt-1 block w-full"
                            autoComplete="nom_complet"
                            isFocused={true}
                            onChange={(e) => setData('nom_complet', e.target.value)}
                          />
                          <InputError message={errors.nom_complet} className="mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mt-2">
                            <InputLabel htmlFor="date_naissance" value="Date de naissance" />

                            <Datepicker
                                        required
                                        id="date_naissance"
                                        asSingle={true}
                                        useRange={false}
                                        inputClassName="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        value={date_naissance}
                                        maxDate={new Date()}
                                        onChange={handleDateNaisChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={"dd/mm/yyyy"}
                                    />
                            <InputError message={errors.date_naissance} className="mt-2" />
                          </div>
                          
                          <div className="mt-2">
                            <InputLabel htmlFor="nb_annee_conduite" value="Nombre d'année de conduite" />

                            <TextInput
                              id="nb_annee_conduite"
                              type="number"
                              name="nationalite"
                              value={data.nb_annee_conduite}
                              className="mt-1 block w-full"
                              autoComplete="nb_annee_conduite"

                              onChange={(e) => setData('nb_annee_conduite', e.target.value)}
                            />
                            <InputError message={errors.nb_annee_conduite} className="mt-2" />
                          </div>
                        </div>
                        <div className="mt-2">
                            <InputLabel htmlFor="ville_residence" value="Ville de résidence" />

                            <TextInput
                              id="ville_residence"
                              type="text"
                              name="ville_residence"
                              value={data.ville_residence}
                              className="mt-1 block w-full"
                              autoComplete="ville_residence"

                              onChange={(e) => setData('ville_residence', e.target.value)}
                            />
                            <InputError message={errors.ville_residence} className="mt-2" />
                          </div>
                        <div className="mt-2">
                          <InputLabel htmlFor="adresse_residence" value="Adresse de résidence" />

                          <TextInput
                            id="adresse_residence"
                            type="text"
                            name="adresse_residence"
                            value={data.adresse_residence}
                            className="mt-1 block w-full"
                            autoComplete="adresse_residence"

                            onChange={(e) => setData('adresse_residence', e.target.value)}
                          />
                          <InputError message={errors.adresse_residence} className="mt-2" />
                        </div>
                        <div className="py-4 mt-4">
                          <PrimaryButton className="bg-blue-600 text-center whitespace-nowrap" disabled={processing}>
                            Continuer
                          </PrimaryButton>
                        </div>

                      </div>
                    </CardBody>
                  </Card>
                  
                </div>
                <div className="col-span-4">
                  
                  <Card className='mb-4 shadow-sm border'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Retrait et restitution du véhicule</h2>
                      <div className='flex gap-6'>
                        <div className="w-4 h-4 w- border-2 leading-5 border-gray-800 rounded-full">&nbsp;&nbsp;&nbsp;</div>
                        <div className=" text-sm">
                          {DateToFront(date_debut, i18n.language)}

                        </div>
                      </div>
                      <div className='mx-2'>
                        <div className="ps-6 pe-4 border-l border-gray-400  border-dotted">
                         
                          {points && points.length<=1 && points.map(({lieu})=>(
                          <div className="pb-4 text-sm font-bold flex gap-1 items-center">
                            <FaLocationDot />  {lieu}
                          </div>
                          ))}
                          {points && points?.length>1 && 
                             <div className="pb-4 px-1 font-bold flex gap-1 items-center">
                             <FaLocationDot /> 
                             <select className='py-1 focus:ring-0 text-sm pl-0 border-0 rounded-md'
                             onChange={handlePointChange}
                             >
                             {points?.map(({id,lieu})=>(

                              <option value={id}>{lieu}</option>
                             ))} 
                             </select>
                           </div>
                          }
                          <div className="text-ms pb-4 text-blue-500">
                            Les instructions pour le retrait
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-6'>
                        <div className="w-4 h-4 border-2 border-gray-800 mt-2 rounded-full">&nbsp;&nbsp;&nbsp;</div>
                        <div className="">
                          <div className=" font-bold text-sm flex gap-1 items-center">
                            <FaLocationDot />  {data.point_retrait}
                          </div>
                          <div className="text-sm">
                            {DateToFront(date_fin, i18n.language)}</div>

                        </div>

                      </div>
                      <div className='ps-6 pe-4'>

                      </div>
                    </CardBody>
                  </Card>
                  <Card className='mb-4 shadow-sm border'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Détail sur le véhicule</h2>
                      <div className="flex gap-4">
                      <div className='w-1/3'>
                       {console.log(voiture)}
                        {(voiture?.photo != null && voiture?.photo != '') ? 
                        
                          <LazyLoadImage effect='blur' className=" rounded-md md:max-h-60 hover:shadow-lg mx-auto w-full max-w-full  transition-all duration-500 object-cover shadow-sm object-center" src={HTTP_FRONTEND_HOME + '' + voiture?.photo} alt={voiture?.nom} />
                        
                          :
                            <LazyLoadImage effect='blur' className=" rounded-md h-60 w-full bg-[#fed023] mx-auto_ w-full_h-full_max-w-full  transition-all duration-500 object-contain shadow-sm object-center" src={default_photo1} alt={voiture?.nom} />
                        
                        }
                      </div>
                      <div>
                      <h1 className='text-xl font-extrabold'>
                        {voiture?.nom}
                      </h1>
                        <div className="text-sm font-normal text-slate-600 dark:text-white">{voiture?.categorie?.nom}
                        
                        </div>
                        <div className='text-sm font-bold'>
                        {voiture?.annee_fabrication!=null ?'Année '+voiture?.annee_fabrication:''}

                        </div>
                        

                      </div>
                      </div>
                      <div className="py-3 border-b_ ">
                       
                      </div>
                      <div className="flex bg-zinc-50_shadow-sm justify-between py-2 border-t border-b  flex-wrap bg gap-4  ">
                        <div className=' w-1/4 font-bold'>
                          {t('Marque')}
                        </div>
                        <div >
                          {voiture?.marque?.nom}
                        </div>
                      </div>
                      {voiture?.immatriculation != null &&
                        <div className="flex   py-2 border-b  justify-between border-slate-100_ flex-wrap gap-4  ">
                          <div className='w-1/4 font-bold'>
                            {t('Immatriculation')}
                          </div>
                          <div>
                            {voiture?.immatriculation}
                          </div>
                        </div>}
                      {voiture?.couleur != null &&
                        <div className="flex justify-between py-2  border-b   flex-wrap gap-4  ">
                          <div className='w-1/4 font-bold'>
                            {t('Couleur')}
                          </div>
                          <div>
                            {voiture?.couleur}
                          </div>
                        </div>
                      }
                    </CardBody>
                  </Card>
                  <Card className=' border shadow-sm'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Détail sur la tarification</h2>
                      <div className="flex justify-between mb-2">
                        <span>Sous-total</span>
                        <span>{formaterMontant(montant, i18n.language)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>{formaterMontant(mtaxe, i18n.language)}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg">{formaterMontant(mtotal, i18n.language)}</span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
        <FooterMega />
      </div>
    </GuestLayout >
  )
}

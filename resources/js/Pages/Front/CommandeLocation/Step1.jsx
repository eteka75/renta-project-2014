import GuestLayout from '@/Layouts/GuestLayout';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import Logo from "@/assets/images/logo-v0-min.png";
import FooterMega from '@/components/FooterMega';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { CheckIcon, DateToDbFormat, DateToFront, formaterMontant, getYearFromStringDate } from '@/tools/utils';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Step, Stepper, Typography } from '@material-tailwind/react';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { FaLocationDot } from 'react-icons/fa6';
import { FiInfo } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { PiFolderStarLight } from 'react-icons/pi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Datepicker from "react-tailwindcss-datepicker";
export default function Step1({ date_debut, date_fin, location_id, location, montant, mtaxe, mtotal, voiture,client,points }) {
  const { auth, countries } = usePage().props
  const [date_naissance,setDateNais]=useState({
    startDate:null,
    endDate:null
  })
  const [date_expiration_permis,setDateExp]=useState({
    startDate:null,
    endDate:null
  })
  const types_pieces = [
    { 'nom': "Carte d'itentité" },
    { 'nom': "Passport" },
    { 'nom': "Carte d'électeur" },
  ]
  const { data, setData, post, processing, errors, reset } = useForm({
    location_id: location_id,
    date_debut: date_debut,
    date_fin: date_fin, 
    nom: (client?.nom!=null)? (client?.nom ):'',    
    prenom: (client?.prenom!=null)? (client?.prenom ):'',
    email:auth?.user!=null? auth?.user?.email:'',
    date_naissance:client?.date_naissance!=null? DateToFront(client?.date_naissance,i18n.language,'d/m/Y'):'',
    lieu_naissance: client?.lieu_naissance!=null?client?.lieu_naissance :'',
    pays_id: client?.pays_id?client?.pays_id:'',
    type_piece_identite: client?.type_piece_identite?client?.type_piece_identite:'',
    numero_piece_identite: client?.numero_piece_identite?client?.numero_piece_identite:'',
    numero_permis: client?.numero_permis?client?.numero_permis:'',
    date_expiration_permis: client?.date_expiration_permis!=null? DateToFront(client?.date_expiration_permis,i18n.language,'d/m/Y'):'',
    nb_annee_conduite: client?.nb_annee_conduite?client?.nb_annee_conduite:'',
    adresse_residence: client?.adresse?client?.adresse:'',
    ville_residence: client?.ville_residence?client?.ville_residence:'',
    point_retrait_id: '',
    point_retrait: '',
    telephone: client?.telephone?client?.telephone:'',
    accept:0,
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
useEffect(()=>{
  if(client?.date_naissance!=null){
      let dateFNais=DateToDbFormat(client?.date_naissance);
      setDateNais({startDate:dateFNais,endDate:dateFNais});
  }
  if(client?.date_expiration_permis!=null){
      let dateFper=DateToDbFormat(client?.date_expiration_permis);
      setDateExp({startDate:dateFper,endDate:dateFper});
  }
},[])
  const handlePointChange = (e) => {
    let value=e.target.value;
    let getP=points.find((p)=>p.id==value);
    if(getP){
      setData(data => ({ ...data, 'point_retrait_id': getP.id,'point':getP, 'point_retrait': getP.lieu }));
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
    setActiveStep(0);
    console.log(data)
    if(points && points.length>=1){
      let p=points[0];
      const  {id, lieu}=p;
      setData(data => ({ ...data, 'point_retrait_id': id,'point':p, 'point_retrait': lieu }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData(id, value);
  };
  const submit = (e) => {
    e.preventDefault();
   // console.log(data)
    post(route('front.plcommande1',{id:location_id}));
  };

  const [open, setOpen] = React.useState(false); 
  const handleOpen = () => setOpen(!open);
  const [activeStep, setActiveStep] = useState(0);

  const bg_active = "bg-emerald-500";

  return (
    <GuestLayout>
      <Head title="Renseignement sur le client" />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Instructions de retrait</DialogHeader>
        <DialogBody>
        <div className='html' dangerouslySetInnerHTML={{__html:location?.instruction_retrait}}></div>
          
        </DialogBody>
        <DialogFooter>
          <Button  color="gray" onClick={handleOpen}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="bg-zinc-50">
        <div className="py-2.5 bg-white shadow-sm">
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
            <h1 className="text-ms text-slate-500 p-4 md: uppercase mb-8 font-bold">Réservation de location</h1>
          </div>
          <div className="w-full px-12">
            <Stepper
              activeStep={activeStep}
              activeLineClassName="!bg-emerald-400"
            >
              <Step className="h-4 w-4 "

                activeClassName="ring-0 !bg-white !text-black border text-slate-50"
                completedClassName="!bg-emerald-500 text-emerald-600"
               >
                <div className="absolute -bottom-[2.3rem] w-maxs text-center">
                  <Typography
                    variant="h6"
                    className='text-sm md:text-lg'
                  >
                    Renseignements
                  </Typography>
                </div>
              </Step>
              <Step
                activeClassName="ring-0 !bg-white !text-black border text-slate-50"
                completedClassName="!bg-emerald-500 text-emerald-600"

                className={activeStep == 1 ? '  h-4 w-4' : ' h-4 w-4'} >

                <div className="absolute -bottom-[2.3rem] w-max text-center">
                  <Typography
                    variant="h6"
                    className='text-sm md:text-lg'
                  >
                    Payement
                  </Typography>
                </div>
              </Step>
              <Step className="h-4 w-4 !bg-blue-gray-50"
                activeClassName="ring-0 !bg-white border text-red-100"
                completedClassName="!bg-emerald-500 "
                >
                <div className="absolute -bottom-[2.3rem] w-max text-center">
                  <Typography
                    variant="h6"
                  className='text-sm md:text-lg'
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
                      {auth?.user?.etat==1 ? 
                      <div className="max-w-lg mx-auto xl:py-14">
                        <h2 className="text-lg uppercase font-bold text-black">Données de facturation</h2>
                        <h2 className="text-sm mb-4 text-slate-500 font-bold">Veuillez renseigner les informations suivantes</h2>
                        
                        {points && points?.length>1 && <div className="pt-2">
                          <span className='flex'>
                          <InputLabel htmlFor="point_retrait_id"  >
                               Point de retrait</InputLabel>
                          </span>
                          {points && points?.length>1 && 
                             <div className="pb-4 px-1  flex gap-1 items-center">
                             <select className='border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                             onChange={handlePointChange}
                             >
                             {points?.map(({id,lieu},idx)=>(

                              <option key={idx} value={id}>{lieu}</option>
                             ))} 
                             </select>
                           </div>
                          }
                          <InputError message={errors.point_retrait_id} className="mt-2" />
                        </div>}
                        <div className="grid grid-cols-2 gap-4">
                        <div className="py-2">
                          <span className='flex'>
                            <InputLabel htmlFor="nom" value="Nom " />
                          <span className="text-red-500">*</span></span>
                          <TextInput
                            id="nom"
                            required
                            type="text"
                            name="nom"
                            value={data.nom}
                            className="mt-1 block w-full"
                            autoComplete="nom"
                            isFocused={true}
                            onChange={(e) => setData('nom', e.target.value)}
                          />
                          <InputError message={errors.nom} className="mt-2" />
                        </div>
                        <div className="py-2">
                          <span className='flex'>
                            <InputLabel htmlFor="prenom" value="Prénom " />
                          <span className="text-red-500">*</span></span>
                          <TextInput
                            id="prenom"
                            required
                            type="text"
                            name="prenom"
                            value={data.prenom}
                            className="mt-1 block w-full"
                            autoComplete="nom"
                            isFocused={true}
                            onChange={(e) => setData('prenom', e.target.value)}
                          />
                          <InputError message={errors.prenom} className="mt-2" />
                        </div>
                        </div>
                        <div className="py-2">
                          <span className='flex'>
                            <InputLabel htmlFor="email" value="Email" />
                          <span className="text-red-500">*</span></span>

                          <TextInput
                            id="email"
                            required
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                          />
                          <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="py-2">
                            <InputLabel htmlFor="telephone" value="Téléphone" />
                          

                          <TextInput
                            id="telephone"
                            type="tel"
                            name="telephone"
                            value={data.telephone}
                            className="mt-1 block w-full"
                            autoComplete="telephone"
                            onChange={(e) => setData('telephone', e.target.value)}
                          />
                          <InputError message={errors.telephone} className="mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mt-2">
                          <span className='flex'>
                            <InputLabel htmlFor="date_naissance" value="Date de naissance" />
                          <span className="text-red-500">*</span></span>
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
                          <span className='flex'>
                            <InputLabel htmlFor="lieu_naissance" value="Lieu de naissance" />
                            <span className="text-red-500">*</span></span>

                            <TextInput
                            required
                              id="lieu_naissance"
                              type="text"
                              name="lieu_naissance"
                              value={data.lieu_naissance}
                              className="mt-1 block w-full"
                              autoComplete="lieu_naissance"

                              onChange={(e) => setData('lieu_naissance', e.target.value)}
                            />
                            <InputError message={errors.lieu_naissance} className="mt-2" />
                          </div>
                        </div>


                        <div className="mt-2">
                          <InputLabel htmlFor="pays_id" value="Pays d'origine/Nationalité" />

                          <select
                            required
                            id="pays_id" value={data.pays_id}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                            <option value=''>Sélectionnez un pays</option>
                            {countries && countries.length > 0 && countries.map(({ id, nom_fr_fr }, index) =>
                              <option

                                key={index} value={id} >{nom_fr_fr}</option>
                            )}
                          </select>
                          <InputError message={errors.nationalite} className="mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                          <div className="mt-2">
                          <span className='flex'>

                            <InputLabel htmlFor="type_piece_identite" value="Type de pièces d'identité" />
                            <span className="text-red-500">*</span></span>

                            <select
                              id="type_piece_identite" value={data.type_piece_identite}
                            required

                            onChange={handleInputChange}
                              className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                              <option >Sélectionnez</option>
                              {types_pieces && types_pieces.length > 0 && types_pieces.map(({ nom }, index) =>
                                <option

                                  key={index} value={nom} >{nom}</option>
                              )}
                            </select>
                            <InputError message={errors.type_piece_identite} className="mt-2" />
                          </div>
                          <div className="mt-2">
                          <span className='flex'>
                            <InputLabel htmlFor="numero_piece_identite" value="Numéro de la pièce d'identité" />
                            <span className="text-red-500">*</span></span>

                            <TextInput
                              id="numero_piece_identite"
                            required
                            type="text"
                              name="numero_piece_identite"
                              value={data.numero_piece_identite}
                              className="mt-1 block w-full"

                              onChange={(e) => setData('numero_piece_identite', e.target.value)}
                            />
                            <InputError message={errors.numero_piece_identite} className="mt-2" />
                          </div>

                        </div>
                        <div className="mt-2">
                          <InputLabel htmlFor="numero_permis" value="Numéro du permis" />

                          <TextInput
                            id="numero_permis"
                            type="text"
                            name="numero_permis"
                            value={data.numero_permis}
                            className="mt-1 block w-full"
                            autoComplete="numero_permis"

                            onChange={(e) => setData('numero_permis', e.target.value)}
                          />
                          <InputError message={errors.numero_permis} className="mt-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">


                          <div className="mt-2">
                            <InputLabel htmlFor="date_expiration_permis" value="Date d'expiration" />

                            <Datepicker
                                        id="date_expiration_permis"
                                        asSingle={true}
                                        useRange={false}
                                        inputClassName="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        value={date_expiration_permis}                                        
                                        onChange={handleDateExpChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={"dd/mm/yyyy"}
                                    />
                            <InputError message={errors.date_expiration_permis} className="mt-2" />
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
                        <span className='flex'>
                            <InputLabel htmlFor="ville_residence" value="Ville de résidence" />
                            <span className="text-red-500">*</span></span>

                            <TextInput
                              id="ville_residence"
                            required
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
                        <div className="block mt-4">

                                <div className="flex items-center">
                                    <input name="remember"
                                        checked={data.accept}
                                        onChange={(e) => setData('accept', e.target.checked?1:0)}
                                        type="checkbox" id="hs-basic-with-description" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
                                            focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500
                                            dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition 
                                            before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"/>
                                <label htmlFor="hs-basic-with-description" className="text-sm w-full text-gray-500 ms-3 dark:text-gray-300">J'accepte les condition d'utilisation, de location et de vente</label>
                              
                                </div>
                                <div className='w-full text-blue-500 md:ms-16 text-sm'><a href={route('front.termes')} target='_blanck'>Lire les termes et conditions</a></div>
                          <InputError message={errors.accept} className="mt-2" />
                            
                            </div>
                        <div className="py-4 mt-4">
                          <PrimaryButton className="bg-gray-800 text-yellow-500 text-center whitespace-nowrap" disabled={processing}>
                            Continuer <MdOutlineNavigateNext/> 
                          </PrimaryButton>
                        </div>

                      </div>:
                       <div className="p-4 sm:p-8 flex justify-center min-h-[560px] bg-white dark:bg-gray-800  sm:rounded-lg">

                       <div className="py-20 text-center">
                           <PiFolderStarLight className='h-32 mx-auto w-32 text-slate-200'/> 
                          <div className="font-semibold"> Veuillez faire valider votre compte pour continuer.</div>
                          <div className="text-xs text-slate-600"> Pour valider votre compte, vous devez soumettre votre dossier d'identification</div>
                          <Link className='' href={route('profile.identification.edit')}>
                           <Button color='blue' className='py-3
                            my-4 shadow-sm  '>Soummettre mon dossier </Button>
                           </Link>
                       </div>
               </div>
                      }
                    </CardBody>
                  </Card>
                  
                </div>
                <div className="col-span-4">
                  
                  <Card className='mb-4 shadow-sm border'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Retrait et restitution du véhicule</h2>
                      <div className='flex gap-6'>
                        
                        <div className="w-4 h-4 w- border-2 leading-5 border-gray-800 rounded-full">
                          &nbsp;</div>
                          <div className="font-bold text-sm flex gap-1 items-center">
                            <FaLocationDot />  {data?.point?.lieu}
                          </div>
                      </div>
                      <div className='mx-2'>
                        <div className="ps-8 pe-4 border-l border-gray-400  border-dotted">      
                        <div className=" text-sm">
                        
                          {DateToFront(date_debut, i18n.language)}

                        </div>                   
                          <div onClick={handleOpen} className="text-sm mt-4 pb-4 items-center cursor-pointer flex gap-1 text-blue-500">
                            <FiInfo  /> Les instructions pour le retrait
                          </div>
                          {data?.point?.map_local!=null &&
                          <div className='html max-w-full pb-4 mt-4 mb-2 overflow-auto' dangerouslySetInnerHTML={{__html:data?.point?.map_local}}></div>
                          }

                        </div>
                      </div>
                      <div className='flex gap-6'>
                        <div className="w-4 h-4 border-2 border-gray-800 mt-2 rounded-full">&nbsp;&nbsp;&nbsp;</div>
                        <div className="">
                          <div className=" font-bold text-sm flex gap-1 items-center">
                            <FaLocationDot />  {data?.point?.lieu}
                          </div>
                          <div className="text-sm">
                            {DateToFront(date_fin, i18n.language)}</div>

                        </div>

                      </div>
                      <div className='ps-6 pe-4'>
                      <InputError message={errors.point_retrait_id} className="mt-2" />

                      </div>
                    </CardBody>
                  </Card>
                  <Card className='mb-4 shadow-sm border'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Détail sur le véhicule</h2>
                      <div className="flex gap-4">
                      <div className='w-1/3'>
                        {(location?.voiture?.photo != null && location?.voiture?.photo != '') ? 
                        
                          <LazyLoadImage effect='blur' className=" rounded-md md:max-h-60 hover:shadow-lg mx-auto w-full max-w-full  transition-all duration-500 object-cover shadow-sm object-center" src={HTTP_FRONTEND_HOME + '' + location?.voiture?.photo} alt={location?.voiture?.nom} />
                        
                          :
                            <LazyLoadImage effect='blur' className=" rounded-md h-60 w-full bg-[#fed023] mx-auto_ w-full_h-full_max-w-full  transition-all duration-500 object-contain shadow-sm object-center" src={default_photo1} alt={location?.voiture?.nom} />
                        
                        }
                      </div>
                      <div>
                      <h1 className='text-xl font-extrabold'>
                        {location?.voiture?.nom}
                      </h1>
                        <div className="text-sm font-normal text-slate-600 dark:text-white">{location?.voiture?.categorie?.nom}
                        
                        </div>
                        <div className='text-sm font-bold'>
                        {location?.voiture?.annee_fabrication!=null ?'Année '+location?.voiture?.annee_fabrication:''}

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
                          {location?.voiture?.marque?.nom}
                        </div>
                      </div>
                      {location?.voiture?.immatriculation != null &&
                        <div className="flex   py-2 border-b  justify-between border-slate-100_ flex-wrap gap-4  ">
                          <div className='w-1/4 font-bold'>
                            {t('Immatriculation')}
                          </div>
                          <div>
                            {location?.voiture?.immatriculation}
                          </div>
                        </div>}
                      {location?.voiture?.couleur != null &&
                        <div className="flex justify-between py-2  border-b   flex-wrap gap-4  ">
                          <div className='w-1/4 font-bold'>
                            {t('Couleur')}
                          </div>
                          <div>
                            {location?.voiture?.couleur}
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
                      <div className="flex justify-between  mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg text-emerald-500">{formaterMontant(mtotal, i18n.language)}</span>
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

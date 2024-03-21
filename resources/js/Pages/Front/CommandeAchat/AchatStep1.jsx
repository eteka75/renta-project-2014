import GuestLayout from '@/Layouts/GuestLayout';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import Logo from "@/assets/images/logo-v0-min.png";
import FooterMega from '@/components/FooterMega';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import i18n from '@/i18n';
import { Cart } from '@/reducers/Cart';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { CheckIcon, DateToDbFormat, DateToFront, InfoIcon, formaterMontant, getYearFromStringDate, setCmdAchatIdInArray, setCmdAchatIds } from '@/tools/utils';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Step, Stepper, Tooltip, Typography } from '@material-tailwind/react';
import { TextareaAutosize } from '@mui/material';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { CiLocationOn } from 'react-icons/ci';
import { FaLocationDot } from 'react-icons/fa6';
import { FiInfo } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { PiFolderStarLight } from 'react-icons/pi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Datepicker from "react-tailwindcss-datepicker";
export default function AchatStep1({ montant, mtaxe, code, mtotal, achats, client }) {
  const { auth, countries } = usePage().props
  const [achatsIds, setAchatIds] = useState('');
  const [classDate, setClassDate] = useState('');
  const [date_naissance, setDateNais] = useState({
    startDate: null,
    endDate: null
  })
  const types_pieces = [
    { 'nom': "Carte d'itentité" },
    { 'nom': "Passport" },
    { 'nom': "Carte d'électeur" },
  ]
  const { data, setData, post, processing, errors, reset } = useForm({
    vid: setCmdAchatIds(achats),
    achats: setCmdAchatIdInArray(achats),
    nom: (client?.nom != null) ? (client?.nom) : '',
    prenom: (client?.prenom != null) ? (client?.prenom) : '',
    email: auth?.user != null ? auth?.user?.email : '',
    date_naissance: client?.date_naissance != null ? DateToFront(client?.date_naissance, i18n.language, 'd/m/Y') : '',
    lieu_naissance: client?.lieu_naissance != null ? client?.lieu_naissance : '',
    pays_id: client?.pays_id ? client?.pays_id : '',
    type_piece_identite: client?.type_piece_identite ? client?.type_piece_identite : '',
    numero_piece_identite: client?.numero_piece_identite ? client?.numero_piece_identite : '',
    adresse_residence: client?.adresse ? client?.adresse : '',
    ville_residence: client?.ville_residence ? client?.ville_residence : '',
    point_retrait_id: '',
    point_retrait: '',
    infos: '',
    telephone: client?.telephone ? client?.telephone : '',
    accept: 0,
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
  useEffect(() => {
    setData('vid', setCmdAchatIds(achats))
    if (client?.date_naissance != null) {
      let dateFNais = DateToDbFormat(client?.date_naissance);
      setDateNais({ startDate: dateFNais, endDate: dateFNais });
    }

    setActiveStep(0);
  }, []);

  const getAchatIds = (achats) => {
    let t = []
    if (achats & achats.length > 0) {
      achats.map((achat) => {
        t.push(achat.id);
      });
    }
    return t.join('-');
  }


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData(id, value);
  };
  const submit = (e) => {
    e.preventDefault();
    let url = route('front.pachat1', { code: code, vid: data.vid });
    post(url);
  };

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <GuestLayout>
      <Head title="Renseignement sur le client" />
      <div className="bg-zinc-50 dark:bg-slate-900 dark:text-white">
        <div className="py-2.5 bg-white dark:bg-slate-700 dark:text-white shadow-sm">
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
            <h1 className="text-ms text-slate-500 p-4 md: uppercase mb-8 font-bold">Achat de voiture</h1>
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
                    className='text-sm dark:text-white md:text-lg'
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
                    className='text-sm dark:text-white md:text-lg'
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
                    className='text-sm dark:text-white md:text-lg'
                  >
                    Facturation
                  </Typography>
                </div>
              </Step>
            </Stepper>

          </div>
          <form onSubmit={submit}>
            <div className=' py-14 min-h-[900px]'>
              <div className="md:grid md:grid-cols-12 gap-4">
                <div className="col-span-8 mb-6 order-2  sm:order-1">
                  <Card className='shadow-sm border dark:bg-slate-800 dark:border-slate-700 dark:text-white'>
                    <CardBody>
                      {auth?.user?.etat == 1 ?
                        <div className="max-w-lg mx-auto xl:py-14">
                          <h2 className="text-lg uppercase font-bold text-black dark:text-white">Données de facturation</h2>
                          <h2 className="text-sm mb-4 text-slate-500 font-bold">Veuillez renseigner les informations suivantes</h2>
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
                          <div className="md:grid md:grid-cols-2 md:gap-4">
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
                            <div className="flex"><InputLabel htmlFor="pays_id" value="Pays d'origine/Nationalité" /><span className="text-red-500">*</span>
                            </div>

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
                          <div className="mt-2">
                            <InputLabel htmlFor="infos" value="Informations complémentaires" />

                            <TextareaAutosize
                              id="infos"
                              type="text"
                              name="infos"
                              value={data.infos}
                              className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                              autoComplete="adresse_residence"

                              onChange={(e) => setData('infos', e.target.value)}
                            />
                            <InputError message={errors.infos} className="mt-2" />
                          </div>
                          <div className="block mt-4">
                            <div className="flex items-center">
                              <input name="remember"
                                checked={data.accept}
                                onChange={(e) => setData('accept', e.target.checked ? 1 : 0)}
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
                            <PrimaryButton className="bg-gray-800 text-yellow-500 dark:bg-yellow-500 dark:text-black text-center whitespace-nowrap" disabled={processing}>
                              Continuer <MdOutlineNavigateNext />
                            </PrimaryButton>
                          </div>

                        </div> :
                        <div className="p-4 sm:p-8 flex justify-center min-h-[560px] bg-white dark:bg-gray-800  sm:rounded-lg">

                          <div className="py-20 text-center">
                            <PiFolderStarLight className='h-32 mx-auto w-32 text-slate-200' />
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
                <div className="col-span-4  order-1 sm:order-2">

                  <Card className='mb-4 shadow-sm border dark:bg-slate-800 dark:border-slate-700 dark:text-white'>
                    <div >
                      <h2 className="text-lg font-semibold mb-4 px-4 pt-4">Votre commande</h2>
                      <div className='overflow-hidden rounded-b-md'>
                        {achats?.length > 0 && achats.map(({ id, voiture, prix_vente, point_retrait, kilometrage }, index) => {
                          let bg = index % 2 === 0 ? 'bg-gray-100__' : ''
                          return (<div key={index} className={bg + " hover:bg-slate-200 dark:hover:bg-slate-800    dark:border-0 border-t mb-0  justify-between  gap-2"}>

                            <div className="grid grid-cols-2 gap-2 ">
                              <div>
                                {voiture?.photo != null && voiture?.photo != '' ?
                                  <Link href={route('front.achat', id)}>
                                    <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + voiture?.photo}
                                      className='h-32 w-full  object-center object-cover'
                                      alt={voiture?.nom} />
                                  </Link>
                                  : <Link href={route('front.achat', id)}>
                                    <LazyLoadImage src={default_photo1}
                                      className='h-32 w-full  object-center object-cover'
                                      alt={voiture?.nom} />
                                  </Link>
                                }
                              </div>
                              <Link href={route('front.achat', id)}>
                                <div className='py-2'>
                                  <Link className='font-bold' href={route('front.achat', id)}>
                                    {voiture?.nom ?? '-'}
                                  </Link>
                                  <div className='text-sm font-medium text-red-600'>{formaterMontant(prix_vente, i18n.language)} </div>
                                  <div className="flexflex-wrapgap-2 text-sm">
                                    <div>
                                      Année <span className='text-slate-500'>{voiture?.annee_fabrication} {voiture?.type_transmission ? ', ' + voiture?.type_transmission : ''}</span>
                                    </div>
                                    <div className="text-sm text-slate-500">
                                      <span className='text-slate-600 font-bold'>{kilometrage} Km</span>
                                    </div>
                                    {point_retrait != null && point_retrait != '' &&
                                      <Tooltip placement="top-start" content={t('Point de retrait')}>
                                        <span >Retrait à <span className='text-blue-500 flexitems-center'> {point_retrait ? point_retrait?.lieu : ''}</span></span>
                                      </Tooltip>}
                                  </div>


                                </div>
                              </Link>
                            </div>

                          </div>)
                        })}
                      </div>
                    </div>
                  </Card>

                  <Card className=' border shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Détail sur la tarification</h2>
                      <div className="flex justify-between mb-2">
                        <span>Sous-total</span>
                        <span>{formaterMontant(montant, i18n.language)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Taxe</span>
                        <span>{formaterMontant(mtaxe, i18n.language)}</span>
                      </div>
                      <hr className="my-2 dark:border-slate-600" />
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

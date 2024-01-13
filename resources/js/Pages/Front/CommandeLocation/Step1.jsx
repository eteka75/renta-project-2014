import InputLabel from '@/components/InputLabel'
import MiniFixedFooter from '@/components/MiniFixedFooter'
import PrimaryButton from '@/components/PrimaryButton'
import TextInput from '@/components/TextInput'
import { Head, useForm, usePage } from '@inertiajs/react'
import Logo from "@/assets/images/logo-v0-min.png";
import React from 'react'
import { IoLogInOutline } from 'react-icons/io5'
import ApplicationLogo from '@/Components/ApplicationLogo';
import FooterMega from '@/components/FooterMega';
import HeaderMenu from '@/components/HeaderMenu';
import Notification from '@/components/dashboard/Notification';
import LocationHeader from '@/components/locations/LocationHeader';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/components/InputError'
import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { FaCog } from 'react-icons/fa'
import { AiOutlineMonitor } from 'react-icons/ai'
import { DateToFront } from '@/tools/utils'
import i18n from '@/i18n'
import { FaLocationDot } from 'react-icons/fa6'
export default function Step1({ date_debut, date_fin, location_id }) {
  const { auth, countries } = usePage().props
  const page = usePage().props;
  const types_pieces = [
    { 'nom': "Carte d'itentité" },
    { 'nom': "Passport" },
  ]
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
    // _token: this.$page.props.csrf_token,
  });
  useEffect(() => {
    // console.log(page);
    //alert('OK')
    return () => {
      reset('password');
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData(id, value);
  };
  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };


  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

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
            <h1 className="text-ms text-slate-500 pb-4 uppercase mb-8 font-bold">Réservation de location</h1>
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
                  <Card>
                    <CardBody>
                      <div className="max-w-lg mx-auto xl:py-10">
                        <h2 className="text-lg uppercase font-bold text-black">Données de facturation</h2>
                        <h2 className="text-sm mb-4 text-slate-500 font-bold">Veuillez renseigner les informations suivantes</h2>
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

                            <TextInput
                              id="date_naissance"
                              type="text"
                              name="date_naissance"
                              value={data.date_naissance}
                              className="mt-1 block w-full"
                              autoComplete="date_naissance"

                              onChange={(e) => setData('date_naissance', e.target.value)}
                            />
                            <InputError message={errors.date_naissance} className="mt-2" />
                          </div>
                          <div className="mt-2">
                            <InputLabel htmlFor="lieu_naissance" value="Lieu de naissance" />

                            <TextInput
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
                            <InputLabel htmlFor="type_piece_identite" value="Type de pièces d'identité" />

                            <select
                              id="pays_id" value={data.pays_id}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                              <option value=''>Sélectionnez</option>
                              {types_pieces && types_pieces.length > 0 && types_pieces.map(({ nom }, index) =>
                                <option

                                  key={index} value={nom} >{nom}</option>
                              )}
                            </select>
                            <InputError message={errors.type_piece_identite} className="mt-2" />
                          </div>
                          <div className="mt-2">
                            <InputLabel htmlFor="numero_piece_identite" value="Numéro de la pièce d'identité" />

                            <TextInput
                              id="numero_piece_identite"
                              type="text"
                              name="numero_piece_identite"
                              value={data.numero_piece_identite}
                              className="mt-1 block w-full"
                              autoComplete="numero_piece_identite"

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
                            <InputLabel htmlFor="annee_conduite" value="Date d'expiration" />

                            <TextInput
                              id="annee_conduite"
                              type="text"
                              name="nationalite"
                              value={data.annee_conduite}
                              className="mt-1 block w-full"
                              autoComplete="annee_conduite"

                              onChange={(e) => setData('annee_conduite', e.target.value)}
                            />
                            <InputError message={errors.annee_conduite} className="mt-2" />
                          </div>
                          <div className="mt-2">
                            <InputLabel htmlFor="annee_conduite" value="Nombre d'année de conduite" />

                            <TextInput
                              id="annee_conduite"
                              type="text"
                              name="nationalite"
                              value={data.annee_conduite}
                              className="mt-1 block w-full"
                              autoComplete="annee_conduite"

                              onChange={(e) => setData('annee_conduite', e.target.value)}
                            />
                            <InputError message={errors.annee_conduite} className="mt-2" />
                          </div>
                        </div>
                        <div className="mt-2">
                          <InputLabel htmlFor="adresse" value="Adresse de résidence" />

                          <TextInput
                            id="adresse"
                            type="text"
                            name="adresse"
                            value={data.adresse}
                            className="mt-1 block w-full"
                            autoComplete="adresse"

                            onChange={(e) => setData('adresse', e.target.value)}
                          />
                          <InputError message={errors.adresse} className="mt-2" />
                        </div>
                        <div className="py-4 mt-4">
                          <PrimaryButton className="bg-blue-600 text-center whitespace-nowrap" disabled={processing}>
                            Continuer
                          </PrimaryButton>
                        </div>

                      </div>
                    </CardBody>
                  </Card>
                  <div className="py-4 hidden _flex justify-between">
                    <Button onClick={handlePrev} disabled={isFirstStep}>
                      Précedent
                    </Button>
                    <Button onClick={handleNext} disabled={isLastStep}>
                      Suivant
                    </Button>
                  </div>
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
                          <div className="pb-4 font-bold flex gap-1 items-center">
                            <FaLocationDot />  Abomey Cavali
                          </div>
                          <div className="text-ms pb-4 text-blue-500">
                            Les instructions pour le retrait
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-6'>
                        <div className="w-4 h-4 border-2 border-gray-800 mt-2 rounded-full">&nbsp;&nbsp;&nbsp;</div>
                        <div className="">
                          <div className=" font-bold flex gap-1 items-center">
                            <FaLocationDot />  Abomey Cavali
                          </div>
                          <div className="text-sm">
                            {DateToFront(date_fin, i18n.language)}</div>

                        </div>

                      </div>
                      <div className='ps-6 pe-4'>

                      </div>
                    </CardBody>
                  </Card>
                  <Card className=' border shadow-sm'>
                    <CardBody className='p-8'>
                      <h2 className="text-lg font-semibold mb-4">Détail sur la tarification</h2>
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>$19.99</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>$1.99</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>$0.00</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">$21.98</span>
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

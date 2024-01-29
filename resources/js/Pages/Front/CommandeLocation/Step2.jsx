import { Head, router, useForm, usePage } from '@inertiajs/react';

import GuestLayout from '@/Layouts/GuestLayout';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import Logo from "@/assets/images/logo-v0-min.png";
import FooterMega from '@/components/FooterMega';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, InfoIcon, formaterMontant } from '@/tools/utils';
import { Link } from '@inertiajs/react';
import { Alert, Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Step, Stepper, Typography } from '@material-tailwind/react';
import "https://cdn.fedapay.com/checkout.js?v=1.1.7";
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { FaLocationDot } from 'react-icons/fa6';
import { FiInfo } from 'react-icons/fi';
import { IoReload } from 'react-icons/io5';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function Step2({ date_debut, date_fin, location_id,reservation,code_valide=false, reservation_id, location, montant, mtaxe, mtotal, voiture, points }) {
  const { auth } = usePage().props
  //const { dispatch } = useCmd();
  /* const handleAddToCmd = (product) => {
        dispatch({ action: 'ADD_CMD', payload: product});
        handleOpenCart();
    };*/
  const handlePointChange = (e) => {
    let value = e.target.value;
    setData('point_retrait_id', value)
    let getP = points.find((p) => p.id == value);
    if (getP) {
      setData('point_retrait', getP.lieu)
    }
  }
  const { data, setData, post, processing, errors, reset } = useForm({
    location_id: location_id,
    reservation_id: reservation_id,
    montant: mtotal,
    data_transaction: null,
    raison: '',
  });
  useEffect(() => {
    setActiveStep(1);
    
    if(code_valide){
      initPayement();
    }
    setPointRetrait(); 
   
    return () => {
      // Code de nettoyage si nécessaire
      return window.location.reload();
    };
  }, []);

  const setPointRetrait=()=>{
     if (parseInt(mtotal) > 0 && points && points.length >= 1) {
      let p = points[0];
      const { lieu } = p;
      setData('point_retrait', lieu);
    }
  }
  const initPayement=()=>{
    FedaPay?.init({
     // public_key: 'pk_live_66Lv_poO0LjEM8JAeELetomF',
      public_key: 'pk_sandbox_bKqZEIh01Bx-avm8Jxd9Hey6', 
      transaction: {
        //amount: 100,
        amount: mtotal,
        description: 'Location de ' + voiture?.nom + '/' + voiture?.immatriculation
      },
      //environment:'live',
      locale: i18n.language,
      customer: {
        //id: (reservation) ? (reservation?.id) : null,
        email: (reservation) ? (reservation?.email) : null,
        firstname:(reservation) ? (reservation?.prenom):null,
        lastname:(reservation) ? (reservation?.nom):null,
        phone:(reservation) ? (reservation?.telephone):null,
      },
      onComplete: function ({ reason, transaction }) {
        let data_transaction = { 
          location_id: location_id,
          reservation_id: reservation_id,
          montant: mtotal,
          'transaction': transaction, 
          'reason': reason 
        };   
        localStorage.setItem('ltransaction', JSON.stringify(data_transaction));
        setTimeout(() => {
          if(reason=='CHECKOUT COMPLETE'){
            handleSubmit(data_transaction);
          }
        else{
          alert('Transaction non effectutée. Veuillez rééssayer !');
        }
        }, 1000);
      },
      container: '#embed'
    });
  }
  const checkLocalStorage=()=>{
     let ltrans = localStorage.getItem('ltransaction');
      console.log("DATA TRANSACTION",ltrans);
     ltrans = JSON.parse(ltrans);
     console.log("LTRANSACTION", ltrans);
     if (ltrans !== null) {
       //setData(data => ({ ...data, 'data_transaction': ltrans?.transaction, 'raison': ltrans?.raison}));
       //setData("raison", "okkk");
       //post(route('front.pcommande2'));
     }
  }



  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  //const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  //const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const bg_active = "bg-emerald-500";
  const handleSubmit = (data_transaction) => {
    router.visit(route('front.pcommande2',{id:reservation_id}), {
      method: 'post',
      data: data_transaction,
      replace: false,
      preserveState: false,
      preserveScroll: false,
      only: [],
      headers: {},
      errorBag: null,
      forceFormData: false,
      onCancelToken: cancelToken => {},
      onCancel: () => {},
      onBefore: visit => {},
      onStart: visit => {},
      onProgress: progress => {},
      onSuccess: page => {},
      onError: errors => {},
      onFinish: visit => {
        //localStorage.setItem('ltransaction',null);
      },
    }); 
  }
  const handleReload = () => {
    return window.location.reload();
  }
  return (
    <GuestLayout>
      <Head title="Payement" />

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Instructions de retrait</DialogHeader>
        <DialogBody>
          <div className='html' dangerouslySetInnerHTML={{ __html: location?.instruction_retrait }}></div>

        </DialogBody>
        <DialogFooter>
          <Button color="gray" onClick={handleOpen}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="bg-slate-50">

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
          <div className="w-full px-12 ">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              activeLineClassName="!bg-emerald-400"
            >
              <Step className="h-4 w-4"

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

                className={activeStep == 1 ? '  h-4 w-4' : ' h-4 w-4'} onClick={() => setActiveStep(1)}>

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
          <form onSubmit={handleSubmit} className='my-8' id="form_transaction">

            <div className=' py-8 min-h-[900px]'>

              <div className="md:grid md:grid-cols-12 gap-4">
                <div className="col-span-8 mb-6">
                  <Card className='shadow-sm border'>
                    <CardBody>
                      {/*<input type='hidden' disabled  name='reason' value={data?.raison} />*/}
                      <div className="py-4">
                      <Alert className='bg-red-100 text-red-500 mb-4' icon={<InfoIcon />}><b>Pour vous assurer de ne pas payer plusieurs fois</b> la même oération, veuillez actualiser la page et aller au bout du processus de payement, sans quoi votre location ne sera pas valide.
                      <Button color='gray' onClick={handleReload} size='sm' className='flex gap-1'><IoReload/> Actualiser</Button></Alert>
                      </div>
                      <div id="embed" style={{ height: '780px', padding: '0px 0' }}></div>
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

                          {points && points.length <= 1 && points.map(({ lieu }, idx) => (
                            <div key={idx} className="pb-4 text-sm font-bold flex gap-1 items-center">
                              <FaLocationDot />  {lieu}
                            </div>
                          ))}
                          {points && points?.length > 1 &&
                            <div className="pb-4 px-1 font-bold flex gap-1 items-center">
                              <FaLocationDot />
                              <select className='py-1 focus:ring-0 text-sm pl-0 border-0 rounded-md'
                                onChange={handlePointChange}
                              >
                                {points?.map(({ id, lieu }, idx) => (
                                  <option key={idx} value={id}>{lieu}</option>
                                ))}
                              </select>
                            </div>
                          }
                          <div onClick={handleOpen} className="text-sm pb-4 items-center cursor-pointer flex gap-1 text-blue-500">
                            <FiInfo /> Les instructions pour le retrait
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
                            {voiture?.annee_fabrication != null ? 'Année ' + voiture?.annee_fabrication : ''}

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

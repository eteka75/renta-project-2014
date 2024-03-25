import { Head, router, useForm, usePage } from '@inertiajs/react';

import Logo from "@/assets/images/logo-v0-min.png";
import React from 'react';
import FooterMega from '@/components/FooterMega';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import { Alert, Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Step, Stepper, Typography } from '@material-tailwind/react'
import { DateToFront, InfoIcon, formaterMontant } from '@/tools/utils'
import "react-datepicker/dist/react-datepicker.css";
import i18n from '@/i18n'
import { FaLocationDot } from 'react-icons/fa6'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { t } from 'i18next'
import { useState } from 'react';
import "https://cdn.fedapay.com/checkout.js?v=1.1.7";
import { FiInfo } from 'react-icons/fi';
import { Icon, Tooltip } from '@mui/material';
import { IoReload } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
export default function AchatStep2({ achats, achat, code_valide = false, code, achat_id, location, montant, mtaxe, mtotal, voiture, points }) {
  const { auth } = usePage().props
  const [nbvoiture,setNbvoiture]=useState('voiture')
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
    montant: mtotal,
    data_transaction: null,
    raison: '',
  });
  useEffect(() => {
    setActiveStep(1);

    if (code_valide) {
      initPayement();
    }
    let nbv= achats?.voitures?.length;
    if(nbv>1){
      setNbvoiture(nvb+'  voitures');
    }
    setPointRetrait();

    return () => {
      // Code de nettoyage si nécessaire
      return window.location.reload();
    };
  }, []);

  const setPointRetrait = () => {
    if (parseInt(mtotal) > 0 && points && points.length >= 1) {
      let p = points[0];
      const { lieu } = p;
      setData('point_retrait', lieu);
    }
  }
  const initPayement = () => {
    FedaPay?.init({
      public_key: 'pk_live_66Lv_poO0LjEM8JAeELetomF',
       //public_key: 'pk_sandbox_bKqZEIh01Bx-avm8Jxd9Hey6', 
      transaction: {
        //amount: 100,
        //amount: mtotal,
        description: 'Achats de '+nbvoiture+' (code :' + code + ')'
      },
      //environment:'live',
      locale: i18n.language,
      customer: {
        //id: (achat) ? (achat?.id) : null,
        email: (achat) ? (achat?.email) : null,
        firstname: (achat) ? (achat?.prenom) : null,
        lastname: (achat) ? (achat?.nom) : null,
        phone: (achat) ? (achat?.telephone) : null,
      },
      onComplete: function ({ reason, transaction }) {
        let data_transaction = {
          achat_id: achat_id,
          montant: mtotal,
          'transaction': transaction,
          'reason': reason
        };
        localStorage.setItem('ltransaction', JSON.stringify(data_transaction));
        setTimeout(() => {
          if (reason == 'CHECKOUT COMPLETE') {
            handleSubmit(data_transaction);
          }
          else {
            alert('Transaction non effectutée. Veuillez rééssayer !');
          }
        }, 1000);
      },
      container: '#embed'
    });
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
    router.visit(route('front.pachat2', { id: achat_id }), {
      method: 'post',
      data: data_transaction,
      replace: false,
      preserveState: false,
      preserveScroll: false,
      only: [],
      headers: {},
      errorBag: null,
      forceFormData: false,
      onCancelToken: cancelToken => { },
      onCancel: () => { },
      onBefore: visit => { },
      onStart: visit => { },
      onProgress: progress => { },
      onSuccess: page => { },
      onError: errors => { },
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
          <Button color="gray" className='dark:text-gray-200' onClick={handleOpen}>
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
            <h1 className="text-ms text-slate-500 p-4 md: uppercase mb-8 font-bold">Achat de voiture</h1>
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
                    Facturation
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
                        <Alert className='bg-red-100 text-red-500 mb-4' icon={<InfoIcon />}><b>Pour vous assurer de ne pas payer plusieurs fois</b> la même opération, veuillez actualiser la page et aller au bout du processus de payement, sans quoi votre location ne sera pas valide.
                          <Button color='gray' onClick={handleReload} size='sm' className='flex gap-1'><IoReload /> Actualiser</Button></Alert>
                      </div>
                      <div id="embed" style={{ height: '780px', padding: '0px 0' }}></div>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-span-4">
                  <Card className='mb-4 shadow-sm border'>
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
                                        <span className='text-blue-500 flex items-center'><CiLocationOn className='h-4 w-4' /> {point_retrait ? point_retrait?.lieu : ''}</span>
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

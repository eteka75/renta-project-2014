import { Head, useForm, usePage } from '@inertiajs/react'
import Logo from "@/assets/images/logo-v0-min.png";
import React from 'react';
import FooterMega from '@/components/FooterMega';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react'
import { DateToFront, formaterMontant } from '@/tools/utils'
import "react-datepicker/dist/react-datepicker.css";
import i18n from '@/i18n'
import { FaLocationDot } from 'react-icons/fa6'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { t } from 'i18next'
import { useState } from 'react';
import "https://cdn.fedapay.com/checkout.js?v=1.1.7";
export default function Step1({ date_debut, date_fin, location_id,reservation_id, location, montant, mtaxe, mtotal, voiture,points }) {
  const { auth } = usePage().props
 
  const handlePointChange = (e) => {
    let value=e.target.value;
    setData('point_retrait_id',value)
    let getP=points.find((p)=>p.id==value);
    if(getP){
      setData('point_retrait',getP.lieu)
    }
  }
  const { data, setData, post, processing, errors, reset } = useForm({
    location_id: location_id,
    date_debut: date_debut,
    date_fin: date_fin,
    nom_complet: (auth?.user!=null)? (auth?.user?.nom +" "+ auth?.user?.prenom):'',
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
    accept:0
    // _token: this.$page.props.csrf_token,
  });
  useEffect(() => {
    setActiveStep(1);
    if(points && points.length>=1){
      let p=points[0];
      const  {lieu}=p;
      setData('point_retrait',lieu)
      //console.log(data.point_retrait)
      FedaPay?.init({
        public_key: 'pk_live_jRxQ1cySUHrwMegyki6zn8Q5',
        transaction: {
          amount: 100,
          description: 'Location de '+voiture?.nom+'/'+voiture?.immatriculation
        },
        //environment:'live',
        locale:i18n.language,
        customer: {
          email: (auth?.user)?(auth?.user?.email):'',
          lastname:  (auth?.user)?(auth?.user?.nom):'',
          //lastname:  (auth?.user)?(auth?.user?.prenom):'',
        },
        onComplete: function({reason,transaction}){
          console.log(data);
          post(route('front.lcommande3',{'id':reservation_id}),{'id':reservation_id,'location_id':location_id,'data':transaction,'reason':reason});
        },
        container: '#embed'
     });
    }
  }, []);

 

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
          <form >
            <div className=' py-14 min-h-[900px]'>
              <div className="md:grid md:grid-cols-12 gap-4">
                <div className="col-span-8 mb-6">
                  <Card className='shadow-sm border'>
                    <CardBody>
                    <div id="embed" style={{height:'780px',padding:'0px 0'}}></div>
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
                         
                          {points && points.length<=1 && points.map(({lieu},idx)=>(
                          <div  key={idx} className="pb-4 text-sm font-bold flex gap-1 items-center">
                            <FaLocationDot />  {lieu}
                          </div>
                          ))}
                          {points && points?.length>1 && 
                             <div className="pb-4 px-1 font-bold flex gap-1 items-center">
                             <FaLocationDot /> 
                             <select className='py-1 focus:ring-0 text-sm pl-0 border-0 rounded-md'
                             onChange={handlePointChange}
                             >
                             {points?.map(({id,lieu},idx)=>(
                              <option key={idx} value={id}>{lieu}</option>
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

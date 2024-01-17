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
export default function Step1({ date_debut, date_fin, location_id, location, montant, mtaxe, mtotal, voiture,points }) {
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
    setActiveStep(2);
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
        customer: {
          email: (auth?.user)?(auth?.user?.email):'',
          lastname:  (auth?.user)?(auth?.user?.nom):'',
          //lastname:  (auth?.user)?(auth?.user?.prenom):'',
        },
        onComplete: function({ reason: number, transaction: object }){
          console.log("ARRRRR",reason,transaction)
          //post('',{'id':location_id,'reason':reason,'transation':transaction});
        },
        container: '#embed'
     });
    }
  }, []);

 

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
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
              activeLineClassName="!bg-emerald-400"
            >
              <Step className="h-4 w-4"

                activeClassName="ring-0 !bg-white !text-black border text-slate-50"
                completedClassName="!bg-emerald-500 text-emerald-600"
                >
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

                className={activeStep == 1 ? '  h-4 w-4' : ' h-4 w-4'} >

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
                >
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
              <div className="max-w-5xl mt-8 mx-auto">
                <div className="">
                  <Card className='shadow-sm border'>
                    <CardBody>
                    <div id="embed" style={{height:'780px',padding:'0px 0'}}></div>
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

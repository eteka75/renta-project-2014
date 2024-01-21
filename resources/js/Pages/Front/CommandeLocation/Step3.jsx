import { Head, useForm, usePage } from '@inertiajs/react'
import Logo from "@/assets/images/logo-v0-min.png";
import React from 'react';
import FooterMega from '@/components/FooterMega';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import "https://cdn.fedapay.com/checkout.js?v=1.1.7";
export default function Step1({ date_debut, date_fin, location_id, location, montant, mtaxe, mtotal, voiture,points }) {
  const { auth } = usePage().props
  const [activeStep, setActiveStep] = useState(0);
 
  
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
    }
  }, []);

 


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
                    <div className=" mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Facture Client</h2>

        <div className="mb-4">
            <p><span className="font-bold">Nom de l'Entreprise:</span> LocationVoiture XYZ</p>
            <p><span className="font-bold">Adresse:</span> 456 Rue de l'Entreprise, Ville</p>
            <p><span className="font-bold">Email:</span> contact@locationvoiture.com</p>
            <p><span className="font-bold">Téléphone:</span> 0123 456 789</p>
            <p><span className="font-bold">TVA:</span> FR123456789</p>
        </div>

        <div className="mb-4">
            <p><span className="font-bold">Nom du Client:</span> John Doe</p>
            <p><span className="font-bold">Adresse:</span> 123 Rue de la Facturation, Ville</p>
            <p><span className="font-bold">Email:</span> john.doe@example.com</p>
        </div>

        <table class="w-full mb-4 ">
            <thead>
                <tr className='border-b'>
                    <th class="py-2 text-start">Opération</th>
                    <th class="py-2 text-right">Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td class="py-2">Location de voiture (3 jours)
                    <div class="mb-4">
                        <p><span class="font-bold">Dates de Location:</span></p>
                        <p><span class="font-bold">Début:</span> 20 janvier 2024 à 10h00</p>
                        <p><span class="font-bold">Fin:</span> 23 janvier 2024 à 10h00</p>
                    </div>
                    </td>
                    <td class="py-2 text-right ">250 €</td>
                </tr>
                <tr>
                  <th className='text-start'>TVA : </th>
                  <td className='py-2 text-right'>0 €</td>
                </tr>
                <tr className='bg-gray-100 -b'>
                  <th className='text-start p-2 text-lg'>Total (TVA incluse): </th>
                  <td className='px-2 text-right'>250 €</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-8 text-center">
            <p>Merci de votre confiance!</p>

            <Button className='my-4 text-yellow-500'>Télécharger mon ticket</Button>
        </div>
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

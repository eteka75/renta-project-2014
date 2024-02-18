import GuestLayout from '@/Layouts/GuestLayout';
import Logo from "@/assets/images/logo-v0-min.png";
import FooterMega from '@/components/FooterMega';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, NumberToLetter, coveMonnaie, differenceEntreDeuxDates, formaterMontantCFA } from '@/tools/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { IoArrowBack } from 'react-icons/io5';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Step3({ transaction, reservation, num_facture, entete }) {
  const { auth } = usePage().props
  const [activeStep, setActiveStep] = useState(0);


  useEffect(() => {
    setActiveStep(2);

  }, []);
  const genererPDF = () => {
    // Créer une nouvelle instance de jsPDF
    //const pdf = new jsPDF();


    var doc = new jsPDF();

    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.querySelector("#contenuHTML");

    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save('fature-client-location-' + num_facture + '.pdf');
      },
      margin: [10, 2, 10, 2],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 200, //target width in the PDF document
      windowWidth: 675 //window width in CSS pixels
    });
  };


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
          <div className="w-full px-12 ">
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
              <Step
                activeClassName="ring-0 !bg-white !text-black border text-slate-50"
                completedClassName="!bg-emerald-500 text-emerald-600"
                className={activeStep == 2 ? '  h-4 w-4' : ' h-4 w-4'}
              >
                <div className="absolute -bottom-[2.3rem] w-max text-center">
                  <Typography
                    variant="h6"
                    className='text-sm md:text-lg'
                  >
                    Confirmation
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
                    <CardBody >
                      <div id="contenuHTML" className="overflow-auto mx-auto p-8">

                        <div className="mb-4 flex justify-between gap-4 flex-grow-0">

                          <div>
                            <div className="font-bold">RENTAL &nbsp; CAR &nbsp;SERVICES</div>
                            <div className='html text-slate-600 w-full text-sm' dangerouslySetInnerHTML={{ __html: entete?.contenu }}></div>

                          </div>
                          {(entete != null && entete?.photo != null) &&
                            <div>
                              <LazyLoadImage effect='blur' className=" rounded-full h-[80px]  transition-all duration-300  mx-auto w-full max-w-full  object-cover  object-center"
                                src={HTTP_FRONTEND_HOME + '' + entete?.photo} alt={entete?.photo} />

                            </div>
                          }

                        </div>
                        <div className="p-2 mb-4 bg-gray-100 font-bold items-center text-center text-xl">FACTURE &nbsp; DE LOCATION&nbsp; N° {num_facture}</div>
                        <div className="flex justify-between">
                          <div className="mb-4">
                            <p><span className="font-bold">Client &nbsp;:</span> {reservation?.nom} &nbsp;&nbsp; {reservation?.prenom}</p>
                            <p><span className="font-bold">Adresse &nbsp;:</span> {reservation?.adresse_residence} {reservation?.adresse_residence != null && reservation?.ville_residence != null && ", "} {reservation?.ville_residence ? reservation?.ville_residence : null}</p>
                            {reservation?.email != null && <p><span className="font-bold">Email &nbsp;:</span>  {reservation?.email}</p>}
                            {reservation?.telephone != null && <p><span className="font-bold">Tél &nbsp;:</span>  {reservation?.telephone}</p>}
                          </div>
                          <div className="mb-4">
                            <a target='_blanck' href={route('front.getRLocation', { code: reservation?.code_reservation })}> <QRCodeCanvas
                              id="qrCode"
                              value={route('front.getRLocation', { code: reservation?.code_reservation })}
                              size={100}
                              bgColor={"#ffffff"}
                              level={"H"}
                            /></a>
                          </div>
                        </div>

                        <table className="w-full mb-4 border ">
                          <thead>
                            <tr className='border-b  border-t'>
                              <th className="px-2 text-start">Opération</th>
                              <th className="border-l  text-center">Montant</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr >
                              <td className="p-2">
                                <div className="text-lg">Location de la voiture <b>{reservation?.voiture ? reservation?.voiture?.nom : ''}</b></div>
                                <div className="mb-4 text-sm text-slate-500 ps-3 mt-4  border-l-4">
                                  <p><span className="font-bold me-2">Immatriculation &nbsp;:</span><span>{reservation?.voiture ? reservation?.voiture?.immatriculation : ''}</span></p>
                                  <p><span className="font-bold me-2">Période &nbsp;:</span> &nbsp; {reservation?.date_debut ? DateToFront(reservation?.date_debut, i18n.language) : ''}  au {reservation?.date_fin ? DateToFront(reservation?.date_fin, i18n.language) : ''} &nbsp; <br />({differenceEntreDeuxDates(reservation?.date_debut, reservation?.date_fin)})</p>
                                  <p><span className="font-bold me-2"> Point de retrait &nbsp;:</span> &nbsp;{reservation?.point_retrait?.lieu} {reservation?.point_retrait?.adresse ? ", " + reservation?.point_retrait?.adresse : ''} </p>
                                </div>
                              </td>
                              <td className="border-l p-2 text-center ">{reservation?.montant != null ? formaterMontantCFA(reservation?.montant) : 's'}</td>
                            </tr>
                            <tr >
                              <th className='text-start p-2'>TVA : </th>
                              <td className='border-l p-2 text-center'>{reservation?.tva != null ? formaterMontantCFA(reservation?.tva) : '-'}</td>
                            </tr>
                            <tr className='bg-gray-100_ border-t border-b -b'>
                              <th className='text-start p-2 text-lg'>Total : </th>
                              <td nowrap="true" className='border-l px-2 text-center text-lg font-bold'>
                                {transaction?.montant != null ? formaterMontantCFA(reservation?.montant + reservation?.tva) : null}
                              </td>
                            </tr>
                            <tr className='bg-gray-100_ border-t border-b text-green-600 -b'>
                              <th className='text-start p-2 text-lg'>Montant payé &nbsp;: </th>
                              <td nowrap="true" className='border-l px-2 text-center text-lg font-bold'>
                                {transaction?.montant != null ? formaterMontantCFA(transaction?.montant) : null}
                              </td>
                            </tr>
                            {reservation?.montant - transaction?.montant > 0 &&
                              <tr className='bg-gray-100_ border-t border-b -b'>
                                <th className='text-start p-2 text-lg'>Reste à payer payé &nbsp;: </th>
                                <td nowrap="true" className='border-l px-2 text-center text-lg font-bold'>
                                  {transaction?.montant != null ? formaterMontantCFA(reservation?.montant - transaction?.montant) : null}
                                </td>
                              </tr>}
                          </tbody>
                        </table>
                        <div className="py-4">
                          Cette facture est arrêtée pour un montant de &nbsp;<span className='font-bold'>{NumberToLetter(reservation?.montant ?? 0)}&nbsp;{coveMonnaie(reservation?.montant ?? 0)}&nbsp;{reservation?.montant > 0 ? '(' + formaterMontantCFA(reservation?.montant) + ')' : null}</span>

                          <p className='italic text-sm'>Facture générée le {DateToFront(transaction?.created_at)}</p>

                        </div>
                        {reservation?.location?.instruction_retrait && <div className="border mt-8 p-4 text-green-900 rounded-md bg-green-50 border-green-500">
                          <h3 className="text-lg font-bold mb-4 -mt-2">Instructions &nbsp;&nbsp;pour&nbsp;le&nbsp;retrait&nbsp; de&nbsp;la&nbsp; location</h3>
                          <div className='html' dangerouslySetInnerHTML={{ __html: reservation?.location?.instruction_retrait }}></div>

                        </div>}
                        <div className="mt-8 text-center">
                          <p>Merci de votre confiance!</p>


                        </div>
                      </div>
                      <div className='my-4 mx-auto text-center'>
                        <Button onClick={genererPDF} size="lg" className='my-4 text-yellow-500'>Télécharger ma facture</Button>
                        <p className='text-center  flex justify-center '><Link href='/'><Button color='blue' className='my-1 flex gap-1 items-center'> <IoArrowBack /> Retour </Button></Link></p>
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

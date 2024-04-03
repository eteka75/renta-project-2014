import ActivityLayout from '@/Layouts/ActivityLayout';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { default as i18n } from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Head, Link, usePage } from '@inertiajs/react';
import "react-datepicker/dist/react-datepicker.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const TABLE_HEAD = ["Code", "Voiture", "Date début location", "Date fin location", "Etat", "Date d'ajout", "Actions"];
import default_photo1 from "@/assets/images/design/default_voiture.jpg";

import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react';
import React from 'react'
import { DateToFront, NumberToLetter, coveMonnaie, formaterMontant, formaterMontantCFA, getEtatAchat } from '@/tools/utils';
import { BiUserCheck } from 'react-icons/bi';
import jsPDF from 'jspdf';
import { useState } from 'react';
import { useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { IoArrowBack } from 'react-icons/io5';
import { FaFileInvoice, FaMoneyCheckAlt } from 'react-icons/fa';
import { LuCar } from 'react-icons/lu';

export default function Achat({ page_title, page_subtitle, achat,transaction,entete, num_facture, count = 0 }) {
 
    const { auth } = usePage().props;
    const [activeStep, setActiveStep] = useState(0);
    const genererPDF = () => {
        // Créer une nouvelle instance de jsPDF
        //const pdf = new jsPDF();


        var doc = new jsPDF();

        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.querySelector("#contenuHTML");

        doc.html(elementHTML, {
            callback: function (doc) {
                // Save the PDF
                doc.save('fature-achat-rental-car-services-' + num_facture + '.pdf');
            },
            margin: [10, 2, 10, 2],
            autoPaging: 'text',
            x: 0,
            y: 0,
            width: 200, //target width in the PDF document
            windowWidth: 675 //window width in CSS pixels
        });
    };
    useEffect(() => {
        let metat = parseInt(achat.etat);
        setActiveStep(metat);
    }, []);
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <DashHeadTitle title={page_title} subtitle={page_subtitle} />
                <Head title={auth.user.prenom + " " + auth.user.nom + " | " + page_title} />
                <Link href={route('profile.achats')}><Button variant='text' className='border bg-white items-center flex gap-2 px-4 me-2'><IoArrowBack/> Retour </Button></Link>
                <div className="overflow-auto">
                    <Card className='my-4 border shadow-none rounded-sm'>
                        <CardBody>
                            <h1 className='text-lg font-bold uppercase mb-4 flex justify-between items-center gap-4'> Commande N° {achat?.code_achat}  {getEtatAchat(achat?.etat)}</h1>
                            
                                <div className=" rounded-lg border p-6 my-4">
                                    <div className="font-bold text-slate-500 me-4 text-xl items-center  flex mb-4"> <BiUserCheck className='text-2xl  me-1 '/> Information de facturation</div>                                    
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Nom et prénom  :</div>
                                        <div>{achat?.nom +" "+ achat?.prenom}</div>
                                    </div>
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Email  :</div>
                                        <div>{achat?.email}</div>
                                    </div>
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Téléphone  :</div>
                                        <div>{achat?.telephone}</div>
                                    </div>
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Numéro de la pièce d'identité  :</div>
                                        <div className=''><span className="uppercase">{achat?.type_piece_identite} / </span>{achat?.numero_piece_identite}</div>
                                    </div>
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Nationalité  :</div>
                                        <div>{achat?.pays?.pays}</div>
                                    </div>
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Date de naissance  :</div>
                                        <div>{DateToFront(achat?.date_naissance,i18n.language,'d/m/Y')}</div>
                                    </div>
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Lieu de naissance  :</div>
                                        <div>{achat?.lieu_naissance}</div>
                                    </div>
                                    {achat?.infos && 
                                    <div className="flex flex-grow">
                                        <div className="font-bold me-4">Autres informations :</div>
                                        <div>{achat?.infos}</div>
                                    </div>
                                    }
                                </div>
                                <div className=" rounded-lg border p-6 my-4">
                                <div className="font-bold text-slate-500 me-4 text-xl items-center  flex mb-4"> 
                                <LuCar className='text-2xl  me-1 '/> Véhicule{(achat?.voitures?.length)>1?"s":''} acheté{(achat?.voitures?.length)>1?"s":''}</div>                                    

                                     {
                                achat && achat?.ventes?.map(({id,voiture,prix_vente, point_retrait,kilometrage},index)=>{
                                    return (
                                        <div key={index} className="flex flex-grow  bg-slate-50 bordert-t gap-2 ">
                                            <div>
                                                {voiture?.photo != null && voiture?.photo != '' ?
                                                    <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + voiture?.photo}
                                                    className='h-32 w-full  object-center object-cover'
                                                    alt={voiture?.nom} />
                                                : 
                                                <Link href={route('front.achat', id)}>
                                                    <LazyLoadImage src={default_photo1}
                                                    className='h-32 w-full  object-center object-cover'
                                                    alt={voiture?.nom} />
                                                </Link>
                                                }
                                            </div>
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
                                        </div>
                                    )
                                })
                               }
                                </div>
                                <div className=" rounded-lg border p-6 my-4">

                                <div className="font-bold text-slate-500 me-4 text-xl items-center  flex mb-4"> 
                                <FaMoneyCheckAlt className='text-2xl  me-1 '/> Payement</div>                                    
                                <div className="flex flex-grow">
                                        <div className="font-bold me-4"> Total de l'achat :</div>
                                        <div>{formaterMontant(achat?.total,i18n.language)}</div>
                                </div>
                                <div className="flex text-emerald-600 flex-grow">
                                        <div className="font-bold me-4"> Montant payé :</div>
                                        <div>{formaterMontant(achat?.transaction?.montant,i18n.language)}</div>
                                </div>
                                {parseInt(achat?.transaction?.montant)-parseInt(achat?.total)>0 &&
                                <div className="flex text-red-500 flex-grow">
                                        <div className="font-bold me-4"> Reste à payer :</div>
                                        <div>{parseInt(achat?.transaction?.montant)-parseInt(achat?.total)}</div>
                                </div>
                                }
                                <div className="flex flex-grow text-orange-800">
                                        <div className="font-bold me-4"> Frais de la transaction :</div>
                                        <div>{formaterMontant(achat?.transaction?.frais,i18n.language)}</div>
                                </div>
                                
                            <div className="flex text-slate-500 flex-grow">
                                    <div className="font-bold me-2">Commande effectuée le </div>
                                    <div>{DateToFront(achat?.created_at,i18n.language)}</div>
                                </div>
                               
                            </div>

                            <div className=''>
                            <div className=' min-h-[900px]'>
              <div className=" mt-8 mx-auto">
                <div className="">
                  <Card className='shadow-none border rounded-lg'>
                   
                    <CardBody >
                    <div className="font-bold  text-slate-500 me-4 text-xl items-center  flex mb-4"> 
                                <FaFileInvoice className='text-2xl  me-1 '/> Facture</div>
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
                        <div className="p-2 mb-4 bg-gray-100 font-bold items-center text-center text-xl">FACTURE &nbsp; D'ACHAT&nbsp; N° {num_facture}</div>
                        <div className="flex justify-between">
                          <div className="mb-4">
                            <p><span className="font-bold">Client &nbsp;:</span> {achat?.nom} &nbsp;&nbsp; {achat?.prenom}</p>
                            <p><span className="font-bold">Adresse &nbsp;:</span> {achat?.adresse_residence} {achat?.adresse_residence != null && achat?.ville_residence != null && ", "} {achat?.ville_residence ? achat?.ville_residence : null}</p>
                            {achat?.email != null && <p><span className="font-bold">Email &nbsp;:</span>  {achat?.email}</p>}
                            {achat?.telephone != null && <p><span className="font-bold">Tél &nbsp;:</span>  {achat?.telephone}</p>}
                          </div>
                          <div className="mb-4">
                            <a target='_blanck' href={route('front.getCAchat', { code: achat?.code_achat })}> <QRCodeCanvas
                              id="qrCode"
                              value={route('front.getCAchat', { code: achat?.code_achat })}
                              size={100}
                              bgColor={"#ffffff"}
                              level={"H"}
                            /></a>
                          </div>
                        </div>

                        <table className="w-full mb-4 border ">
                          <thead>
                            <tr className='border-b  border-t'>
                              <th className="px-2 text-start">Désignation</th>
                              <th className="border-l  text-center">Montant</th>
                            </tr>
                          </thead>
                          <tbody>
                            {achat?.ventes?.length > 0 && achat?.ventes?.map(({ voiture, prix_vente, point_retrait, kilometrage }, index) => (
                              <tr key={index}>
                                <td className="p-2 border-b">
                                  <div className="text-lg font-bold">{voiture?.nom} </div>
                                  <div className="text-slate-500 text-sm">
                                    <div>Année : {voiture?.annee_fabrication}</div>
                                    <div>Kilométrage : {kilometrage}</div>
                                    <div>Point retrait : {point_retrait?.lieu}</div>
                                  </div>
                                </td>
                                <td className="border-l p-2 border-b font-bold text-center ">{formaterMontantCFA(prix_vente)}</td>
                              </tr>
                            ))}
                            <tr >
                              <th className='text-start p-2'>TVA : </th>
                              <td className='border-l p-2 text-center'>{achat?.tva != null ? formaterMontantCFA(achat?.tva) : '-'}</td>
                            </tr>
                            <tr className='bg-gray-100_ border-t border-b -b'>
                              <th className='text-start p-2 text-lg'>Total : </th>
                              <td nowrap="true" className='border-l px-2 text-center text-lg font-bold'>
                                {achat?.total != null ? formaterMontantCFA(achat?.total) : null}
                              </td>
                            </tr>
                            <tr className='bg-gray-100_ border-t border-b text-green-600 -b'>
                              <th className='text-start p-2 text-lg'>Montant payé &nbsp;: </th>
                              <td nowrap="true" className='border-l px-2 text-center text-lg font-bold'>
                                {achat?.transaction?.montant != null ? formaterMontantCFA(achat?.transaction?.montant) : null}
                              </td>
                            </tr>
                            {achat?.total - achat?.transaction?.montant > 0 &&
                              <tr className='bg-gray-100_ border-t border-b -b'>
                                <th className='text-start p-2 text-lg'>Reste à payer payé &nbsp;: </th>
                                <td nowrap="true" className='border-l px-2 text-center text-lg font-bold'>
                                  {formaterMontantCFA(achat?.total - achat?.transaction?.montant) }
                                </td>
                              </tr>}
                          </tbody>
                        </table>
                        <div className="py-4">
                          Cette facture est arrêtée pour un montant de &nbsp;<span className='font-bold'>{NumberToLetter(achat?.montant ?? 0)}&nbsp;{coveMonnaie(achat?.montant ?? 0)}&nbsp;{achat?.montant > 0 ? '(' + formaterMontantCFA(achat?.montant) + ')' : null}</span>

                          <p className='italic text-sm'>Facture générée le {DateToFront(transaction?.created_at)}</p>

                        </div>
                        {achat?.location?.instruction_retrait && <div className="border mt-8 p-4 text-green-900 rounded-md bg-green-50 border-green-500">
                          <h3 className="text-lg font-bold mb-4 -mt-2">Instructions &nbsp;&nbsp;pour&nbsp;le&nbsp;retrait&nbsp; de&nbsp;la&nbsp; location</h3>
                          <div className='html' dangerouslySetInnerHTML={{ __html: achat?.location?.instruction_retrait }}></div>

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
                              
                            </div>
                        </CardBody>
                    </Card>
                    </div>
                    <div className=' my-8 px-12 '>
                                <div className="w-full  ">
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
                                                    className='text-sm dark:text-white '
                                                >
                                                    Paiement
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
                                                    className='text-sm dark:text-white '
                                                >
                                                    Facturation de l'achat
                                                </Typography>
                                            </div>
                                        </Step>
                                        <Step className="h-4 w-4 !bg-blue-gray-50"
                                            activeClassName="ring-0 !bg-white border "
                                            completedClassName="!bg-emerald-500 "
                                        >
                                            <div className="absolute -bottom-[2.3rem] w-max text-center">
                                                <Typography
                                                    variant="h6"
                                                    className='text-sm dark:text-white '
                                                >
                                                    Retrait 
                                                </Typography>
                                            </div>
                                        </Step>
                                    </Stepper>
                                </div>
                            </div>
            </div>
        </ActivityLayout>
    );
}

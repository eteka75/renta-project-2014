import ActivityLayout from '@/Layouts/ActivityLayout';
import Translate from '@/components/Translate';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { default as i18n } from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, NumberToLetter, coveMonnaie, differenceEntreDeuxDates, formaterMontantCFA, getEtatReservation } from '@/tools/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Card, CardBody, Step, Stepper, Typography } from '@material-tailwind/react';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { TbBrandGoogleMaps } from 'react-icons/tb';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const TABLE_HEAD = ["Code", "Voiture", "Date début location", "Date fin location", "Etat", "Date d'ajout", "Actions"];
export default function Location({ page_title, page_subtitle, reservation, entete, num_facture, transaction, count = 0 }) {
    const [showHead, setShowHead] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    const { auth } = usePage().props;
    const genererPDF = () => {
        // Créer une nouvelle instance de jsPDF
        //const pdf = new jsPDF();


        var doc = new jsPDF();

        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.querySelector("#contenuHTML");

        doc.html(elementHTML, {
            callback: function (doc) {
                // Save the PDF
                doc.save('fature-location-rental-car-services-' + num_facture + '.pdf');
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
        let metat = parseInt(reservation.etat);
        if (metat > 0) {
            setActiveStep(metat);
        }
    }, []);
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('profile.locations')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
                </DashHeadTitle>
                <Head title={auth.user.prenom + " " + auth.user.nom + " | " + page_title} />

                <div className="overflow-auto ">

                    {reservation?.voiture != null &&
                        <>
                            <Card className='shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white'>
                                <CardBody className={" overflow-auto"}>
                                    <div className="absolute right-4 top-4">
                                        {getEtatReservation(reservation?.etat)}

                                    </div>
                                    <Link href={route('front.location', { id: reservation?.location_id })}>
                                        <div className="flex gap-4">
                                            <div>
                                                {reservation?.voiture?.photo != null &&
                                                    <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + reservation?.voiture?.photo} alt={reservation?.voiture?.nom} className='h-20  object-cover rounded-md border bg-white' />}
                                            </div>
                                            <div>

                                                <h3 className="font-bold text-md">{reservation?.voiture?.nom}</h3>
                                                <div className="text-slate-500 text-md">{reservation?.voiture?.type_transmission}</div>
                                                <div className='font-bold rounded-md bg-gray-800 text-white   px-2'> Code :  <span className="text-sm dark:text-white text-yellow-500  ">{reservation?.code_reservation}</span> </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="md:grid  md:grid-cols-2 py-4">
                                        <div className='bg-gray-100 p-4 dark:bg-slate-900 dark:border-slate-700 dark:text-white'>
                                            <div className='font-bold '>  Début de la location</div>
                                            <div>{DateToFront(reservation?.date_debut, i18n.language) ?? ''}</div>
                                        </div>
                                        <div className='bg-slate-200 p-4 dark:bg-slate-900/50 dark:border-slate-700 dark:text-white'>
                                            <div className='font-bold '>  Début de la fin</div>
                                            <div>{DateToFront(reservation?.date_fin, i18n.language) ?? ''}</div>
                                        </div>

                                    </div>
                                    {console.log(reservation)}
                                    <div className='border py-2 px-4 rounded-md dark:border-slate-700 dark:text-white'>

                                        <div className="flex_ gap-4">
                                            <div className='font-bold'>{reservation?.nom} {reservation?.prenom}</div>
                                            <div >{reservation?.email},  {reservation?.telephone}</div>
                                            <div >{reservation?.ville_residence},  {reservation?.adresse_residence}</div>
                                            {reservation?.point_retrait != null && <><div title='Point de retrait' className='flex mt-4 border-t pt-4 gap-2  dark:border-slate-600 dark:text-white'><TbBrandGoogleMaps /><span className='font-bold'>Point de retrait :</span>{reservation?.point_retrait ? reservation?.point_retrait?.lieu : ''}

                                            </div>
                                                <div className=''>
                                                    <table className='w-'>
                                                        {reservation?.point_retrait?.adresse != null &&
                                                            <tr>
                                                                <th className='text-end'>Adresse :</th>
                                                                <td>{reservation?.point_retrait?.adresse}</td>
                                                            </tr>}
                                                        {reservation?.point_retrait?.ville != null && <tr>
                                                            <th className='text-end'>Ville :</th>
                                                            <td>{reservation?.point_retrait?.ville}</td>
                                                        </tr>}
                                                        {reservation?.point_retrait?.quartier != null && <tr>
                                                            <th className='text-end'>Quartier :</th>
                                                            <td>{reservation?.point_retrait?.quartier}</td>
                                                        </tr>}
                                                        {reservation?.point_retrait?.contacts != null && <tr>
                                                            <th className='text-end'>Contact à appeler :</th>
                                                            <td>{reservation?.point_retrait?.contacts}</td>
                                                        </tr>}
                                                        {reservation?.point_retrait?.description != null && <tr>
                                                            <th className='text-end'>Description:</th>
                                                            <td>{reservation?.point_retrait?.description}</td>
                                                        </tr>}
                                                        {reservation?.point_retrait?.photo != null && <tr>
                                                            <td colSpan={2}>
                                                                <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + reservation?.point_retrait?.photo} alt={reservation?.voiture?.nom} className='max-w-full  object-cover rounded-md border bg-white' />

                                                            </td>
                                                        </tr>}
                                                    </table>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='shadow-sm overflow-auto  my-8  dark:border-slate-700 dark:text-inherit'>
                                <CardBody >
                                    <div id="contenuHTML" className="overflow-auto mx-auto p-8">

                                        <div className="mb-4 flex justify-between gap-4 flex-grow-0">

                                            <div>
                                                <div className="font-bold">RENTAL &nbsp; CAR &nbsp;SERVICES</div>
                                                <div className=' text-slate-600 w-full text-sm dark:text-black' dangerouslySetInnerHTML={{ __html: entete?.contenu }}></div>

                                            </div>
                                            {(entete != null && entete?.photo != null) &&
                                                <div>
                                                    <LazyLoadImage effect='blur' className=" rounded-full h-[80px]  transition-all duration-300  mx-auto w-full max-w-full  object-cover  object-center"
                                                        src={HTTP_FRONTEND_HOME + '' + entete?.photo} alt={entete?.photo} />

                                                </div>
                                            }

                                        </div>
                                        <div className="p-2 mb-4 bg-gray-100  font-bold items-center text-center text-xl">FACTURE &nbsp; CLIENT&nbsp; N° {num_facture}</div>
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
                                                        <div className="mb-4 text-sm  text-slate-500 ps-3 mt-4  border-l-4">
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
                                                <tr className='bg-gray-100_ border-t border-b '>
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

                                            <p className='italic text-sm dark:text-white'>Facture générée le {DateToFront(transaction?.created_at)}</p>

                                        </div>
                                        {reservation?.location?.instruction_retrait && <div className="border mt-8 p-4 text-green-900 rounded-md bg-green-50 border-green-500">
                                            <h3 className="text-lg font-bold mb-4 -mt-2">Instructions &nbsp;&nbsp;pour&nbsp;le&nbsp;retrait&nbsp; de&nbsp;la&nbsp; location</h3>
                                            <div className='html' dangerouslySetInnerHTML={{ __html: reservation?.location?.instruction_retrait }}></div>

                                        </div>}
                                        <div className="mt-8 text-center">
                                            <p>Merci de votre confiance!</p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Button onClick={genererPDF} size="lg" className='my-4 text-yellow-500 dark:border-slate-600 border'>Télécharger la facture</Button>
                            <div className=' p-4 my-8 '>
                                <div className="w-full px-6 ">
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
                                                    Facturation du retrait
                                                </Typography>
                                            </div>
                                        </Step>
                                        <Step className="h-4 w-4 !bg-blue-gray-50"
                                            activeClassName="ring-0 !bg-white border"
                                            completedClassName="!bg-emerald-500 "
                                        >
                                            <div className="absolute -bottom-[2.3rem] w-max text-center">
                                                <Typography
                                                    variant="h6"
                                                    className='text-sm dark:text-white '
                                                >
                                                    Retour & fin
                                                </Typography>
                                            </div>
                                        </Step>
                                    </Stepper>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </ActivityLayout>
    );
}

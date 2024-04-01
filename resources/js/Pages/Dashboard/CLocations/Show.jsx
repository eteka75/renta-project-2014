import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import { Avatar, Button, Card, CardBody, Tooltip, Typography } from '@material-tailwind/react'
import React from 'react';
import { AiFillPrinter, AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront, formaterMontant, formaterMontantCFA, getEtatReservation } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage';
import { GrVmMaintenance } from "react-icons/gr";
import { VscEmptyWindow } from 'react-icons/vsc'
import { BsRepeat } from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TiEdit } from 'react-icons/ti';

export default function Show({ auth,data_transation, commande = '', page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.clocations')} className="opacity-60">
                    <span>Réservations de location</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.clocations')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
                {/*<Link className='px-4 font-bold flex ms-2 items-center py-2 bg-gray-600 text-white shadow-sm  rounded-md'
                    href={route('dashboard.voitures.edit', voiture?.id)}>
                    <AiOutlineEdit className='me-1' />    <Translate>Modifier</Translate>
                </Link>*/}
                <Button onClick={() => window.print()} className='px-4 font-bold flex ms-2 items-center  bg-gray-200 text-black shadow-sm  rounded-md' >
                    <AiFillPrinter className='me-1' />    <Translate>Imprimer</Translate>
                </Button>
            </DashHeadTitle>
            <div className="">
                <Card className='rounded-md shadow-sm border my-4'>
                    <CardBody>
                        <h3 className='text-slate-500 font-bold text-lg border-b pb-2'>Réservation </h3>
                        <div className="py-4">
                            <div class="">
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Code de la réservation :</span>
                                    <span >{commande?.code_reservation}</span>
                                </div>
                                <div className=" border rounded-sm mt-2">
                                    <div className="flex flex-wrap gap-2 ">
                                        <div>
                                            {commande?.voiture?.photo != null && commande?.voiture?.photo != '' ?
                                                <Link href={route('dashboard.voitures.show', commande?.voiture?.id)}>
                                                    <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + commande?.voiture?.photo}
                                                        className='h-32 w-full  object-center object-cover'
                                                        alt={commande?.voiture?.nom} />
                                                </Link>
                                                : <Link href={route('dashboard.voitures.show', id)}>
                                                    <LazyLoadImage src={default_photo1}
                                                        className='h-32 w-full  object-center object-cover'
                                                        alt={commande?.voiture?.nom} />
                                                </Link>
                                            }
                                        </div>
                                        <Link href={route('dashboard.voitures.show', commande?.voiture?.id)}>
                                            <div className='py-2'>
                                                <Link className='font-bold' href={route('dashboard.voitures.show', commande?.voiture?.id)}>
                                                    {commande?.voiture?.nom ?? '-'}
                                                </Link>
                                                <div className=''> Couleur {commande?.voiture?.couleur} </div>
                                                <div className="flexflex-wrapgap-2 text-sm">
                                                    <div>
                                                        Année <span className='text-slate-500'>{commande?.voiture?.annee_fabrication} {commande?.voiture?.type_transmission ? ', ' + commande?.voiture?.type_transmission : ''}</span>
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        <span className='text-slate-600 font-bold'>{commande?.voiture.immatriculation} </span>
                                                    </div>

                                                </div>


                                            </div>
                                        </Link>

                                    </div>
                                </div>
                                <div class="flex items-center mt-2 justify-between">
                                   <div className="flex">
                                    <span class="text-gray-700 font-bold mr-2">Etat de la réservation :</span>
                                    <span >{getEtatReservation(commande?.etat)}</span>
                                    </div> 

                                    <span className='mx-4  print:hidden'><Button size='sm' variant='text' className='flex gap-1'> <TiEdit/> Modifier</Button></span>
                                </div>

                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Date de début:</span>
                                    <span className='text-blue-500'>{DateToFront(commande?.date_debut, i18n.language)}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Date de fin:</span>
                                    <span className='text-red-500'>{DateToFront(commande?.date_fin, i18n.language)}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Point de retrait:</span>
                                    <span className=''>{commande?.point_retrait?.lieu + " / " + commande?.point_retrait?.adresse + " / " + commande?.point_retrait?.ville}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">TVA :</span>
                                    <span >{formaterMontant(commande?.tva)}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Montant :</span>
                                    <span >{formaterMontant(commande?.montant)}</span>
                                </div>
                                <div class="flexitems-start border bg-gray-50 dark:bg-gray-600 dark:text-white p-4 rounded-sm  mt-2">
                                    <span class="text-gray-700 dark:text-gray-400  font-bold mr-2 mb-2">Instructions de retrait:</span>
                                    <div  dangerouslySetInnerHTML={{ __html: commande?.location?.instruction_retrait }}></div>
                                    <span >

                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className='rounded-md shadow-sm border my-4'>
                    <CardBody>
                        <h3 className='text-slate-500 font-bold text-lg border-b pb-2'>Client </h3>
                        <div className="py-4">
                            <div class="">
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Nom et prénom :</span>
                                    <span >{commande?.nom + " " + commande?.prenom}</span>
                                </div>

                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Date de naissance:</span>
                                    <span >{DateToFront(commande?.date_naissance, i18n.language, 'd/m/Y')}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Lieu de naissance:</span>
                                    <span >{commande?.lieu_naissance}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Ville de résidence:</span>
                                    <span >{commande?.ville_residence}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Adresse de résidence:</span>
                                    <span >{commande?.adresse_residence}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Pièce d'identité:</span>
                                    <span >{(commande?.type_piece_identite) + "/" + commande?.numero_piece_identite}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Nationalité:</span>
                                    <span >{commande?.pays ? commande?.pays?.nom_fr_fr : ''}</span>
                                </div>
                                {commande?.nb_annee_conduite &&
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Nombre d'année de conduite:</span>
                                    <span >{(commande?.nb_annee_conduite)}</span>
                                </div>}
                                {commande?.telephone &&
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Téléphone:</span>
                                    <span >{(commande?.telephone)}</span>
                                </div>} 
                                {commande?.email &&
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Email:</span>
                                    <span >{(commande?.email)}</span>
                                </div>}
                               
                                { commande?.user &&
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Commandé par:</span>
                                    <Link href={route('dashboard.clients.show',{id:commande?.user?.id})}>
                                    <span className='flex gap-1 bg-slate-200 rounded-full px-2 py-1 items-center'>
                                        <Avatar size='xs' src={HTTP_FRONTEND_HOME + commande?.user?.photo} />{(commande?.user?.nom + " " + commande?.user?.prenom)}</span></Link>
                                </div>}
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className='rounded-md shadow-sm border my-4'>
                    <CardBody>
                        <h3 className='text-slate-500 font-bold text-lg border-b pb-2'>Paiement </h3>
                        <div className="py-4">
                        <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Montant à payer :</span>
                                        <span >{formaterMontant(commande?.montant)}</span>
                                    </div>
                            {commande?.transactions && commande?.transactions.map(({ client_id, date_transaction, frais, montant, status }, index) => (
                                <div class="overflow-visible" key={index}>
                                   
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Montant payé :</span>
                                        <span >{formaterMontant(montant)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Frais :</span>
                                        <span >{formaterMontant(frais)}</span>
                                    </div>
                                    {console.log(data_transation)}
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Frais :</span>
                                        <span >{formaterMontant(frais)}</span>
                                    </div>
                                    
                                   
                                    <div class="flex items-center mt-2 ">
                                        <span class="text-gray-700 font-bold mr-2">Status :</span>
                                        <span className='text-emerald-600'>{status}</span>
                                    </div>
                                    <div class="flex items-center text-slate-500 mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Date du paiement :</span>
                                        <span>{DateToFront(date_transaction, i18n?.language)}</span>
                                    </div>
                                    <div className="text-slate-500 rounded-md mt-4 p-4 shadow-inner text-sm bg-slate-50 ">
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Id transaction :</span>
                                        <span >{(data_transation?.id)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Id du compte :</span>
                                        <span >{(data_transation?.customer_id)}</span>
                                    </div>
                                    
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Opération :</span>
                                        <span className='uppercase'>{(data_transation?.operation)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Description de la transaction :</span>
                                        <span >{(data_transation?.description)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Référence :</span>
                                        <span >{(data_transation?.reference)}</span>
                                    </div>
                                    
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Mode de payement :</span>
                                        <span >{(data_transation?.mode)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Méthode de payement :</span>
                                        <span >{(data_transation?.payment_method?.brand)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Pays du paiement :</span>
                                        <span >{(data_transation?.payment_method?.country)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Numéro payement :</span>
                                        <span >{(data_transation?.payment_method?.number)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Date payement :</span>
                                        <span >{DateToFront(data_transation?.payment_method?.created_at)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Montant débité :</span>
                                        <span >{formaterMontant(data_transation?.amount_debited??0)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Montant débité :</span>
                                        <span >{formaterMontant(data_transation?.amount_transferred??0)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2"> Taux de la comission :</span>
                                        <span >{(data_transation?.commission)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2"> Clé de la transaction :</span>
                                       
                                        <span className='uppercase' >{(data_transation?.transaction_key)}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2"> Statut :</span>
                                        {data_transation?.status=="approved" ?
                                        <span className='uppercase text-emerald-500' >{(data_transation?.status)}</span>
                                        :
                                        <span className='uppercase' >{(data_transation?.status)}</span>}
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">URL de traitement :</span>
                                        <span > 
                                            <a className='text-blue-500 ' href={data_transation?.receipt_url} target='_blanck'>
                                            {(data_transation?.receipt_url)}</a>
                                            </span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">URL de retour :</span>
                                        <span > 
                                            <a className='text-blue-500 ' href={data_transation?.callback_url} target='_blanck'>
                                            {(data_transation?.callback_url)}</a>
                                            </span>
                                    </div>
                                    
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DashboardLayout>
    )
}

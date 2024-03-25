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
import { DateToFront, formaterMontant, formaterMontantCFA, getEtatAchat, getEtatReservation } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage';
import { GrVmMaintenance } from "react-icons/gr";
import { VscEmptyWindow } from 'react-icons/vsc'
import { BsRepeat } from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { TiEdit } from 'react-icons/ti';

export default function Show({ auth, commande = '', page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.cventes')} className="opacity-60">
                    <span>Achats de voitures</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.cventes')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
                <Button onClick={() => window.print()} className='px-4 font-bold flex ms-2 items-center  bg-gray-200 text-black shadow-sm  rounded-md' >
                    <AiFillPrinter className='me-1' />    <Translate>Imprimer</Translate>
                </Button>
            </DashHeadTitle>
            <div className="">
                {<Card className='rounded-md shadow-sm border my-4'>
                    <CardBody>
                        <h3 className='text-slate-500 font-bold text-lg border-b pb-2'>Commande client N° : {commande?.code_achat}</h3>
                        <div className="py-4">
                            <div class="">

                                {commande?.voitures && commande?.voitures?.map(({ id, nom, immatriculation, couleur, type_transmission, annee_fabrication, photo }) => (
                                    <div key={id} className="  rounded-sm my-1 hover:bg-slate-100 hover:shadow-sm">
                                        <div className="flex flex-wrap gap-2 border mb-2 rounded-sm">
                                            <div >
                                                {(photo != '' && photo != null) ?
                                                    <Link href={route('dashboard.voitures.show', id)}>
                                                        <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo}
                                                            className='h-32 w-full md:w-[190px] object-center object-cover rounded-sm'
                                                            alt={nom} />
                                                    </Link>
                                                    : <Link href={route('dashboard.voitures.show', id)}>
                                                        <LazyLoadImage src={default_photo1}
                                                            className='h-32 w-full  object-center object-cover rounded-sm'
                                                            alt={nom} />
                                                    </Link>
                                                }

                                            </div>
                                            <Link href={route('dashboard.voitures.show', id)}>
                                                <div className='py-3 md:px-3'>
                                                    <Link className='font-bold' href={route('dashboard.voitures.show', id)}>
                                                        {nom ?? '-'}
                                                    </Link>
                                                    <div className=''> Couleur {couleur} </div>
                                                    <div className="flexflex-wrapgap-2 text-sm">
                                                        <div>
                                                            Année <span className='text-slate-500'>{annee_fabrication}</span>
                                                        </div>
                                                        <div className="text-sm text-slate-500">
                                                            <span className='text-slate-600 font-bold'>Boîte {type_transmission}</span>
                                                        </div>

                                                    </div>


                                                </div>
                                            </Link>

                                        </div>
                                    </div>
                                ))}

                                <div class="flex items-center mt-2 justify-between">
                                    <div className="flex">
                                        <span class="text-gray-700 font-bold mr-2">Statut de l'achat :</span>
                                        <span >{getEtatAchat(commande?.etat)}</span>
                                    </div>

                                    <span className='mx-4 print:hidden'><Button size='sm' variant='text' className='flex bg-blue-700 text-white shadow hover:bg-blue-800 gap-1'> <TiEdit /> Modifier le statut</Button></span>
                                </div>

                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Date de l'achat:</span>
                                    <span className='text-blue-500'>{DateToFront(commande?.created_at, i18n.language)}</span>
                                </div>
                                
                                <div class="flex items-center text-xl mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Montant :</span>
                                    <span className='font-bold' >{formaterMontant(commande?.montant)}</span>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>}
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
                                    <span class="text-gray-700 font-bold mr-2">Pays:</span>
                                    <span >{commande?.pays ? commande?.pays?.nom_fr_fr : ''}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Nombre d'année de conduite:</span>
                                    <span >{(commande?.nb_annee_conduite)}</span>
                                </div>
                                {commande?.telephone &&
                                    <div class="flex items-center mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Téléphone:</span>
                                        <span >{(commande?.telephone)}</span>
                                    </div>}
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Email:</span>
                                    <span >{(commande?.email)}</span>
                                </div>
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">Commandé par:</span>
                                    <span className='flex gap-1 bg-slate-200 rounded-full px-2 py-1 items-center'><Avatar size='xs' src={HTTP_FRONTEND_HOME + commande?.user?.photo} />{(commande?.user?.nom + " " + commande?.user?.prenom)}</span>
                                </div>
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
                            
                                <div class="" >
                                <div class="flex items-center mt-2">
                                    <span class="text-gray-700 font-bold mr-2">TVA :</span>
                                    <span >{formaterMontant(commande?.tva)}</span>
                                </div>
                                  
                                    <div class="flex items-center text-gray-600 mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Frais :</span>
                                        <span >{formaterMontant(commande?.transaction?.frais)}</span>
                                    </div>
                                    
                                    <div class="flex items-center text-emerald-600 mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Montant payé :</span>
                                        <span className='text-lg font-bold ' >{formaterMontant(commande?.transaction?.montant)}</span>
                                    </div>

                                    <div class="flex items-center mt-2 ">
                                        <span class="text-gray-700 font-bold mr-2">Status du payement:</span>
                                        <span className='text-emerald-600'>{commande?.transaction?.status}</span>
                                    </div>
                                    <div class="flex items-center text-slate-500 mt-2">
                                        <span class="text-gray-700 font-bold mr-2">Date du paiement :</span>
                                        <span>{DateToFront(commande?.transaction?.created_at, i18n?.language)}</span>
                                    </div>
                                </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DashboardLayout>
    )
}

import DashboardLayout from '@/Layouts/DashboardLayout';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import Breadcrumb from '@/components/Breadcrumb';
import InputLabel from '@/components/InputLabel';
import Modal from '@/components/Modal';
import Translate from '@/components/Translate';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, etat_achats, formaterMontant, getEtatAchat } from '@/tools/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { Avatar, Button, Card, CardBody, DialogFooter, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { AiFillPrinter, AiOutlineArrowLeft } from 'react-icons/ai';
import { TiEdit } from 'react-icons/ti';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Show({ auth,data_transation, commande = '', page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    
    const [showSupDialog, setSupDialog] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const CloseDialog = () => {
        setSupDialog(false);
        setDeleteId('');
    }

    const { data, post, errors, processing, setData } = useForm({
        etat: commande?.etat,
        newetat:commande?.etat,
        id:"" 
    });
    const SubmitAction = () => {
        if (setDeleteId != '') {
            post(route('dashboard.cvente.update_etat',deleteId), {
                onSuccess: () => {
                  // Handle success, e.g., redirect
                },
                onError: (errors) => {
                  console.error(errors);
                },
              });
            setDeleteId('')
            setSupDialog(false);
        } else {
            ReloadPage();
        }
    }

    const HandleEdit = (id) => {
        setData("id", id);
        setSupDialog(true);
    }

    const ReloadPage = () => {
        const url = window.location.href;
        router.visit(url);
    }
    const handleInputEtat = (e) => {
        const { id, value } = e.target;
        setData("newetat", value);
    };
    
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
            <Modal show={showSupDialog} id="md" maxWidth='md' onClose={CloseDialog} submitFunction>
                <Typography className='text-xl font-bold p-4 border-b'>
                    <Translate>Changer l'état de la transaction</Translate></Typography>
                <CardBody>
                <div className="mb-3  flex gap-2 mx-auto items-center">
                    
                    <InputLabel htmlFor="etat" className='font-bold px-2'  >Etat de la commande : </InputLabel>
                    
                    <select onChange={handleInputEtat} value={data?.newetat} className='w-full_ border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'>
                        {etat_achats!=null && etat_achats?.map(({value,label},index)=>(
                             <option  key={index}  value={value}>{label}</option>
                        ))}
                    </select>        
                </div>         
                </CardBody>
                <DialogFooter className='border-t'>
                    <Button
                        variant="text"
                        color="red"
                        dialog="md"
                        onClick={CloseDialog}
                        className="mr-1"
                    >
                        <Translate>Annuler</Translate>
                    </Button>
                    <Button variant="gradient" className="bg-red-600 text-white " onClick={SubmitAction}>
                        <Translate>Valider</Translate>
                    </Button>
                </DialogFooter>
            </Modal>
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
                            <div className="">
                                
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
                                                        {type_transmission && <div className="text-sm text-slate-500">
                                                            <span className='text-slate-600 font-bold'>Boîte {type_transmission}</span>
                                                        </div>
                                                        }

                                                    </div>


                                                </div>
                                            </Link>

                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center mt-2 justify-between">
                                    <div className="flex">
                                        <span className="text-gray-700 font-bold mr-2">Statut de l'achat :</span>
                                        <span >{getEtatAchat(commande?.etat)}</span>
                                    </div>
                                    <span className='mx-4 print:hidden'>
                                        <Button size='sm' variant='text' className='flex rounded-full bg-blue-700 text-white shadow hover:bg-blue-800 gap-1'
                                            method="POST"
                                            href={route('dashboard.cvente.update_etat', commande?.id)}
                                            as="button"
                                            onClick={() => HandleEdit(commande?.id)}
                                        ><TiEdit /> Modifier le statut</Button>
                                    </span>
                                </div>

                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Date de l'achat:</span>
                                    <span className='text-blue-500'>{DateToFront(commande?.created_at, i18n.language)}</span>
                                </div>
                                
                                <div className="flex items-center text-xl mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Montant :</span>
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
                            <div className="">
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Nom et prénom :</span>
                                    <span >{commande?.nom + " " + commande?.prenom}</span>
                                </div>

                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Date de naissance:</span>
                                    <span >{DateToFront(commande?.date_naissance, i18n.language, 'd/m/Y')}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Lieu de naissance:</span>
                                    <span >{commande?.lieu_naissance}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Ville de résidence:</span>
                                    <span >{commande?.ville_residence}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Adresse de résidence:</span>
                                    <span >{commande?.adresse_residence}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Pièce d'identité:</span>
                                    <span >{(commande?.type_piece_identite) + "/" + commande?.numero_piece_identite}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Pays:</span>
                                    <span >{commande?.pays ? commande?.pays?.nom_fr_fr : ''}</span>
                                </div>
                                {commande?.nb_annee_conduite &&
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Nombre d'année de conduite:</span>
                                    <span >{(commande?.nb_annee_conduite)}</span>
                                </div>}
                                {commande?.telephone &&
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Téléphone:</span>
                                        <span >{(commande?.telephone)}</span>
                                    </div>}
                                {commande?.email &&
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Email:</span>
                                    <span >{(commande?.email)}</span>
                                </div>
                                }
                                {commande?.infos &&
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Autres infos :</span>
                                    
                                    <div className='' dangerouslySetInnerHTML={{ __html: commande?.infos }}></div>
                                </div>
                                }
                                { commande?.user &&
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">Commandé par:</span>
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
                            <div className="flex items-center mt-2">
                                <span className="text-gray-700 font-bold mr-2">Montant à payer :</span>
                                <span >{formaterMontant(commande?.montant)}</span>
                            </div>
                            
                                <div className="" >
                                <div className="flex items-center mt-2">
                                    <span className="text-gray-700 font-bold mr-2">TVA :</span>
                                    <span >{formaterMontant(commande?.tva)}</span>
                                </div>
                                  
                                    <div className="flex items-center text-gray-600 mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Frais :</span>
                                        <span >{formaterMontant(commande?.transaction?.frais)}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-emerald-600 mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Montant payé :</span>
                                        <span className='text-lg font-bold ' >{formaterMontant(commande?.transaction?.montant)}</span>
                                    </div>

                                    <div className="flex items-center mt-2 ">
                                        <span className="text-gray-700 font-bold mr-2">Status du payement:</span>
                                        <span className='text-emerald-600'>{commande?.transaction?.status}</span>
                                    </div>
                                    <div className="flex items-center text-slate-500 mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Date du paiement :</span>
                                        <span>{DateToFront(commande?.transaction?.created_at, i18n?.language)}</span>
                                    </div>
                                    <div className="text-slate-500 rounded-md mt-4 p-4 shadow-inner text-sm bg-slate-50 ">
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Id transaction :</span>
                                        <span >{(data_transation?.id)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Id du compte :</span>
                                        <span >{(data_transation?.customer_id)}</span>
                                    </div>
                                    
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Opération :</span>
                                        <span className='uppercase'>{(data_transation?.operation)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Description de la transaction :</span>
                                        <span >{(data_transation?.description)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Référence :</span>
                                        <span >{(data_transation?.reference)}</span>
                                    </div>
                                    
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Mode de payement :</span>
                                        <span >{(data_transation?.mode)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Méthode de payement :</span>
                                        <span >{(data_transation?.payment_method?.brand)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Pays du paiement :</span>
                                        <span >{(data_transation?.payment_method?.country)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Numéro payement :</span>
                                        <span >{(data_transation?.payment_method?.number)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Date payement :</span>
                                        <span >{DateToFront(data_transation?.payment_method?.created_at)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Montant débité :</span>
                                        <span >{formaterMontant(data_transation?.amount_debited??0)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">Montant débité :</span>
                                        <span >{formaterMontant(data_transation?.amount_transferred??0)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2"> Taux de la comission :</span>
                                        <span >{(data_transation?.commission)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2"> Clé de la transaction :</span>
                                       
                                        <span className='uppercase' >{(data_transation?.transaction_key)}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2"> Statut :</span>
                                        {data_transation?.status=="approved" ?
                                        <span className='uppercase text-emerald-500' >{(data_transation?.status)}</span>
                                        :
                                        <span className='uppercase' >{(data_transation?.status)}</span>}
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">URL de traitement :</span>
                                        <span > 
                                            <a className='text-blue-500 ' href={data_transation?.receipt_url} target='_blanck'>
                                            {(data_transation?.receipt_url)}</a>
                                            </span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-gray-700 font-bold mr-2">URL de retour :</span>
                                        <span > 
                                            <a className='text-blue-500 ' href={data_transation?.callback_url} target='_blanck'>
                                            {(data_transation?.callback_url)}</a>
                                            </span>
                                    </div>
                                    
                                    </div>
                                </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DashboardLayout>
    )
}

import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai';
import Translate from '@/components/Translate'
import { HTTP_FRONTEND_HOME } from '@/tools/constantes'
import { DateToFront } from '@/tools/utils'
import i18n from '@/i18n'
import ModaleImage from '@/components/ModaleImage'

export default function Show({ auth, voiture='', page_id = '', page_subid = '', page_title = '', page_subtitle = '' }) {
    return (
        <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
            <Breadcrumb>
                <Link href={route('dashboard.voitures')} className="opacity-60">
                    <span>Types de voiture</span>
                </Link>
                <Link href='#'>
                    <span>Affichage</span>
                </Link>
            </Breadcrumb>

            <Head title={page_title} />
            <DashHeadTitle title={page_title} subtitle={page_subtitle} >
                <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
                    href={route('dashboard.voitures')}>
                    <AiOutlineArrowLeft className='me-1' />    <Translate>Retour</Translate>
                </Link>
                <Link className='px-4 font-bold flex ms-2 items-center py-2 bg-gray-600 text-white shadow-sm  rounded-md'
                    href={route('dashboard.voitures.edit',voiture?.id)}>
                    <AiOutlineEdit className='me-1' />    <Translate>Modifier</Translate>
                </Link>
            </DashHeadTitle>
            <div className="grid grid-cols-3 items-start gap-4 _space-y-4">
                {voiture && voiture.photo &&
                    <Card className='col-span-1 shadow-sm border lg:col-span-1'>
                        <CardBody className="App w-full md:m-auto">
                        <ModaleImage title={voiture.nom} url={HTTP_FRONTEND_HOME + '' + voiture.photo}>
                            {
                                voiture.photo && <img
                                    className="max-w-full  rounded-lg object-cover object-center"
                                    src={HTTP_FRONTEND_HOME + '' + voiture.photo}
                                    alt={voiture.nom}
                                />
                            }
                        </ModaleImage>
                        </CardBody>
                    </Card>
                }
                { voiture!=null && 
                <Card className='col-span-3 lg:col-span-2 shadow-sm border '>
                    <div className="App w-full md:m-auto overflow-auto">
                        <table className='w-full min-w-max table-auto text-left h-full ' align='top'>
                            <tbody>

                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Nom</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.nom}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Immatriculation</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.immatriculation}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Catégories</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.categorie?voiture.categorie.nom:'-'}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Marque</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.marque?voiture.marque.nom:'-'}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Année de fabrication</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.annee_fabrication}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Date d'achat</Translate>
                                        </Typography>
                                    </th>
                                    <td>{DateToFront(voiture.date_achat,i18n.language,'d/m/Y')}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Nombre de places</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.nombre_place}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Date d'achat</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.date_achat}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Systèmes de sécurité à bord</Translate>
                                        </Typography>
                                    </th>
                                    <td>
                                        <div className=' gap-2 max-w-screen-md'>
                                        {voiture.systeme_securites && voiture.systeme_securites.length >0 && voiture.systeme_securites.map(({nom},index)=>(
                                       
                                       <>
                                       <span key={index} className='my-2 mx-1 block float-left 
                                       bg-gray-200 rounded-sm py-1 px-2 text-xs'>                                                
                                            *<Translate>{nom??''}</Translate>
                                        </span>
                                        </>
                                    ))}
                                    </div>
                                    </td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Volume du coffre</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.volume_coffre}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Nombre de vitesses</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.nombre_vitesse}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Puissance du moteur</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.puissance_moteur}</td>

                                </tr>
                                
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Couleur</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture?.couleur}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Type de transmission</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.type_transmission}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Capacité du réservoir</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.capacite_reservoir}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Emission du CO2</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.emission_co2}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Type d'éclairage</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.type_eclairage}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Type de suspenssion</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.type_suspenssion}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Dimenssions</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.dimenssions}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Autres technologies à bord</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.technologies_a_bord}</td>

                                </tr>
                                <tr className='p-4 border-b '>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Consommation (au 100km)</Translate>
                                        </Typography>
                                    </th>
                                    <td>{voiture.consommation}</td>

                                </tr>

                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Date d'ajout</Translate>
                                        </Typography>
                                    </th>
                                    <td> {DateToFront(voiture.created_at, i18n.language)}</td>
                                </tr>
                                { voiture.updated_at!==null &&
                                <tr className='p-4 border-b'>
                                    <th
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Dernière modification</Translate>
                                        </Typography>
                                    </th>
                                    <td> {DateToFront(voiture.updated_at, i18n.language)}</td>
                                </tr>
                                }
                                <tr className='p-4 '>
                                    <th
                                    colSpan={2}
                                        className=" border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="lead"
                                            color="blue-gray"
                                            className="font-bold leading-none opacity-70"
                                        >
                                            <Translate>Description</Translate>
                                        </Typography>
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div  className='text-sm px-4 break-words bg-white overflow-auto max-w-lg xl:max-w-3xl lg:max-w-2xl md:max-w-sm py-4'>
                                           
                                            <div dangerouslySetInnerHTML={{__html:voiture.description }}></div>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>}
            </div>
        </DashboardLayout>
    )
}

import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, div, Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const head = ["Photo", "Nom", "Description"];

export default function Export({ point_retraits, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full overflow-auto'>
      <div className=' mx-auto py-10 print:p-0'>
        <Head title={page_title} />
        <CardBody>
          <div className="grid grid-cols-12 mb-4 items-center border-b">
            <div className='col-span-10'>
              <Typography variant="h4" className="mb-0">
                {page_title}
              </Typography>
              <Typography className="mb-2 text-gray-500">
                {page_subtitle}
              </Typography>
            </div>
            <div className='items-center col-span-2'>
              <Button onClick={Print} variant='text' className='print:hidden float-right border flex'><AiOutlinePrinter className='me-1' /> Imprimer</Button>
              <Link href={route('dashboard.point_retraits')}>
                <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                  <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
              </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full  min-w-max table-auto text-left">

              <tbody>
                {point_retraits && point_retraits.length && point_retraits
                  .map(({ id, lieu, ville, quartier, contacts, adresse, map_local, photo, description, }, index) => {
                    const isLast = index === point_retraits.length - 1;
                    const classes = isLast
                      ? "px-4 py-2  pb-8"
                      : "px-4 py-2  pb-8 border-b_border-blue-gray-50 ";

                    return (
                      <tr className='hover:bg-gray-100 border-b transition-all duration-500' key={id}>
                        <td className={classes}>
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-start gap-3">

                              {photo && <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={lieu} className='w-20 rounded-0 bg-white' size="sm" />}

                            </div>
                            <div>

                              <div className="flex ">
                                <div className="" >

                                  <b>Lieu :</b> {lieu}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div>

                                  <b>Ville:</b>   {ville}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div>

                                  <b>Quartier :</b>   {quartier}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div


                                >

                                  <b>Adresse :</b>   {adresse}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div


                                >

                                  <b>Contacts :</b>   {contacts}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div>
                                  <b>Lien de la locatisation (sur Google Maps local):</b>   {map_local}
                                </div>
                              </div>
                              <div


                                className="font-normal"
                              >
                                <b>Description :</b>  {description}
                              </div>
                            </div>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </div>
    </div>
  )
}

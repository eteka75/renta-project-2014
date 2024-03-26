import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlinePrinter } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const head = ["Photo", "Nom", "Description"];;
export default function Export({ sys_securites, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full overflow-auto'>
      <div className=' mx-auto py-10 print:p-0'>
        <Head title={page_title} />

        <CardBody>
          <div className="grid grid-cols-12 mb-0 pb-4 items-center border-b">
            <div className='col-span-10'>
              <Typography variant="h4" color="blue-gray" className="mb-0">
                {page_title}
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-2 text-gray-500">
                {page_subtitle}
              </Typography>
            </div>
            <div className='items-center col-span-2'>
              <Button onClick={Print} variant='text' className='print:hidden float-right border flex'><AiOutlinePrinter className='me-1' /> Imprimer</Button>
              <Link href={route('dashboard.sys_securites')}>
                <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                  <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
              </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full  min-w-max table-auto text-left">

              <tbody>
                <tr className='border-b border-t bg-gray-100'>
                  <th className='px-4 py-2'>Système</th>
                  <th>Description</th>
                </tr>
                {sys_securites && sys_securites.length && sys_securites.map(({ id, nom, description, photo, site_web, pays }, index) => {
                  const isLast = index === sys_securites.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print:p-0"
                    : "px-4 py-2 print:p-0  border-b border-blue-gray-50 ";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500 dark:hover:bg-gray-900' key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">

                          {photo != null && <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-10 rounded-0 bg-white' size="sm" />}
                          <div>{nom}</div>
                        </div>


                      </td>
                      <td className={classes}>
                        <div className='text-xs max-w-[600px] print:max-w-[400px]' dangerouslySetInnerHTML={{ __html: description }}></div>
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

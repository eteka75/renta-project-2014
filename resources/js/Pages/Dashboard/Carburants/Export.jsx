import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';
const head = ["Photo", "Nom",  "Description"];;
export default function Export({ carburants, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full overflow-auto'>
      <div className=' mx-auto py-10 print:p-0'>
      <Head title={page_title}/>

        <CardBody>
          <div className="grid grid-cols-12 mb-4 items-center border-b">
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
              <Link href={route('dashboard.carburants')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full  min-w-max table-auto text-left border-collapse border-spacing-0">
             
              <tbody>
                {carburants && carburants.length && carburants.map(({ id, nom, description, photo, site_web, pays }, index) => {
                  const isLast = index === carburants.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print:p-0 print:border-0"
                    : "px-4 py-2 print:p-0 print:border-0 border-b_border-blue-gray-50 ";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500' key={id}>
                      <td className={classes}>
                        <div className="flex ">
                          <div className="text-md pe-2">{index+1} -</div>
                        <div  className=''>

                          {photo!=null && <img src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='sm:me-2 w-10 rounded-0 bg-white' size="sm" />}

                        </div>
                      <div>
                        <div className="font-boldx">
                          

                            {nom??''}
                        </div>
                     
                       {description &&  <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal break-words bg-white overflow-auto max-w-xs xl:max-w-xl lg:max-w-lg 2xl:max-w-2xl md:max-w-md "
                        >
                          {description??''}
                        </Typography>
                       }
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

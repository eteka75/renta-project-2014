import Translate from '@/components/Translate';
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Card, CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowsAlt, AiOutlinePrinter } from 'react-icons/ai';
import { VscDashboard } from 'react-icons/vsc';
const head = ["Photo", "Nom",  "Description"];;
export default function Export({ categories, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full  absolute w-full overflow-auto'>
      <div className=' mx-auto py-10 print:p-0'>
      <Head title={page_title}/>

        <CardBody>
          <div className="grid grid-cols-12 mb-4 items-center print:border-b">
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
              <Link href={route('dashboard.categories')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full  min-w-max table-auto text-left">
              <thead>
                <tr>
                  {head && head.map((head) => (
                    <th
                      key={head}
                      className="border-yborder-blue-gray-100bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        <Translate> {head}</Translate>
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories && categories.length && categories.map(({ id, nom, description, photo, site_web, pays }, index) => {
                  const isLast = index === categories.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 print:p-0"
                    : "px-4 py-2 print:p-0 border-b_border-blue-gray-50 ";

                  return (
                    <tr className='hover:bg-gray-100 transition-all duration-500' key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">

                          {photo && <img src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-10 rounded-0 bg-white' size="sm" />}

                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >

                            {nom}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {description}
                        </Typography>
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

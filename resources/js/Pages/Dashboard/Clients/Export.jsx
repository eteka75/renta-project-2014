import Translate from '@/components/Translate';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront } from '@/tools/utils';
import { Head, Link } from '@inertiajs/react';
import {  CardBody, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowLeft,  AiOutlinePrinter } from 'react-icons/ai';

export default function Export({ users, page_title, page_subtitle }) {
  const Print = () => {
    window.print();
  }
  return (
    <div className=' h-full_absolute text-black hover:bg-white bg-white w-full overflow-auto'>
      <div className=' mx-auto py-10 print__:p-0'>
      <Head title={page_title}/>

        <CardBody>
          <div className="grid grid-cols-12 pb-4 mb-8  items-center border-b">
            <div className='col-span-9'>
              <Typography variant="h4" color="blue-gray" className="mb-0">
                {page_title}
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-2 text-gray-500">
                {page_subtitle}
              </Typography>
            </div>
            <div className='items-center col-span-3'>              
              <Button onClick={Print} variant='text' className='print:hidden float-right border flex'><AiOutlinePrinter className='me-1' /> Imprimer</Button>
              <Link href={route('dashboard.clients')}>
              <Button variant='text' className='print:hidden items-center font-bold me-2 float-right border flex'>
                <AiOutlineArrowLeft className='me-1' /> Retour
                </Button>
                </Link>
            </div>
          </div>
          <div className='overflow-auto'>
            <table className=" w-full border text-xs min-w-max table-auto text-left">
              <tbody>
              <tr className='bg-gray-100 border-t border-b'>
                <th className='py-2 px-4'>Nom et prénoms</th>
                <th className='py-2 px-4'>Email</th>
                <th className='py-2 px-4'>Téléphone</th>
                <th className='py-2 px-4'>Date d'inscription</th>
              </tr>
              
                {users && users.length && users.map(({ id, nom,prenom, photo, email,telephone, created_at }, index) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 py-3 border-b"
                    : "px-4 py-2  border-b border-blue-gray-50 ";

                  return (
                    <tr  key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">

                          {photo!=null ? <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo} alt={nom} className='w-10 rounded-0 bg-white' size="sm" />:''}

                       
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >

                            {nom??''}
                            {" "+prenom??''}
                         
                        </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        {email}
                      </td>
                      <td className={classes}>
                        {telephone}
                      </td>
                      <td className={classes}>
                        {DateToFront(created_at)}
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

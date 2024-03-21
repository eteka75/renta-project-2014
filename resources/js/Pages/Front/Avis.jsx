import FrontLayout from '@/Layouts/FrontLayout'
import AvisClientsForm from '@/components/AvisClientsForm';
import Pagination from '@/components/Pagination';
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { ShowEtoiles } from '@/components/locations/LocaVoitureCard';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io';
export default function Avis({ avis, auth }) {
  const [datas, setDatas] = useState([]);

  const [open, setOpen] = useState(false);
  const handleAvis = () => {
    if (auth?.user == null) {
      Inertia.visit('login');
    } else {
      setOpen(!open);
    }
  };
  const [mobject, setMObjet] = useState('');

  useEffect(() => {
    //return()=>{ 
    if (avis?.data && avis?.data?.length > 0) {
      setDatas(avis.data)
    }
    //}
  }, [])
  return (
    <FrontLayout>
      <PageTitle title={"Avis clients"}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ("Avis de nos clients") }]} />
      </PageTitle>
      <Dialog open={open} className='dark:bg-slate-800 dark:text-white' handler={handleAvis}>
        <DialogHeader className='justify-between'>
          <div> Envoyer un avis</div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleAvis}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>

        </DialogHeader>
        <DialogBody className="px-4 md:px-8">
          <AvisClientsForm objet={mobject} onClose={handleAvis} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" className='dark:text-slate-100' onClick={handleAvis}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
        <div className="max-w-screen-lg mx-auto px-4 ">
        
          <div className="py-6 md:py-12">
          <div className='py-4 flex mb-6 justify-center'>
            <Button onClick={handleAvis} color='blue' className='dark:bg-yellow-500 dark:text-black flex gap-1 items-center mx-auto'>
              {auth?.user != null ? 'Envoyer mon avis' : 'Connectez-vous pour envoyer votre avis'}  <IoMdSend />
            </Button>
          </div>
            <div className="">
              {datas?.length > 0 && datas?.map(({ auteur, profession, nombre_etoile, message, photo, created_at }, index) => (
                <div key={index} className="">

                  <div className="bg-white dark:text-gray-100 dark:bg-gray-700 dark:border-slate-700 min-h-full mb-4 shadow-sm border   rounded-2xl px-8 py-6 shadow-lg_ hover:shadow-md transition duration-500">
                    <div className="">
                      <ShowEtoiles nb={nombre_etoile} />
                    </div>
                    <p className="mt-2 text-lg text-gray-600  dark:text-gray-200">{message}</p>
                    <div className="flex justify-between items-center">
                      <div className="mt-4 flex items-center space-x-4 py-4">
                        <div className="">
                          <img className="w-12 h-12 object-cover rounded-full" src={HTTP_FRONTEND_HOME + '' + photo} alt="" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{auteur} </div>
                          <div className='text-slate-500 dark:text-gray-400 text-sm'>{profession}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination className={"py-4 mb-4"} links={avis?.links} />
          <div className='py-4 flex justify-center'>
            <Button onClick={handleAvis} color='blue' className='dark:bg-yellow-500 dark:text-black flex gap-1 items-center mb-6 mx-auto'>
              {auth?.user != null ? 'Envoyer mon avis' : 'Connectez-vous pour envoyer votre avis'}  <IoMdSend />
            </Button>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}

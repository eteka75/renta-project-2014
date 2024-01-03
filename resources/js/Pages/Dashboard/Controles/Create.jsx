import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { Head, Link } from '@inertiajs/react';
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import {
  Card,
  CardBody
} from "@material-tailwind/react";
import Breadcrumb from '@/components/Breadcrumb';
import Translate from '@/components/Translate';
import ControleForm from './ControleForm';


export default function Index({ auth, page_id, page_subid, page_title, page_subtitle }) {

  return (
    <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
      <Breadcrumb>
        <Link href={route('dashboard.controle_techniques')} className="opacity-60">
          <span>Contrôles techniques</span>
        </Link>
        <Link href='#'>
          <span>Nouveau</span>
        </Link>
      </Breadcrumb>

      <Head title={page_title} />
      <DashHeadTitle title={page_title} subtitle={page_subtitle} >
        <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
          href={route('dashboard.controle_techniques')}>
          <AiOutlineArrowLeft className='me-1' /><Translate>Retour</Translate>
        </Link>
      </DashHeadTitle>
      <Card className='lg:max-w-xl'>
        <CardBody>
          <div className="App w-full md:m-auto">
            <ControleForm action={'save'} />
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

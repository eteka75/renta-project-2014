import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import { Head, Link } from '@inertiajs/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {
  Card,
  CardBody
} from "@material-tailwind/react";
import Breadcrumb from '@/components/Breadcrumb';
import Translate from '@/components/Translate';
import WebInfoForm from './WebInfoForm';


export default function Index({ auth, page_id, page_subid, page_title, page_subtitle }) {

  return (
    <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
      <Breadcrumb>
        <Link href={route('dashboard.infos')} className="opacity-60">
          <Translate>Informations</Translate>
        </Link>
        <Link href='#'>
          <Translate>Nouveau</Translate>
        </Link>
      </Breadcrumb>

      <Head title={page_title} />
      <DashHeadTitle title={page_title} subtitle={page_subtitle} >
        <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
          href={route('dashboard.infos')}>
          <AiOutlineArrowLeft className='me-1' /><Translate>Retour</Translate>
        </Link>
      </DashHeadTitle>
      <Card className='lg:w-4/5'>
        <CardBody>
          <div className="App w-full md:m-auto">
            <WebInfoForm action={'save'} />
          </div>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

import DashboardLayout from '@/Layouts/DashboardLayout'
import Breadcrumb from '@/components/Breadcrumb'
import DashHeadTitle from '@/components/dashboard/DashHeadTitle'
import { Head, Link } from '@inertiajs/react'
import { Card, CardBody } from '@material-tailwind/react'
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Translate from '@/components/Translate'
import DossierForm from './DossierForm'

export default function Edit({auth,page_id='',page_subid='',page_title ='',page_subtitle =''}) {
  return (
    <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
      <Breadcrumb>
        <Link href={route('dashboard.clients')} className="opacity-60">
          <span>Clients</span>
        </Link>
        <Link href='#'>
          <span>Edition</span>
        </Link>
      </Breadcrumb>

      <Head title={page_title} />
      <DashHeadTitle title={page_title} subtitle={page_subtitle} >
        <Link className='px-4 font-bold flex items-center py-2 bg-white shadow-sm  rounded-md'
          href={route('dashboard.categories')}>
          <AiOutlineArrowLeft className='me-1' />
          <Translate>Retour</Translate>
        </Link>
      </DashHeadTitle>

      <Card className=''>
        <CardBody  className="App w-full md:m-auto">
            <DossierForm action='update' btntext="Mettre à jour"/>
        </CardBody>
      </Card>
    </DashboardLayout>
  )
}

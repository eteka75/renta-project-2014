import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import Translate from '@/components/Translate';


export default function Index({ auth, page_id,pays, page_subid, page_title, page_subtitle }) {

  return (
    
    <DashboardLayout auth={auth} page_id={page_id} page_subid={page_subid}>
      <Breadcrumb>
        <Link href={route('dashboard.contacts')} className="opacity-60">
          <Translate>Contacts</Translate>
        </Link>
        <Link href='#'>
          <Translate>Nouveau</Translate>
        </Link>
      </Breadcrumb>

      
    </DashboardLayout>
  )
}

import { usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function Step1({date_debut,date_fin,location_id}) {
    const {auth}=usePage().props;
  return (
    <div>
     Location Step1 
    </div>
  )
}

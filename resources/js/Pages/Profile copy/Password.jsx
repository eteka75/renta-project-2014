import ProfilLayout from '@/Layouts/ProfilLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'

export default function Password() {
    return (
        <ProfilLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
                <Head title={auth.user.prenom + " " + auth.user.nom + " | Profile "} />
                <DashHeadTitle title={"Profil"} subtitle={"Consultez et modifiez votre profil"} />
                <div className=" space-y-6">

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </ProfilLayout>
    )
}

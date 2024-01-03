import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashMainMenu from '@/components/dashboard/DashMainMenu';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import DashMain from '@/Layouts/DashMain';
import ProfileMenu from '@/components/profile/ProfileMenu';


export default function ProfilLayout({ auth = {}, children, page_name='dash' }) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user} auth={auth} >

                <div className="max-w-screen-2xl mx-auto  grid grid-cols-10">
                    <ProfileMenu active={page_name} />
                    <DashMain >
                        {children}
                    </DashMain>
                </div>
            </AuthenticatedLayout>
        </>
    )
}

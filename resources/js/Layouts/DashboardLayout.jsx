import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashMainMenu from '@/components/dashboard/DashMainMenu';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import DashMain from '@/Layouts/DashMain';
import Notification from '@/components/dashboard/Notification';
import { CartProvider } from '@/reducers/CartContext';

export default function DashboardLayout({ auth = {}, children, page_id='dash', page_subid='' }) {
   
    return (
        <>
        <CartProvider>
            <AuthenticatedLayout
                 auth={auth}>
                <Notification/>
                <div className="max-w-screen-2xl mx-auto  grid grid-cols-10">
                    <DashMainMenu active={page_id} page_subid={page_subid} />        
                    <DashMain >
                        {children}
                    </DashMain>
                </div>
            </AuthenticatedLayout>
            </CartProvider>
        </>
    )
}

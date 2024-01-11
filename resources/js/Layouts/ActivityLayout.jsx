import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashMain from '@/Layouts/DashMain';
import { CartProvider } from '@/reducers/CartContext';
import ActivityMenu from '@/components/profile/ActivityMenu';


export default function ActivityLayout({ auth = {}, children, page_name='dash' }) {
    return (
        <>
        <CartProvider>
            <AuthenticatedLayout
                user={auth.user} auth={auth} >
                <div className="max-w-screen-2xl mx-auto  grid grid-cols-10">
                    <ActivityMenu active={page_name} />
                    <DashMain >
                        {children}
                    </DashMain>
                </div>
            </AuthenticatedLayout>
            </CartProvider>
        </>
    )
}

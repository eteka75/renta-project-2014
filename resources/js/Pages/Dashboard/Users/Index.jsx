import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'

export default function Index({auth}) {
    return (
        <DashboardLayout auth={auth}>
            <div className="p-8 shadow bg-white rounded-md">
                <h2 className="text 2xl">Utilisateurs</h2>
            </div>
        </DashboardLayout>
    )
}

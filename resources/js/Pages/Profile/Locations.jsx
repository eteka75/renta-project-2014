import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, usePage } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';

export default function Locations({ page_title,page_subtitle}) {
    const {auth}=usePage().props;
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
            <DashHeadTitle title={page_title} subtitle={page_subtitle}/>
            <Head title={auth.user.prenom +" "+auth.user.nom +" | "+page_title} />
            
                <div className=" space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        
                {/*
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>*/}
                </div>
                </div>
            </div>
        </ActivityLayout>
    );
}

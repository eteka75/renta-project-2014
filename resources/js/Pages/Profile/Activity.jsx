import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ActivityLayout from '@/Layouts/ActivityLayout';

export default function Activity({ auth }) {
    return (
        <ActivityLayout
            user={auth.user} auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
        >
            <div className="py-6">
            <Head title={auth.user.prenom +" "+auth.user.nom +" | Editer mon profil "} />
            <DashHeadTitle title={"Mes activites"} subtitle={"Consultez mes activités sur Rental Car Services"}/>
                <div className=" space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        
                    </div>
                {/*
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>*/}
                </div>
            </div>
        </ActivityLayout>
    );
}

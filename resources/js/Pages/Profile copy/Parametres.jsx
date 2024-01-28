import DeleteUserForm from './Partials/DeleteUserForm';
import { Head } from '@inertiajs/react';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import ProfilLayout from '@/Layouts/ProfilLayout';

export default function Parametres({ auth, mustVerifyEmail, status }) {
    return (
        <ProfilLayout
            user={auth.user} auth={auth}
        >
            <div className="py-6">
                <Head title={auth.user.prenom + " " + auth.user.nom + " | Paramètres du compte "} />
                <DashHeadTitle title={"Modifier mon mot de passe"} subtitle={"Consultez et modifiez mon profil"} />
                <div className=" space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                       
                    </div>
                </div>
            </div>
        </ProfilLayout>
    );
}

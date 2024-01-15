import { useState } from 'react';
import { Suspense } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import HeaderMenu from '@/components/HeaderMenu';
import FooterMega from '@/components/FooterMega';
import DashFooterMenu from '@/components/dashboard/DashFooterMenu';
import '../i18n';
import { useTranslation } from 'react-i18next';

export default function Authenticated({auth,  header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { t, i18n } = useTranslation();

    return (
        <Suspense fallback="Chargement...">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <HeaderMenu auth={auth}/>
            </nav>           
            
            <main>{children}</main>
            <DashFooterMenu/>
        </div>
        </Suspense>
    );
}

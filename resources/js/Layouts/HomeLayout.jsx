import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import LocationHeader from '@/components/locations/LocationHeader';
import FooterMega from '@/components/FooterMega';
import Notification from '@/components/dashboard/Notification';

export default function HomeLayout({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen dark:bg-gray-800 dark:text-white">
            <Notification/>
            <LocationHeader auth={auth}/>           
            <main>{children}</main>
            <FooterMega/>
        </div>
    );
}

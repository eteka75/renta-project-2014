import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import LocationHeader from '@/components/locations/LocationHeader';
import FooterMega from '@/components/FooterMega';
import Notification from '@/components/dashboard/Notification';
import FrontHeader from '@/components/locations/FrontHeader';

export default function FrontLayout({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen ">
            <Notification/>
            <FrontHeader auth={auth}/>           
            <main className='min-h-[600px] '>{children}</main>
            <FooterMega/>
        </div>
    );
}

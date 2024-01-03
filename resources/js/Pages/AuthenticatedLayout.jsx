import { useState } from 'react';
import { htmlFornse } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import HeaderMenu from '@/components/HeaderMenu';
import FooterMega from '@/components/FooterMega';
import DashFooterMenu from '@/components/dashboard/DashFooterMenu';
import '../i18n';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { t, i18n } = useTranslation();

    return (
        < htmlFornse fallback="Chargement...">
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <HeaderMenu auth={auth} />
                    <div className="flex">
                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    sd
                                </ResponsiveNavLink>
                            </div>
                            <nav className="space-y-1" aria-label="Sidebar"> <a href="/dashboard/general" className="flex items-center py-2 text-sm font-medium text-gray-500 hover:text-purple-500 group" aria-current="page"> <span className="truncate"> General</span> </a> <a href="/dashboard/connections" className="flex items-center py-2 text-sm font-medium text-gray-500 hover:text-purple-500 group"> <span className="truncate"> Conexions</span> </a> <a href="/dashboard/dashboard-teams" className="flex items-center py-2 text-sm font-medium text-gray-500 hover:text-purple-500 group"> <span className="truncate"> Teams</span> </a> <a href="/dashboard/billing" className="flex items-center py-2 text-sm font-medium text-gray-500 hover:text-purple-500 group"> <span className="truncate"> Billing</span> </a> <a href="/dashboard/invoices" className="flex items-center py-2 text-sm font-medium text-gray-500 hover:text-purple-500 group"> <span className="truncate"> Invoices</span> </a> <a href="/dashboard/tokens" className="flex items-center py-2 text-sm font-medium text-gray-500 hover:text-purple-500 group"> <span className="truncate"> Tokens</span> </a> </nav>
                            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800 dark:text-gray-200">{auth.user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                        <div className="-me-2 flex items-center __ sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div>
                        </div>
                    </div>
                </nav>

                <main>{children}</main>
                <DashFooterMenu />
            </div>
        </ htmlFornse>
    );
}

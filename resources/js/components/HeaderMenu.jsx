import { Link } from '@inertiajs/react'
import Logo from "../assets/images/logo-v0-min.png";
import userprofil from "../assets/images/design/user-profil.png";
import React from 'react';
import { FaCarOn, FaUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';
import UserMenu from './UserMenu';
import TopNav from './topNav';

/********************** */
//import { useTranslation } from 'react-i18next';
export default function HeaderMenu({ auth = {} }) {
    //i18n.changeLanguage('fr'); // <--- add this

        //export default i18n;
    return (
        <>
        <div className="shadow-sm  border-bborder-slate-100 bg-gradient-to-b from-gray-800 to-gray-900 text-white ">
            <TopNav auth={auth} mode="max-w-screen-2xl" />
        </div>
        
        </>
    )
}

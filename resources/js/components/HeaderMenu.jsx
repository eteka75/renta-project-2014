import React from 'react';
import TopNav from './topNav';

/********************** */
//import { useTranslation } from 'react-i18next';
export default function HeaderMenu({ auth = {} }) {
    //i18n.changeLanguage('fr'); // <--- add this

        //export default i18n;
    return (
        <>
        <div className="shadow-sm print:hidden  border-bborder-slate-100 bg-gradient-to-b from-gray-800 to-gray-900 text-white ">
            <TopNav auth={auth} mode="max-w-screen-2xl" />
        </div>
        
        </>
    )
}

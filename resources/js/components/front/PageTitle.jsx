import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';

export default function PageTitle({ title, children, head = true }) {
    const { t } = useTranslation();

    return (
        <>
            {title && <Head title={t(title ?? '')} />}
            <div className="bg-[#f5f6f8] dark:bg-zinc-800 overflow-auto max-w-full  dark:text-white lg:shadow-inner mt-0">
                
                <div className="max-w-screen-xl  mx-auto px-4 ">
                <div className="text-ellipsis">
                        {children}
                    </div>
                    <div >
                     {title && head  &&   <h1 className="text-slate-800 text-ellipsis dark:text-slate-300 text-2xl md:text-4xl pb-4 font-bold">{title}</h1>}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

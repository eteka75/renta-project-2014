import InputError from '@/components/InputError';
import Translate from '@/components/Translate';
import { Link, router } from '@inertiajs/react';
import { Button, Spinner, Tooltip } from '@material-tailwind/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { AiOutlineExport, AiOutlineReload } from 'react-icons/ai';

export default function SearchBar({ onSubmit = null, onChange = null, disabled = null, searchText = null, exportUrl = '', message = null, placeholder = '' }) {
    const { t } = useTranslation();

    const ReloadPage = () => {
        const url = window.location.href;
        router.visit(url);
    }
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 ">
                <div className="w-full lg:w-2/5">
                    <form className="items-center w-full" onSubmit={onSubmit}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                {disabled ?
                                    <Spinner className="h-4" />
                                    : <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>}
                            </div>
                            <input type="search" disabled={disabled} value={searchText} onChange={onChange} id="search" className="disabled:bg-zinc-200 block w-full px-3 py-[13px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={placeholder} required />
                            <button type="submit" disabled={disabled} className="disabled:bg-gray-500 text-white absolute end-1.5 bottom-1.5 bg-gray-700 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Translate>Rechercher</Translate>
                            </button>
                        </div>
                        <InputError message={message ?? ''} className="mt-2" />
                    </form>
                </div>
                <div className="w-full md:w-auto gridgrid-cols-2 gap-4 flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Tooltip content={t('Reacharger')}>
                        <Button onClick={ReloadPage} className='text-gray-800  hover:border-white  px-4 hover:shadow-none hover:bg-slate-300 border bg-white shadow-none'>
                            <AiOutlineReload />
                        </Button>
                    </Tooltip>
                        {exportUrl !== '' &&
                    <Tooltip content={t('Exporter')}>
                            <Link href={(exportUrl ?? '')} target='_blanck'>
                                <Button className='text-gray-800  px-4 hover:shadow-none hover:border-white hover:bg-slate-300 border bg-white shadow-none'>
                                    <AiOutlineExport />
                                </Button>
                            </Link>
                    </Tooltip>
                        }
                </div>
            </div>
        </>
    )
}

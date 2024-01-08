import React from 'react'
import { MdOutlineUpdate } from 'react-icons/md'

export default function LocationHelpSteps({children}) {
  return (
    <>
        <div className="dark:bg-slate-700 dark:text-white   bg-[#f5f5f5] #eaf5ff md:shadow-inner__transition-all duration-500 py-6 md:py-8 ">
                <div className=" border-b border-gray-200   max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-2 lg:grid-cols-3">
                    <div className=" flex gap-4 md:items-center my-4">
                        <div className="w-20 h-20 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-10 h-10 m-auto text-indigo-500 dark:text-indigo-400"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <div className="w-5/6 py-2">
                            <h3 className="font-semibold text-lg text-md text-gray-900 dark:text-slate-200">
                                Nous sommes là pour vous aider
                            </h3>
                            <p className="text-gray-700 dark:text-slate-100">
                                Notre service client répond à toutes vos
                                préoccupations
                            </p>
                        </div>
                    </div>
                    <div className=" flex gap-4 md:items-center my-4">
                        <div className="w-20 h-20 flex gap-4 rounded-full bg-teal-200 dark:bg-indigo-900/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-10 h-10 m-auto text-teal-600 dark:text-teal-400"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <div className="w-5/6 py-2">
                            <h3 className="font-semibold text-lg text-md text-gray-900 dark:text-slate-200">
                                Un service près de chez vous
                            </h3>
                            <p className="text-gray-700 dark:text-gray-100">
                                Un service de proximité pour mieux vous satisfaire
                            </p>
                        </div>
                    </div>
                    <div className=" flex gap-4 md:items-center my-4">
                        <div className="w-20 h-20 flex gap-4 rounded-full bg-amber-500 dark:bg-indigo-900/20  justify-center items-center">
                            <MdOutlineUpdate className="h-10 w-10 mx-auto" />
                        </div>
                        <div className="w-5/6 py-2">
                            <h3 className="font-semibold text-lg text-md text-md text-gray-900 dark:text-slate-200">
                                Réservation en quelques minutes
                            </h3>
                            <p className="text-gray-700 dark:text-gray-100">
                               La réservation est simple et facile. Il ne prend que quelques minutes. 
                            </p>
                        </div>
                    </div>
                </div>
                {children}
            </div>
    </>
  )
}

import { CardFooter, Typography } from '@material-tailwind/react';
import React, { Children, useEffect, useState } from 'react'
import Pagination from '../Pagination';
import Translate from '../Translate';
import { usePage } from '@inertiajs/react';
    const TABLE_HEAD = ["Photo", "Voiture", "Date début location","Date fin location","Etat", "Date d'ajout", "Actions"];

export default function ViewTable({ head = null, links = '', children, className, showHead = true, count = 0 }) {
    const [classHead, setClassHead] = useState('');
    const { total } = usePage().props;
    useEffect(() => {
        if (showHead === true) {
            setClassHead('');
        } else {
            setClassHead('hidden')
        }
    }, [showHead])
    return (
        <>
            {links && (count > 1 && total > 0) &&
                <div className={" hidden lg:flex  justify-between  items-center border-t border-blue-gray-50 px-4 dark:border-slate-800"}>
                    <div className='lg:flex p-0 text-gray-400 px-1 py-3'>{count > 1 && <>{count} sur {total ?? count} enrégistrement{total > 1 ? 's' : (count > 1 ? 's' : '')}</>}</div>
                    {Array.isArray(links) && links.length > 3 &&
                        <CardFooter className="lg:flex items-center justify-end  py-1 mt-1 ">
                            <Pagination links={links} />
                        </CardFooter>
                    }
                </div>
            }
            <table className={className +" w-full min-w-max table-auto text-left dark:border-slate-800"}>
                <thead>
                    <tr className={classHead}>
                        {head && head.map((head) => (
                            <th
                                key={head}
                                className="border-y dark:border-slate-800  border-blue-gray-100 bg-blue-gray-50/50 p-4 py-2"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none opacity-70"
                                >
                                    <Translate> {head}</Translate>
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
            {links && Array.isArray(links) && links.length > 3 &&

                <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 px-4 dark:border-slate-800">
                    <Pagination links={links} />
                </CardFooter>
            }
        </>
    )
}

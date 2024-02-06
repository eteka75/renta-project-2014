import { Link } from '@inertiajs/react';
import React from 'react';
import Translate from './Translate';


export default function Pagination({ links,className }) {
    const cClean = (t) => {
        let result = t.replace("&laquo;", "");
        result = result.replace(" ", "");
        return result.replace("&raquo;", "");

    }
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border dark:border-0 text-sm dark:text-black dark:bg-yellow-500 rounded dark:border-slate-500 hover:bg-blue-800 hover:text-gray-slate-200 focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm bg-white leading-4 border dark:text-white dark:bg-transparent dark:border-slate-500 text-sm rounded hover:bg-white hover:text-gray-900 focus:border-primary focus:text-primary";
        }
    }

    return ( links &&
        links.length > 3 && (
            <div className={className}>
                <div className="flex flex-wrap">
                    {links && Array.isArray(links) && links.map((link, key) => (
                        link.url === null ?
                            (<div key={key+'sh'+Math.random(1)+Math.random(1)*+Math.random(1)}
                                className="mr-1 dark:text-slate-600 dark:border-slate-500 dark:bg-transparent mb-1 px-4 py-3 text-sm leading-4 bg-white text-gray-400 border rounded"
                            ><Translate>{cClean(link.label)}</Translate></div>) :

                            (<Link key={key+'hs_'+Math.random(1)+Math.random(1)*+Math.random(1)}
                                className={getClassName(link.active)}
                                href={link.url}
                            ><Translate>{cClean(link.label)}</Translate></Link>)
                    ))
                    }
                </div>
            </div>
        )
    );
}
import { Link } from '@inertiajs/react';
import React from 'react';
import Translate from './Translate';


export default function Pagination({ links }) {
    const cClean = (t) => {
        let result = t.replace("&laquo;", "");
        result = result.replace(" ", "");
        return result.replace("&raquo;", "");

    }
    function getClassName(active) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border text-sm rounded hover:bg-blue-800 hover:text-gray-slate-200 focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border text-sm rounded hover:bg-white hover:text-gray-900 focus:border-primary focus:text-primary";
        }
    }

    return ( links &&
        links.length > 3 && (
            <div className="">
                <div className="flex flex-wrap">
                    {links && Array.isArray(links) && links.map((link, key) => (
                        link.url === null ?
                            (<div key={key+'sh'+Math.random(1)+Math.random(1)*+Math.random(1)}
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
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
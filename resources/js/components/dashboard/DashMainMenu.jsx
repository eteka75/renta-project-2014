import React from 'react';

import Menudropdown from '../../components/Menudropdown';
import { Link, usePage } from '@inertiajs/react';
import Translate from '../Translate';
import { menuItemsData } from '@/data/DashMenus';
import { Badge, Button } from '@material-tailwind/react';

export default function DashMainMenu({ active = '', page_subid = '' }) {
  const {_sms}=usePage().props;

  const TestOpen = (id) => {
    return (id === active) ? true : false;
  }
  const HasSubMenu = (menu) => {
    return ((menu.sub && menu.sub.length > 0) ? true : false);
  }

  return (
    <>
      <div className="col-span-2 print:hidden sm:col-span-3 lg:col-span-2 ">

        <div className="flex py-8 min-h-full sm:border-r md:pe-4 flex-col gap-2 max-w-[280px] mx-auto ">
          <h2 className="text-sm text-gray-400 tracking-widest px-4 hidden sm:flex font-bold uppercase line-clamp-5">Menu de Navigation</h2>
          {menuItemsData.map((menu, index) => {
            const is_open = TestOpen(menu.id ? menu.id : '-');
            const active_class = is_open === true ? ' border-s-4 font-bold text-black bg-slate-200  rounded-md' : '';
            const has_subm = HasSubMenu(menu);
            return (
              <Menudropdown key={index} is_open={is_open} has_submenu={has_subm}  >
                <Menudropdown.Trigger>
                  {(menu.url && menu.route != '') ?

                    <Link href={menu.url}
                      className={"inline-flex  items-center h-5w-5 text-start md:w-full px-2 py-1 ms-2 text-md mb-0 leading-4 font-medium text-gray-900_ dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150 " + active_class}

                    >{menu.icon} <span className='hidden sm:flex'><Translate>{menu.title}</Translate></span>
                    </Link>
                    :
                    <button type="button"
                      className={"items-center md:w-full  inline-flex text-start px-2 py-1 ms-2 text-md mb-0 leading-4 font-medium  text-gray-900_ dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150 " + active_class}

                    >{menu.icon} <span className='hidden sm:flex'><Translate>{menu.title}</Translate></span>

                    </button>
                  }
                  {menu.sub && menu.sub.length &&
                    <Menudropdown.Content >
                      {menu.sub.map((smenu, sindex) => {
                        const smactive_class = (page_subid === smenu?.sid) ? ' font-bold  text-blue-600' : '';
                       

                        return (
                          
                          <Menudropdown.Link key={sindex} className={'flex items-center hover:text-blue-600 transition-all duration-200 ' + smactive_class} href={route(smenu.route)}>
                            <span className='pe-4'><Translate>{smenu.title}</Translate></span>
                           {_sms!=null && _sms?.key==smenu?.sid && _sms.nb>0 && <span className="h-5 w-5 leading-5 text-xs font-bold bg-red-500 text-white text-center rounded-full">{_sms.nb}</span>}
                          </Menudropdown.Link>
                      
                        )

                      })
                      }
                    </Menudropdown.Content>
                  }
                </Menudropdown.Trigger>
              </Menudropdown>
            );
          })}
          
        </div>
      </div>
    </>
  )
}

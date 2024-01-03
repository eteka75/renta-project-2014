import React from 'react';

import Menudropdown from '../../components/Menudropdown';
import { VscDashboard } from 'react-icons/vsc';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsCart2 } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoCarSportOutline, IoKeyOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from '@inertiajs/react';
import { PiUsersThree } from 'react-icons/pi';
export default function DashMainMenu() {
   const menuItemsData = [
                  {
                    title: 'Home',
                    url: '#',
                    icon : <VscDashboard className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
                    sub: [
                      {
                        title :"Menu 1",
                        url:'/a1'
                      }, 
                      {
                        title :"Menu 2",
                        url:'/a2'
                      },
                    ]
                  },
                  {
                    title: 'Services',
                    url: '/services',
                    icon : <BsCart2 className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
                  },
                  {
                    title: 'About',
                    url: '/about',
                    icon : <VscDashboard className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />,
                  },
                ];
  return (
    <>
      {/*<ul className="flex_ hidden py-8 flex-col gap-2 max-w-[280px] mx-auto ">

            <li>
              <details className="group">

                <summary
                  className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">

                  <span className="flex gap-2">


                    <img className="w-6 h-6 rounded-lg"
                      src="https://lh3.googleusercontent.com/a/AGNmyxbSlMgTRzE3_SMIxpDAhpNad-_CN5_tmph1NQ1KhA=s96-c"
                      alt="" />

                    <span>
                      Prajwal Hallale
                    </span>
                  </span>
                  <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                    </path>
                  </svg>
                </summary>

                <article className="px-4 pb-4">

                  <ul className="flex flex-col gap-4 pl-2 mt-4">

                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                        </path>
                      </svg>


                      <a href="http://127.0.0.1:8000/user/dashboard">
                        Dashboard
                      </a>
                    </li>


                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z">
                        </path>
                      </svg>

                      <a href="http://127.0.0.1:8000/user/study-lists">
                        Study Lists
                      </a>
                    </li>


                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z">
                        </path>
                      </svg>


                      <a href="http://127.0.0.1:8000/user/contribution">
                        Your contribution
                      </a>
                    </li>


                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z">
                        </path>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                        </path>
                      </svg>


                      <a href="http://127.0.0.1:8000/user/settings">
                        Settings
                      </a>
                    </li>


                    <form action="http://127.0.0.1:8000/auth/logout" method="POST">
                      <input type="hidden" name="_token" value="ymEkCLBFpgkdaSbidUArRsdHbER5DkT6ByS3eJYb" />
                      <button type="submit" className="text-red-500 text-sm px-2 py-1 hover:bg-red-200 rounded-md">
                        Log Out
                      </button>
                    </form>

                  </ul>

                </article>

              </details>
            </li>

            <li>
              <details className="group">

                <summary
                  className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">

                  <span className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                    <span>
                      Recent Documents
                    </span>
                  </span>
                  <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                    </path>
                  </svg>
                </summary>

                <article className="px-4 pb-4">
                  <ul className="flex flex-col gap-1 pl-2">
                    <li><a href="">Document title</a></li>
                    <li><a href="">Document title</a></li>
                    <li><a href="">Document title</a></li>
                  </ul>
                </article>

              </details>
            </li>

            <li>
              <details className="group">

                <summary
                  className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">

                  <span className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <span>
                      Popular courses
                    </span>
                  </span>
                  <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                    </path>
                  </svg>


                </summary>

                <article className="px-4 pb-4">
                  <ul className="flex flex-col gap-1 pl-2">
                    <li><a href="">Course title</a></li>
                    <li><a href="">Course title</a></li>
                    <li><a href="">Course title</a></li>
                  </ul>
                </article>

              </details>
            </li>

  </ul>*/}
      <div className="col-span-2 sm:col-span-3 lg:col-span-2 ">
     
        <div className="flex py-8 min-h-full sm:border-r md:pe-4 flex-col gap-2 max-w-[280px] mx-auto ">
          <h2 className="text-sm text-gray-500 tracking-widest px-4 font-bold hidden sm:flex uppercase line-clamp-5">Menu de Navigation</h2>
           {menuItemsData.map((menu, index) => {
          return (
            <Menudropdown  key={index}>
            <Menudropdown.Trigger>
              <Link href={menu.url} 
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
              
              >{menu.icon} {menu.title}
              {menu.sub && menu.sub.length && (<span className='float-right right-1 sm:absolute'>
                    <svg className="w-4 h-4 ms-2  text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                  </span>)}
              </Link>
              {menu.sub ? menu.sub.map((smenu,sindex)=> (
                <Menudropdown.Content>
                  <Menudropdown.Link className='flex' href={smenu.url}> {smenu.title}</Menudropdown.Link>
                </Menudropdown.Content>
              )):''}
            </Menudropdown.Trigger>
            </Menudropdown>
          );
        })}
        <div className="menu hidden">
          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <Link
                  href={route('dashboard')}
                >
                  <VscDashboard className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Tableau de bord</span>
                </Link>
              </span>
            </Menudropdown.Trigger>
          </Menudropdown>
          <Menudropdown></Menudropdown>
          <Menudropdown is_open={true}>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center  text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >

                  <BsCart2 className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Commandes </span>
                  <span className='float-right right-1 sm:absolute'>
                    <svg className="w-4 h-4 ms-2  text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                  </span>
                </button>
              </span>
            </Menudropdown.Trigger>

            <Menudropdown.Content>
              <Menudropdown.Link className='flex' href={route('dashboard')}> Locations</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Achats </Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Annulations </Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Factures</Menudropdown.Link>
            </Menudropdown.Content>
          </Menudropdown>

          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="flex items-center px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >

                  <IoCarSportOutline className='me-0 md:me-1 lg:me-2 h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Gérer les voitures</span>
                  <span className='float-right right-1 sm:absolute'>
                    <svg className="w-4 h-4 ms-2  text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                  </span>
                </button>
              </span>
            </Menudropdown.Trigger>

            <Menudropdown.Content>
              <Menudropdown.Link className='flex' href={route('dashboard')}> voitures</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Marques</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Modèles</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Catégories</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Options</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Systèmes de sécurité</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Réparations</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Favoris</Menudropdown.Link>

            </Menudropdown.Content>
          </Menudropdown>
          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >

                  <IoKeyOutline className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' /> <span className="menu-label hidden sm:flex">Gérer les locations</span>
                  <span className='float-right right-1 sm:absolute'>
                    <svg className="w-4 h-4 ms-2  text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                  </span>
                </button>
              </span>
            </Menudropdown.Trigger>

            <Menudropdown.Content>
              <Menudropdown.Link className='flex' href={route('dashboard')}> En locations</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Points de retrait</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Villes</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Assurances</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Conditions</Menudropdown.Link>
            </Menudropdown.Content>
          </Menudropdown>
          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >

                  <BsCart2 className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Gérer les ventes</span>
                  <span className='float-right right-1 sm:absolute'>
                    <svg className="w-4 h-4 ms-2  text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                  </span>
                </button>
              </span>
            </Menudropdown.Trigger>

            <Menudropdown.Content>
              <Menudropdown.Link className='flex' href={route('dashboard')}> En ventes</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Services</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Conditions</Menudropdown.Link>
            </Menudropdown.Content>
          </Menudropdown>
          <Menudropdown >
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >

                  <PiUsersThree  className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Gérer utilisateurs</span>
                  <span className='float-right right-1 sm:absolute'>
                    <svg className="w-4 h-4 ms-2  text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                  </span>
                </button>
              </span>
            </Menudropdown.Trigger>

            <Menudropdown.Content>
              <Menudropdown.Link className='flex' href={route('dashboard')}> Clients</Menudropdown.Link>
              <Menudropdown.Link className='flex ' href={route('profile.edit')}> Administrateurs</Menudropdown.Link>
            </Menudropdown.Content>
          </Menudropdown>
          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >
                  <IoMdNotificationsOutline className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Notifications </span>
                </button>
              </span>
            </Menudropdown.Trigger>
          </Menudropdown>
          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >
                  <BiMessageSquareDetail className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Messagerie</span>
                </button>
              </span>
            </Menudropdown.Trigger>
          </Menudropdown>

          <Menudropdown>
            <Menudropdown.Trigger>
              <span className="inline-flex w-full ">
                <button
                  type="button"
                  className="inline-flex items-center text-start px-2 py-1 ms-2 text-md leading-4 font-medium rounded-md text-gray-900 dark:text-gray-100  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                >
                  <AiOutlineSetting className='me-0 md:me-1 lg:me-2  h-5 w-5 text-slate-600' />
                  <span className="menu-label hidden sm:flex">Paramètres </span>
                </button>
              </span>
            </Menudropdown.Trigger>
          </Menudropdown>
        </div>
        </div>
      </div>
    </>
  )
}

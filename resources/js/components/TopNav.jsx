import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from "../assets/images/logo-v0-min.png";
import { FiShoppingCart } from 'react-icons/fi';
import UserMenu from './UserMenu';
import { FaCarOn } from 'react-icons/fa6';
import Translate from './Translate';
import i18n from 'i18next';
import { TiHomeOutline, TiInfoLargeOutline } from "react-icons/ti";
import "../i18n"
import { Button, Drawer, IconButton, List, ListItem, Typography } from '@material-tailwind/react';
import { Cart, CartCounter } from '@/reducers/Cart';
import { MdFavoriteBorder, MdOutlineLibraryBooks, MdOutlineLocalLibrary } from 'react-icons/md';
import { VscDashboard } from 'react-icons/vsc';
import { FaRegUserCircle } from 'react-icons/fa';
import { TbActivity } from 'react-icons/tb';

export default function TopNav({ mode = 'max-w-screen-xl' }) {
    // i18n.changeLanguage('en');
    const { auth } = usePage().props;
    const [openRight, setOpenRight] = React.useState(false);
    const openDrawerRight = () => {
        setOpenRight(true);
    }
    const closeDrawerRight = () => setOpenRight(false);
    const changeLang = (lang) => {
        const langs = ['fr', 'en'];
        if (langs.indexOf(lang) >= 0) {
            i18n.changeLanguage(lang);
        }

    }


    return (
        <>
            <Drawer
                placement="right"
                open={openRight}
                onClose={closeDrawerRight}
                className="p-4 overflow-auto dark:bg-gray-200 dark:border-gray-600 "
            >
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="black">
                        Panier
                    </Typography>
                    <IconButton
                        variant="text"
                        color="black"
                        onClick={closeDrawerRight}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className="text-black">
                    <Cart />
                </div>
            </Drawer>

            <div className="top rounded-md bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-500 pt-[2px] transition-all duration-700"></div>
            <nav className={" mx-auto relative " + mode}>
                <div className=" flex flex-wrap items-center justify-between py-3 px-4">
                    <Link
                        href={"/"}
                        className="flex items-center  space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={Logo}
                            className="h-10"
                            alt="Logo CRS Bénin"
                        />
                        <span className="self-center hidden sm:flex md:text-xl uppercase_ font-semibold whitespace-nowrap dark:text-white">
                            Rental Car Services
                        </span>
                    </Link>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-language"
                    >
                        <ul className="flex flex-col relative font-medium  md:p-0 mt-4 border rounded-lg  md:space-x-1 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                            <li>
                                <Link
                                    href={route('home')}
                                    className="inline-flex items-center  border-slate-50 border-0 text-slate-200 font-medium justify-center px-2 lg:px-2 py-1.5 text-sm hover:text-yellow-500 transition-all duration-300 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <Translate>Accueil</Translate>
                                </Link>
                            </li>
                            {!auth?.user ? (
                                <>


                                    <li>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center  border-slate-50 border-0 text-slate-200 font-medium justify-center px-2 lg:px-2 py-1.5 text-sm hover:text-yellow-500 transition-all duration-300 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <Translate>S'inscrire</Translate>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center   text-slate-200 font-bold justify-center px-2 lg:px-2 py-1.5 text-sm hover:text-yellow-500 transition-all duration-300 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                        >

                                            <Translate>Se connecter</Translate>

                                        </Link>
                                    </li>

                                </>
                            ) : (
                                ''
                            )}
                            <li>
                                {i18n.language === 'en' ?
                                    <Link title='Français'
                                        onClick={() => changeLang('fr')}
                                        className="inline-flex items-center  border-slate-50 border-0 text-blue-200 underline font-medium justify-center px-2 lg:px-2 py-1.5 text-sm hover:text-yellow-500 transition-all duration-300 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Fr
                                    </Link>
                                    :
                                    <Link title='English'
                                        onClick={() => changeLang('en')}
                                        className="inline-flex items-center  border-slate-50 border-0 text-blue-200 underline font-medium justify-center px-2 lg:px-2 py-1.5 text-sm hover:text-yellow-500 transition-all duration-300 dark:text-white rounded-lg cursor-pointer  dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        En
                                    </Link>}
                            </li>

                            <li>
                                <span id="rcs_cart" onClick={openDrawerRight}
                                    type="button"
                                    className="inline-flex cursor-pointer text-slate-50 hover:text-slate-300  items-center w-10 leading-10 py-2  justify-center  "
                                >
                                    <CartCounter /> 
                                    <FiShoppingCart />
                                </span>
                            </li>

                            {auth?.user &&
                                (
                                    <>
                                        <li className='hidden'>
                                            <button
                                                type="button"
                                                data-dropdown-toggle="language-dropdown-menu"
                                                className="inline-flex ms-2 items-center text-slate-900 border border-yellow-500 bg-yellow-500 font-medium justify-center px-4 py-1.5 text-sm hover:text-b  dark:text-white rounded-lg cursor-pointer hover:opacity-90 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <FaCarOn className="me-1 text-xl" /> Gérer mes locations
                                            </button>
                                        </li>
                                        <li>
                                            <UserMenu auth={auth} />
                                        </li>
                                    </>)}
                        </ul>
                    </div>
                    <RightMenu auth={auth} openFunc={openDrawerRight} />
                </div>
            </nav>
        </>
    )
}

function RightMenu({ auth, openFunc }) {
    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    return (
        <React.Fragment>

            <button onClick={openDrawer} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-sm md:hidden hover:bg-[rgba(255,255,255,.3)] focus:outline-none focus:ring-1 focus:ring-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                <span className="sr-only">Menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <Drawer open={open} onClick={closeDrawer} onClose={closeDrawer} className="p-4">
                <Link
                    href={"/"}
                    className="flex items-center  rtl:space-x-reverse"
                >
                    <img
                        src={Logo}
                        className="h-8"
                        alt="Logo CRS Bénin"
                    />
                    <span className="self-center text-black text-sm ps-2 uppercase font-semibold whitespace-nowrap dark:text-white">
                        Rental Car Services
                    </span>
                </Link>
                <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Material Tailwind
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <div className='text-black'>
                    <List>
                        <ListItem>
                            <Link className='flex ' href={'/'}>
                               <TiHomeOutline  className='me-1 text-xl'/>  Accueil</Link>
                            </ListItem>
                        {auth?.user ?
                        <>
                            
                            <ListItem> 
                            <Link className='flex' href={route('dashboard')}><VscDashboard className='me-1 text-xl' /> Tableau de bord</Link>
                            </ListItem> 
                            <ListItem> 
                            <Link className='flex' href={route('profile.home')}><FaRegUserCircle className='me-1 text-lg' /> Gérer mon profil</Link>
                            </ListItem> 
                            <ListItem>
                            <Link className='flex' href={route('profile.activity')}><TbActivity  className='me-1 text-lg' />Gérer mes activités</Link>
                    {/*<Link className='flex  border-b' href={route('profile.edit')}><BiMessageSquareDetail className='me-1 text-lg' />Messages</Link>
                    <Link className='flex  border-b' href={route('profile.edit')}><IoMdNotificationsOutline className='me-1 text-lg' /> Notifications</Link>*/}
                     
                            </ListItem> 
                            <ListItem>
                            <Link className='flex' href={route('profile.favoris')}><MdFavoriteBorder  className='me-1 text-lg' />Mes favoris</Link>

                            </ListItem> 
                        </>
                            :
                            <>
                                <ListItem><Link href={'/login'}>Se connecter</Link></ListItem>
                                <ListItem><Link href={'/register'}>S'inscrire</Link></ListItem>
                            </>
                        }
                        <ListItem><Link href={route('front.apropos')}>A propos</Link></ListItem>
                        <ListItem><Link href={route('front.contact')}>Nous contacter</Link></ListItem>
                        <ListItem className='pb-4 rounded-none'><Link href={route('front.termes')}>Termes et conditions</Link></ListItem>
                        <ListItem className='bg-gray-900 text-white border-0 relative' onClick={openFunc}>
                            <FiShoppingCart className='me-2' /> Panier
                            <span className="text-center mx-4 items-center rounded-full mt-2.5 absolute left-2/3 leading-5"><CartCounter />
                            </span>
                        </ListItem>
                        <ListItem className='bg-gray-900 text-white border-0'>
                            <Link className='flex gap-1' href={route('front.support')}>
                                <MdOutlineLocalLibrary    className='w-4 h-4' />   Support clients
                            </Link>
                        </ListItem>
                        <ListItem className='bg-gray-900 text-white border-0'>
                            <Link className='flex gap-1' href={route('front.faqs')}>
                                <TiInfoLargeOutline className='w-4 h-4' />   Centre d'aide
                            </Link>
                        </ListItem>

                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    )
}

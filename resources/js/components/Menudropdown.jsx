import React, { useEffect } from 'react';
import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext();

const Menudropdown = ({ children, is_open = false, has_submenu=true }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen, is_open, has_submenu }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen, has_submenu } = useContext(DropDownContext);
    const rotate_class = open===true?'rotate-90':'rotate-0';

    return (
        <>
            <div >
                {has_submenu && <div className="relative inset-0 z-40 top-1" onClick={() => setOpen(false)}>
                    <span className='float-right right-1 absolute'>
                        <svg className={"w-4 h-4 ms-2 transition-all duration-100 dark:text-slate-100 "+rotate_class} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>

                    </span>
                </div>}
                <div onClick={toggleOpen}>{children}</div>
            </div>
        </>
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 font-bold w-full dark:bg-gray-900', children }) => {
    const { open, setOpen, is_open } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }
    useEffect(() => {
        if (is_open === true) {
            setOpen(true)
        }
    }, []);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`relative z-50 mt-0 bg-gray-100 dark:bg-slate-800 shadow-lg rounded-lg md:shadow-none md:rounded-none md:bg-transparent ms-4 rounded-md_shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div onClick={() => setOpen(true)} className={`rounded-md_ring-1_ring-black_ring-opacity-5  ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'block py-2 hover:bg-gray-200 rounded-sm ms-5 sm:px-2 leading-4 font-light text-sm md:w-full text-sm_leading-5_text-gray-700 dark:text-gray-300  dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Menudropdown.Trigger = Trigger;
Menudropdown.Content = Content;
Menudropdown.Link = DropdownLink;

export default Menudropdown;

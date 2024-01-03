import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Alert, Button, Typography } from '@material-tailwind/react';
import Translate from '../Translate';
import { IoIosNotifications } from 'react-icons/io';
import { TfiClose } from "react-icons/tfi";
import { FaCheckCircle } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import { TbHandStop } from 'react-icons/tb';

export default function Notification() {
    const { flash } = usePage().props
    return (
        <>
            <div className="fixed z-20 md:top-48 md:w-96 right-2 py-2">
                {flash.info && (
                    <Message message={flash.info.message} title={flash.info.title} />
                )}

                {flash.success && (
                    <Success message={flash.success.message} title={flash.success.title} />
                )}

                {flash.danger && (
                    <Danger message={flash.danger.message} title={flash.danger.title} />
                )}

                {flash.warning && (
                    <Warning message={flash.warning.message} title={flash.warning.title} />
                )}
            </div>
        </>
    )
}
function Message({ message, title }) {
    const [open, setOpen] = useState(true);
    return (
        <Alert
            open={open}
            className='mb-2 z-10 border-0 bg-blue-200 shadow-lg'
            icon={<IoIosNotifications className='text-2xl text-slate-800' />}
            action={
                <Button
                    variant="text"
                    color="black"
                    size="sm"
                    className="!absolute  top-3 right-3"
                    onClick={() => setOpen(false)}
                >
                    <TfiClose />
                </Button>
            }
        >
            <Typography variant="h5" className='mb-0' color="black">
                <Translate>{title}</Translate>
            </Typography>
            <Typography color="black" className=" leading-6 font-normal">
                <Translate>{message}</Translate>
            </Typography>
        </Alert>
    );
}
function Success({ message, title }) {
    const [open, setOpen] = useState(true);
    return (
        <Alert
            open={open}
            className='mb-2 z-10 border-0  bg-blue-600  shadow-lg'
            icon={<FaCheckCircle  className='text-2xl text-slate-50' />}
            action={
                <Button
                    variant="text"
                    color="white"
                    size="sm"
                    className="!absolute  top-3 right-3"
                    onClick={() => setOpen(false)}
                >
                    <TfiClose />
                </Button>
            }
        >
            <Typography variant="h5" className='mb-0' color="white">
                <Translate>{title}</Translate>
            </Typography>
            <Typography color="white" className=" leading-6 font-normal">
                <Translate>{message}</Translate>
            </Typography>
        </Alert>
    );
}
function Danger({ message, title }) {
    const [open, setOpen] = useState(true);
    return (
        <Alert
            open={open}
            className='mb-2 z-10 border-0  bg-red-700 shadow-lg'
            icon={<TbHandStop className='text-2xl text-slate-50' />}
            action={
                <Button
                    variant="text"
                    color="white"
                    size="sm"
                    className="!absolute  top-3 right-3"
                    onClick={() => setOpen(false)}
                >
                    <TfiClose />
                </Button>
            }
        >
            <Typography variant="h5" className='mb-0' color="white">
                <Translate>{title}</Translate>
            </Typography>
            <Typography color="white" className=" leading-6 font-normal">
                <Translate>{message}</Translate>
            </Typography>
        </Alert>
    );
}
function Warning({ message, title }) {
    const [open, setOpen] = useState(true);
    return (
        <Alert
            open={open}
            className='mb-2 z-10 border-0  bg-yellow-700 shadow-lg'
            icon={<IoWarning  className='text-2xl text-slate-50' />}
            action={
                <Button
                    variant="text"
                    color="white"
                    size="sm"
                    className="!absolute  top-3 right-3"
                    onClick={() => setOpen(false)}
                >
                    <TfiClose />
                </Button>
            }
        >
            <Typography variant="h5" className='mb-0' color="white">
                <Translate>{title}</Translate>
            </Typography>
            <Typography color="white" className=" leading-6 font-normal">
                <Translate>{message}</Translate>
            </Typography>
        </Alert>
    );
}
function Icon() {
    return (
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
            <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
        </span>
    );
}
function Icon2() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

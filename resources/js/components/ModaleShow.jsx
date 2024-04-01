import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'

export default function ModaleShow({ title = '', url = '', children }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (

        <div>
            <a href='#' className='cursor-pointer' onClick={handleOpen}>{children}</a>
            <Dialog open={open} size='md' className='bg-transparent shadow-none text-white'  handler={handleOpen}>
                <DialogHeader className="justify-between px-0">
                <div>
                {title}
                </div>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className='p-0'>
                    {children}
                </DialogBody>
            </Dialog>
        </div>
    )
}

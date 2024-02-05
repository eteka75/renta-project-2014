import { Link } from '@inertiajs/react'
import { Button, Card } from '@material-tailwind/react'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FaAngleRight } from 'react-icons/fa'

export default function CardShowInfo({ title="Centre d'aide", content='', url='',className, btninfo="Plus d'information" }) {
    return (
        <div className={className}>
            <Card className="  bg-blue-50 border-blue-300  border  shadow-none rounded-lg ">
                <div className="p-4 rounded-t-md text-xl font-extrabol font-bold">{title}</div>
                <div className="px-4">
                <div className='html text-md' dangerouslySetInnerHTML={{__html:content}}></div>

                </div>                

                <div className="p-4 font-bold  text-blue-500 text-lg">                   
                    <Link href={url}>
                        <Button variant='text' color='white' className='w-full text-center py-4 md:py-3 items-center flex gap-2 justify-center  dark:text-white hover:bg-black bg-[#003366] text-white mt-4 mt-4'>
                        ✨    {btninfo} <FaAngleRight className='h-4'/>
                        </Button>
                    </Link>
                </div>

            </Card>
        </div>
    )
}

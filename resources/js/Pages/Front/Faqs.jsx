import FrontLayout from '@/Layouts/FrontLayout'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs';
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useEffect } from 'react';
import PageTitle from '@/components/front/PageTitle';

export default function Faq({ faqs, infos }) {
  const { t } = useTranslation();
  const [nbFinSection, setNbFinSection] = useState(5);
  const [listInfo, setListInfo] = useState([]);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    let nb = nbFinSection;
    if (faqs && faqs?.length > nb * 2) {
      nb = Math.ceil(faqs?.length / 2);
    }
    setNbFinSection(nb);
    setListInfo(infos?.data ?? [])
  }, [])
  return (
    <FrontLayout>
      <PageTitle title={"Forum aux questions"}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': t('Forum aux questions') }]} />
      </PageTitle>
      <div className="bg-slate-50_">
        <div className="max-w-screen-xl mx-auto px-4 ">
          

          <div className=''>
            <div className='max-w-screen-lg my-8  mx-auto border rounded-md p-4 lg:grid lg:grid-cols-1 lg:gap-4'>
              {faqs?.length > 0 && faqs.map(({ question, reponse, id }, index) => {
                let class_last = ((index + 1) === faqs.length) ? 'border-b-0' : '';
                let class_last_b = ((index + 1) === faqs.length) ? 'rounded-b-xl' : '';
                return (
                  <Accordion key={index} open={open === id} icon={<Icon id={id} open={open} />}>
                    <AccordionHeader className={'text-lg pb-4 lg:pt-0' + class_last} onClick={() => handleOpen(id)}>{question}</AccordionHeader>
                    <AccordionBody className='p-0 bg-red '>
                      <div className={'text-lg text-gray-800 bg-gray-100 p-4 ' + class_last_b} dangerouslySetInnerHTML={{ __html: reponse }}></div>

                    </AccordionBody>
                  </Accordion>
                )
              })}
            </div>
          </div>             
        </div>
      </div>
    </FrontLayout>
  )
}
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
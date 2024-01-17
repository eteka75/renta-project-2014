import FrontLayout from '@/Layouts/FrontLayout'
import React from 'react'

export default function Achat() {
  return (
    <FrontLayout>
      <Head title={t("Achat de voitures")} />
      <div className="bg-slate-50_ shadow-inner_ mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 ">
          <FrontBreadcrumbs pages={[{ 'url': "", 'page': t('Achat de voitures') }]} />
          <div className='grid grid-cols-12'>
            <h1 className="col-span-12 text-xl md:text-2xl md:gap-4 font-bold">Achats</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptates commodi neque doloribus! Accusamus nam error dolorem labore excepturi, veniam facere cupiditate, tempora facilis in ad repudiandae a eligendi incidunt reiciendis doloribus ratione quos velit nesciunt eveniet delectus dolore voluptatum sint accusantium! Eos adipisci, tempora amet earum similique eveniet beatae alias non repudiandae vero suscipit iusto ipsam recusandae eum omnis nostrum doloremque quaerat unde rerum blanditiis at accusantium laudantium. A commodi facere unde, placeat quaerat culpa dolorum ut quasi optio assumenda iure consectetur corporis aspernatur laudantium officia, sint, facilis distinctio expedita quos labore! Inventore explicabo alias maiores adipisci! Error, culpa.
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}

import FrontLayout from '@/Layouts/FrontLayout'
import InputError from '@/components/InputError'
import PrimaryButton from '@/components/PrimaryButton'
import TextArea from '@/components/TextArea'
import TextInput from '@/components/TextInput'
import Translate from '@/components/Translate'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/inertia-react'
import { router } from '@inertiajs/react'
import { t } from 'i18next'
import React, { useRef } from 'react'
import ConrtactForm from './ContactForm'
import DashboardLayout from '@/Layouts/DashboardLayout'
export default function Contact({nt=''}) {
  
  return (
    <FrontLayout auth={{  }}>
      <PageTitle title={"Contactez-nous"}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ("Contact") }]} />

      </PageTitle>
      <div className="  mt-[1px]">
        <div className="max-w-screen-xl mx-auto md:px-4 ">
          <section className="bg-white  dark:bg-transparent">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <div className="p-4 border mb-6 bg-blue-50 border-blue-200 dark:bg-blue-700  dark:border-gray-900 lg:mb-8 rounded-md text-lg">
                Vous avez un problème technique ? <br />Vous souhaitez envoyer des commentaires sur une fonctionnalité bêta ?
                <div className="font-light text-center_ text-gray-500 dark:text-gray-300 sm:text-xl">
                 Besoin de détails sur notre Business ?<br />

                  <div className="text-black font-bold font-italic py-2 dark:text-gray-300">Faites le nous savoir.</div> </div>
              </div>
              <ConrtactForm/>
            </div>
          </section>
        </div>
      </div>
    </FrontLayout>
  )
}

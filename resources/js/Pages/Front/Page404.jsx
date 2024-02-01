import FrontLayout from '@/Layouts/FrontLayout'
import img404 from "@/assets/images/design/page404.jpg"
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { Link } from '@inertiajs/react'
import { Button } from '@material-tailwind/react'
import React from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Page404() {
  return (
    <FrontLayout>
      <PageTitle head={false} title={"Page introuvable"}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ("page introuvable") }]} />
      </PageTitle>
      <div className="bg-slate-50_ md:shadow-inner_ mx-4">
        <div className="max-w-screen-lg border  rounded-md shadow-md hover:shadow-xl my-6 md:my-12 mx-auto px-4 ">

          <div className="py-6 md:py-12">
            <div className="md:grid md:grid-cols-12 gap-4">
              <div className='sm:col-span-5 md:col-span-4'>
                <LazyLoadImage src={img404} className='h-64 object-contain' alt="404, page Not fount" />

              </div>
              <div className='sm:col-span-7 md:col-span-8'>
                <h1 className="text-5xl lg:text-8xl font-extrabold">404 !</h1>
                <h2 className="text-slate-400 text-lg md:text-xl">Oops, on dirait que vous avez pris un mauvais virage ! 🚗💨</h2>
                <p className='py-4 text-md md:text-lg'>
                  <span className='font-bold'>Il semble que la route que vous cherchiez n'ait pas été tracée sur notre carte. </span>
                  <br></br>Retournez à l'accueil pour découvrir nos meilleures offres de location de voitures.
                </p>
                <div>
                  <Button className='md:w-auto w-full '>
                    <Link className='md:py-1 justify-center items-center  flex text-yellow-500 gap-1' href={'/'}>  <BiChevronLeft className='h-4 w-4' /> Retour à l'accueil
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashMainMenu from '@/components/dashboard/DashMainMenu';
import DashHeadTitle from '@/components/dashboard/DashHeadTitle';
import DashMain from '@/Layouts/DashMain';



export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user} auth={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>}
    >
      <Head title="Tableau de bord" />

      <div className="max-w-screen-2xl mx-auto  grid grid-cols-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2   _h-screenabsolute">
          <DashMainMenu/>         
        </div>
        <div className="col-span-8 sm:col-span-7 lg:lg:col-span-8">
          <div className="py-8">
          <div className="flex-grow text-gray-800">           
            <DashMain >
              <DashHeadTitle title="Bienvenue dans votre tableau de bord" subtitle='Gérez vos voitures et interagissez avec votre clientèle en toute sécurité' />
              <div>
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">89562</span>
                    <span className="block text-gray-500">Daily Unique Visitors</span>
                  </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">27.6%</span>
                    <span className="block text-gray-500">CTR</span>
                  </div>
                </div>
                {/*<div className="flex_ hidden items-center p-8 bg-white shadow rounded-lg">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <span className="inline-block text-2xl font-bold">3m 45s</span>
                    <span className="inline-block text-xl text-gray-500 font-semibold">(-32%)</span>
                    <span className="block text-gray-500">Average Engagement Time</span>
                  </div>
                </div>
                */}
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">956326</span>
                    <span className="block text-gray-500">Event Count</span>
                  </div>
                </div>
              </section>
              <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
                <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                  <div className="px-6 py-5 font-semibold border-b border-gray-100">Graphe d'évolution des locations et vente de voitures.</div>
                  <div className="p-4 flex-grow">
                    <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                  </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">25</span>
                    <span className="block text-gray-500">Lections left</span>
                  </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold">139</span>
                    <span className="block text-gray-500">Hours spent on lections</span>
                  </div>
                </div>
                <div className="row-span-3 bg-white shadow rounded-lg">
                  <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                    <span>Derniers clients</span>
                    <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
                      USERS
                      <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="overflow-y-auto">
                    <ul className="p-6 space-y-6">                      
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Annette Watson profile picture" />
                        </div>
                        <span className="text-gray-600">United States</span>
                        <span className="ml-auto font-semibold">9.3</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Calvin Steward profile picture" />
                        </div>
                        <span className="text-gray-600">Spain</span>
                        <span className="ml-auto font-semibold">8.9</span>
                      </li>

                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Ralph Richards profile picture" />
                        </div>
                        <span className="text-gray-600">United Kingdom</span>
                        <span className="ml-auto font-semibold">8.7</span>
                      </li>                                            
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Bernard Murphy profile picture" />
                        </div>
                        <span className="text-gray-600">Malaysia</span>
                        <span className="ml-auto font-semibold">8.2</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Arlene Robertson profile picture" />
                        </div>
                        <span className="text-gray-600">Russia</span>
                        <span className="ml-auto font-semibold">8.2</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Jane Lane profile picture" />
                        </div>
                        <span className="text-gray-600">Canada</span>
                        <span className="ml-auto font-semibold">8.1</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Pat Mckinney profile picture" />
                        </div>
                        <span className="text-gray-600">India</span>
                        <span className="ml-auto font-semibold">7.9</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Norman Walters profile picture" />
                        </div>
                        <span className="text-gray-600">Australia</span>
                        <span className="ml-auto font-semibold">7.7</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
                  <div className="px-6 py-5 font-semibold border-b border-gray-100">Messages</div>
                  <div className="p-4 flex-grow">
                    <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                  </div>
                </div>
              </section>
              </div>
            </DashMain>
          </div>

          </div>
        </div>
        </div>
    </AuthenticatedLayout>
  );
}

import FrontLayout from '@/Layouts/FrontLayout'
import InputError from '@/components/InputError'
import InputLabel from '@/components/InputLabel'
import Pagination from '@/components/Pagination'
import Translate from '@/components/Translate'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { LocaVoitureCard2 } from '@/components/locations/LocaVoitureCard'
import { VenteVoitureCard } from '@/components/locations/LocaVoitureCard copy'
import i18n from '@/i18n'
import { setTarif } from '@/tools/utils'
import { Card, Slider, Spinner } from '@material-tailwind/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import Datepicker from "react-tailwindcss-datepicker"

export default function Achats({ locations,en_ventes }) {
  const [datas, setDatas] = useState([]);
  const [montant, setMontant] = useState(20);
  const refs = useRef([]); // or an {}
  const errors = [];

  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useEffect(() => {
    if (en_ventes?.data && en_ventes?.data?.length > 0) {
      setDatas(en_ventes.data)
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('OK')
  }


  return (
    <FrontLayout>
      <PageTitle title={"Achat de voitures"} head={true}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ('Achats de voitures') }]} />
      </PageTitle>
      <div className="bg-slate-50_ shadow-inner mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 ">
          <div className="md:grid md:grid-cols-12 md:gap-4">
            <div className="col-span-3 py-8">
              <Card className='border shadow-sm rounded-md'>
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className='p-4'>
                    <h3 className="text-sm text-slate-600 p-4 bg-gray-100 rounded-sm uppercase font-bold">Option de recherche</h3>
                    <div className="mb-3 pt-4">
                      <InputLabel htmlFor="prix" className='font-bold '  >Prix</InputLabel>
                      <div className="w-full bg-slate-300 rounded-full">
                        <Slider color='gray' className='max-w-full' onChange={((e)=>setMontant(e.currentTarget.value))} value={montant} defaultValue={montant} max={100} />
                      </div>
                      <div className="text-sm py-2">{montant} FCFA</div>
                    </div>
                    <div className="mb-3">
                      <InputLabel htmlFor="question" className='font-bold '  >Date début</InputLabel>
                      <Datepicker
                        required
                        id="date_debut_vente"
                        asSingle={true}
                        useRange={false}
                        classNames={'rounded-none'}
                        //value={date_debut}
                        //onChange={handleDateDebutChange}
                        i18n={i18n.language}
                        displayFormat={"DD/MM/YYYY"}
                        placeholder={'10/01/' + (new Date().getFullYear())}
                      />
                      <InputError message={errors.question} className="mt-2" />
                    </div>
                    <div className="mb-3">
                      <InputLabel htmlFor="question" className='font-bold '  >Date fin</InputLabel>
                      <Datepicker
                        required
                        id="date_debut_vente"
                        asSingle={true}
                        useRange={false}
                        classNames={'rounded-none'}
                        //value={date_debut}
                        //onChange={handleDateDebutChange}
                        i18n={i18n.language}
                        displayFormat={"DD/MM/YYYY"}
                        placeholder={'10/01/' + (new Date().getFullYear())}
                      />
                      <InputError message={errors.question} className="mt-2" />
                    </div>
                    <div className="mb-3">
                    <InputLabel htmlFor="question" className='font-bold '  >Marques</InputLabel>

                    <Select
                          isMulti
                          id="options_vente"
                          ref={addToRefs}
                          isSearchable={true}
                          //onChange={handleOptionVenteChange}
                          className="mt-1 block w-full"
                          //defaultValue={setDefaultMultiValue(data.options_vente_o ? data.options_vente_o : [])}
                          //options={ConvertSelectDataV3(options_ventes)}
                      />
                    </div>
                    <div className="mb-3">
                    <InputLabel htmlFor="question" className='font-bold '  >Point de retrait</InputLabel>

                    <Select
                          isMulti
                          id="options_vente"
                          ref={addToRefs}
                          isSearchable={true}
                          //onChange={handleOptionVenteChange}
                          className="mt-1 block w-full"
                          //defaultValue={setDefaultMultiValue(data.options_vente_o ? data.options_vente_o : [])}
                          //options={ConvertSelectDataV3(options_ventes)}
                      />
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            <div className="col-span-9 py-8 ">
              <div className="pb-4">
                <SearchBar placeholder='Rechercher dans les voitures disponibles...' />
              </div>
              <div className="md:grid lg:grid-cols-2 md:gap-4">
              {datas != null && datas?.length > 0 && datas?.map(({ voiture,id,tarif_location_heure,
                    tarif_location_journalier,tarif_location_hebdomadaire,
                    tarif_location_mensuel,duree_garantie,kilometrage,prix_vente
                }, index) => {
                return <VenteVoitureCard  
                id={id}
                garantie={duree_garantie}
                prix_vente={prix_vente}
                kilometrage={kilometrage}
                nb_personne={voiture?.nombre_place}
                type_boite ={voiture?.type_transmission} 
                vitesse={voiture?.nombre_vitesse}
                nb_grande_valise={voiture?.nombre_grande_valise}
                nb_petite_valise={voiture?.nombre_petite_valise}
                volume_coffre={voiture?.volume_coffre}
                marque={voiture?.marque?.nom}
                categorie={voiture?.categorie?.nom}
                nom={voiture?.nom} 
                carburant={voiture?.type_carburant?.nom} 
                photo={voiture?.photo} 
                puissance={voiture?.puissance_moteur} 
                tarif={setTarif(tarif_location_heure,tarif_location_journalier,tarif_location_hebdomadaire,tarif_location_mensuel)} 
                key={index}/>
              })}

              <div className="mb-4">

                <Pagination links={locations?.links} />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}

function SearchBar({ onSubmit = null, onChange = null, disabled = null, searchText = null, message = null, placeholder = '' }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4  ">
        <div className="w-full ">
          <form className="items-center w-full" onSubmit={onSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                {disabled ?
                  <Spinner className="h-4" />
                  : <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>}
              </div>
              <input type="search" disabled={disabled} value={searchText} onChange={onChange} id="search" className="disabled:bg-zinc-200 block w-full px-3 py-[13px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder} required />
              <button type="submit" disabled={disabled} className="disabled:bg-gray-500 text-white absolute end-1.5 bottom-1.5 bg-gray-700 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <Translate>Rechercher</Translate>
              </button>
            </div>
            <InputError message={message ?? ''} className="mt-2" />
          </form>
        </div>
      </div>
    </>
  )
}


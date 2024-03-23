import FrontLayout from '@/Layouts/FrontLayout'
import InputError from '@/components/InputError'
import InputLabel from '@/components/InputLabel'
import Pagination from '@/components/Pagination'
import TextInput from '@/components/TextInput'
import Translate from '@/components/Translate'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { VenteVoitureCard } from '@/components/locations/LocaVoitureCard'
import { setTarif } from '@/tools/utils'
import { Link, useForm } from '@inertiajs/react'
import { Button, Card, Spinner } from '@material-tailwind/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCarCrash, FaChevronLeft } from 'react-icons/fa'
import { SlEqualizer } from 'react-icons/sl'
import Select from 'react-select'

export default function Achats({ en_ventes, search, vente_marques, vente_categories,vente_boites, vente_carburants, vente_annees }) {
  const [datas, setDatas] = useState(null);
  const [lmarque, setLmarque] = useState(null);
  const [lcategorie, setLcat] = useState(null);
  const [lcarburant, setLcarbure] = useState(null);
  const [lboite, setLBoite] = useState(null);
  const [lannee, setLAnnee] = useState(20);
  const [loaded, setLoaded] = useState(false);

  const refs = useRef([]); // or an {}
  
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const { data, get, errors, processing, setData } = useForm({
    search: search?.search ?? '',
    prix_min: search?.prix_min ?? '',
    prix_max: search?.prix_max ?? '',
    kilometrage_min: search?.kilometrage_min ?? '',
    kilometrage_max: search?.kilometrage_max ?? '',
    categorie: search?.categorie ?? '',
    marque: search?.marque ?? '',
    annee: search?.annee ?? '',
    couleur: search?.couleur ?? '',
    carburant: search?.carburant ?? '',
    nb_vitesses: search?.nb_vitesses ?? '',
    type_boite: search?.type_boite ?? '',
    nb_portes: search?.nb_portes ?? '',
  });
  useEffect(() => {
   
    if (search.carburant) {
      let select = vente_carburants?.find(({ id }) => id == search.carburant);
      setLcarbure({ value: select?.id, label: select?.nom });
    }
    /*Marque*/
    if (search.marque) {
      let selectm = vente_marques?.find(({ id }) => id == search.marque);
      setLmarque({ value: search.marque, label: selectm?.nom });
    }
    /*Catégorie*/
    if (search.categorie) {
      let selectct = vente_categories?.find(({ id }) => id == search.categorie);
      setLcat({ value: search.categorie, label: selectct?.nom });
    }

  }, [])
  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData(id, value);
  };
  const setDefaultValue = (id, val) => {
    if (id!='' && val!='') { return { label: val, value: id }; }
    return null;
  }
  const handleSelectMarque = (options) => {
    if (options) {
      const { value } = options;
      setLmarque(options)
      setData("marque", value);
    } else {
      setLmarque('');
      setData("marque", "");
    }
    // setData((datas)=>({...datas, 'pourcentage':p, 'montant': m }));
  };
  const handleSelectBoite = (options) => {
    if (options) {
      const { value } = options;
      setLBoite(options)
      setData("type_boite", value);
    } else {
      setLBoite(null);
      setData("type_boite", '');
    }
    // setData((datas)=>({...datas, 'pourcentage':p, 'montant': m }));
  };
  const handleSelectCat = (options) => {
    if (options) {
      const { value } = options;
      setLcat(options)
      setData("categorie", value);
    } else {
      setLcat('');
      setData("categorie", "");
    }
  };
  const handleSelectCarburant = (options) => {
    if (options) {
      const { value } = options;
      setLcarbure(options)
      setData("carburant", value);
    } else {
      setLcarbure('');
      setData("carburant", "");
    }
  };
  const handleSelectAnnee = (options) => {
    if (options) {
      const { value } = options;
      setLAnnee(options)
      setData("annee", value);
    } else {
      setLAnnee('');
      setData("annee", "");
    }
  };
  const ConvertSelectDataV1 = (tab) => {
    if (Array.isArray(tab)) {
      let v = [];
      tab.map(({ id, nom }) => {
        v.push({ value: id, label: nom });
      });
      return v;
    }

    return [];
  }
  
  const ConvertSelectDataV2 = (tab) => {
    if (Array.isArray(tab)) {
      let v = [];
      tab.map((val) => {
        v.push({ value: val, label: val });
      });
      return v;
    }

    return [];
  }
  useEffect(() => {
    if (en_ventes?.data && en_ventes?.data?.length > 0) {
      setDatas(en_ventes.data)
    }
    setLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //if (action === 'save') {
    get(route('front.achats'), {
      onSuccess: () => {
        // Handle success, e.g., redirect
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
    //}
  };

  return (
    <FrontLayout>
      <PageTitle title={"Achat de voitures"} head={true}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ('Achats de voitures') }]} />
      </PageTitle>
      <div className="bg-slate-50_ lg:shadow-inner">
        <div className="max-w-screen-xl mx-auto px-4  mb-8">
          <div className="md:grid md:grid-cols-12 md:gap-4">
            <div className="md:col-span-4 lg:col-span-3 md:py-8 py-4">
              <Card className='bordershadows-smrounded-md  dark:bg-gray-800 dark:border-gray-700    border'>
                <form onSubmit={handleSubmit} className={"space-y-6 "+ (processing?'opacity-50':'') }>
                  <div className='p-4'>
                    <h3 className="text-sm text-slate-500 -gray-100 rounded-sm uppercase font-bold">Option de recherche</h3>
                    <Button variant='text' size='sm' className="my-2 w-full dark:bg-slate-700 dark:border-slate-700 dark:shadow dark:border dark:text-white bg-gray-200 py-4 flex gap-2 sm:hidden" onClick={toggleOpen}>
                     <SlEqualizer/>  Filtrer
                      </Button>
                    <div className={(open===true?'flex':'hidden')+' sm:flex transition-all duration-300'}>
                     
                    <div className="mb-3 pt-4">
                      {/*<SearchBar onSubmit={handleSubmit} searchText='Rechercher' icon={<AiOutlineSearch className='h-5 rounded-sm' />} />
                      <br />*/}

                      <div className="mb-3">
                        <InputLabel htmlFor="marque" className='font-bold '  >Marque</InputLabel>
                        <Select
                          isClearable
                          id="marque"
                          ref={addToRefs}
                          value={lmarque}
                          defaultValue={setDefaultValue(data.marque, '')}
                          onChange={(options) =>
                            !options ? handleSelectMarque(null) : handleSelectMarque(options)
                          }
                          options={ConvertSelectDataV1(vente_marques)}

                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                        />

                        <InputError message={errors.marque} className="mt-2" />
                      </div>
                      <div className="mb-3">
                        <InputLabel htmlFor="categorie" className='font-bold '  >Catégorie</InputLabel>
                        <Select
                          isClearable
                          id="categorie"
                          ref={addToRefs}
                          value={lcategorie}
                          onChange={(options) =>
                            !options ? handleSelectCat(null) : handleSelectCat(options)
                          }
                          options={ConvertSelectDataV1(vente_categories)}
                          type="text"
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                          class="mt-2  block w-full "
                        />

                        <InputError message={errors.categorie} className="mt-2" />
                      </div>
                      <div className="mb-3">
                        <InputLabel htmlFor="annee" className='font-bold '  >Année</InputLabel>
                        <Select
                          isClearable
                          id="annee"
                          ref={addToRefs}
                          value={data.lannee}
                          defaultValue={setDefaultValue(data.annee, data.annee)}
                          onChange={(options) =>
                            !options ? handleSelectAnnee(null) : handleSelectAnnee(options)
                          }
                          options={ConvertSelectDataV2(vente_annees)}
                          type="text"
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                        />

                        <InputError message={errors.annee} className="mt-2" />
                      </div>


                      <div className="mb-3">
                        <InputLabel htmlFor="carburant" className='font-bold '  >Carburant</InputLabel>
                        <Select
                          isClearable
                          id="carburant"
                          ref={addToRefs}
                          value={lcarburant}
                          isSearchable={true}
                          //defaultInputValue={ConvertSelectDataV1(vente_carburants.filter(({id})=>id==2))}
                          //defaultInputValue={{ value:data.carburant,label:"OK" }}
                          onChange={(options) =>
                            !options ? handleSelectCarburant(null) : handleSelectCarburant(options)
                          }
                          options={ConvertSelectDataV1(vente_carburants)}
                          type="text"
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                        />
                       
                        <InputError message={errors.carburant} className="mt-2" />
                      </div>
                      <div className="mb-3">
                        <InputLabel htmlFor="type_boite" className='font-bold '  >Type de boite</InputLabel>
                        <Select
                          isClearable
                          id="type_boite"
                          ref={addToRefs}
                          value={setDefaultValue(data.type_boite, data.type_boite)}
                          isSearchable={true}
                          //defaultInputValue={ConvertSelectDataV1(vente_carburants.filter(({id})=>id==2))}
                          //defaultInputValue={{ value:data.carburant,label:"OK" }}
                          onChange={(options) =>
                            !options ? handleSelectBoite(null) : handleSelectBoite(options)
                          }
                          defaultValue={setDefaultValue(data.type_boite, data.type_boite)}

                          options={ConvertSelectDataV2(vente_boites)}
                          type="text"
                          className="my-react-select-container"
                          classNamePrefix="my-react-select"
                        />

                        <InputError message={errors.type_boite} className="mt-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <InputLabel htmlFor="prix_min" className='font-bold '  >Prix minimum</InputLabel>
                          <TextInput
                            id="prix_min"
                            min='0'
                            ref={addToRefs}
                            value={data.prix_min}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                          />
                          <InputError message={errors.prix_min} className="mt-2" />
                        </div>
                        <div>
                          <InputLabel htmlFor="prix_max" className='font-bold '  >Prix maximum</InputLabel>

                          <TextInput
                            id="prix_max"
                            ref={addToRefs}
                            min='0'
                            value={data.prix_max}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                          />

                          <InputError message={errors.prix_max} className="mt-2" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-4 gap-3 mb-3 dark:border-slate-700">
                        <div>
                          <InputLabel htmlFor="kilometrage_min" className='font-bold '  >Kilométrage minimum</InputLabel>

                          <TextInput
                            id="kilometrage_min"
                            min='0'
                            ref={addToRefs}
                            value={data.kilometrage_min}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                          />

                          <InputError message={errors.kilometrage_min} className="mt-2" />
                        </div>
                        <div>
                          <InputLabel htmlFor="kilometrage_max" className='font-bold '  >Kilométrage maximum</InputLabel>

                          <TextInput
                            id="kilometrage_max"
                            min='0'
                            ref={addToRefs}
                            value={data.kilometrage_max}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                          />

                          <InputError message={errors.kilometrage_max} className="mt-2" />
                        </div>
                      </div>
                    <div className="pt-2">
                      <Button color='black' disabled={processing?'disabled':''} type='submit' className='w-full dark:bg-yellow-500 dark:text-black flex justify-center gap-2'>{processing && <Spinner className="h-4 w-4" />}Rechercher {processing?'...':''}</Button>
                    </div>
                    </div>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            <div className="md:col-span-8 lg:col-span-9 md:py-4 ">
              {datas != null && datas?.length > 0 &&
                <>
                  <div className="md:grid lg:grid-cols-2 md:mt-4  md:gap-4">
                    {datas != null && datas?.length > 0 && datas?.map(({ voiture, id, tarif_location_heure,
                      tarif_location_journalier, tarif_location_hebdomadaire,
                      tarif_location_mensuel,prix_defaut, duree_garantie,points_retrait, kilometrage, prix_vente
                    }, index) => {
                      return <VenteVoitureCard
                        id={id}
                        garantie={duree_garantie}
                        prix_vente={prix_vente}
                        kilometrage={kilometrage}
                        annee_fabrication={voiture?.annee_fabrication}
                        nb_personne={voiture?.nombre_place}
                        type_boite={voiture?.type_transmission}
                        vitesse={voiture?.nombre_vitesse}
                        nb_grande_valise={voiture?.nombre_grande_valise}
                        nb_petite_valise={voiture?.nombre_petite_valise}
                        volume_coffre={voiture?.volume_coffre}
                        points={points_retrait}
                        marque={voiture?.marque?.nom}
                        categorie={voiture?.categorie?.nom}
                        nom={voiture?.nom}                        
                        prix_defaut={prix_defaut}
                        carburant={voiture?.type_carburant?.nom}
                        photo={voiture?.photo}
                        puissance={voiture?.puissance_moteur}
                        nb_images={voiture?.location_medias?.length}
                        tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                        key={index} />
                    })}


                  </div>
                  <div className="mb-4">

                    <Pagination links={en_ventes?.links} />
                  </div>
                </>
              }
              {(datas === null || datas?.length === 0) && loaded &&
                <div className='p-10 md:py-28 border md:mt-4 shadow-md mb-12 mx-auto text-center  rounded-lg dark:bg-yellow-500 dark:text-black dark:border-gray-800'>
                  <FaCarCrash className='h-60 w-60 mx-auto  mb-4 text-slate-200' />
                  <span className='text-slate-500'>Aucune voiture ne correspond à vos critères de recherche !</span>
                  <div className='font-bold'>Veuillez réessayer en choississant d'autres paramètres</div>
                  <div className="p-4">
                    <Button className='text-center' size="sm" color='gray'>
                      <Link className="flex items-center" href={route('front.achats')}>
                        <FaChevronLeft className='me-2' />
                        Retour
                      </Link>
                    </Button>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  )
}

function SearchBar({ onSubmit = null, onChange = null, disabled = null, icon = null, searchText = null, message = null, placeholder = '' }) {
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
                  : <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>}
              </div>
              <input type="search" disabled={disabled} value={searchText} onChange={onChange} id="search" className="disabled:bg-zinc-200 block w-full px-3 py-[13px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder} required />
              <button type="submit" disabled={disabled} className="disabled:bg-gray-500 text-white absolute end-1.5 bottom-1.5 bg-gray-700 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {icon !== null ? icon : <Translate>Rechercher</Translate>}
              </button>
            </div>
            <InputError message={message ?? ''} className="mt-2" />
          </form>
        </div>
      </div>
      
    </>
  )
}


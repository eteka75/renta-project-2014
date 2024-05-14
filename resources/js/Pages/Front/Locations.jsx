import FrontLayout from '@/Layouts/FrontLayout'
import InputError from '@/components/InputError'
import InputLabel from '@/components/InputLabel'
import Pagination from '@/components/Pagination'
import TextInput from '@/components/TextInput'
import Translate from '@/components/Translate'
import FrontBreadcrumbs from '@/components/front/FrontBreadcrumbs'
import PageTitle from '@/components/front/PageTitle'
import { LocaVoitureCard2, ModalInfo } from '@/components/locations/LocaVoitureCard'
import i18n from '@/i18n';
import { SlEqualizer } from "react-icons/sl";
import { DateToFront, default_heures, default_minutes, setTarif } from '@/tools/utils'
import { Link, useForm } from '@inertiajs/react'
import { Button, Card, Collapse, Slider, Spinner } from '@material-tailwind/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import { FaCarCrash, FaChevronLeft } from 'react-icons/fa'
import { MdOutlineCarRental } from 'react-icons/md'

export default function Locations({ locations, search, location_marques, location_boites, location_carburants, location_categories, en_ventes }) {

  const [datas, setDatas] = useState(null);
  const [lmarque, setLmarque] = useState(null);
  const [lcategorie, setLcat] = useState(null);
  const [lcarburant, setLcarbure] = useState(null);
  const [lannee, setLAnnee] = useState(20);
  const refs = useRef([]); // or an {}
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const [date_debut, setDateDebut] = useState({
    startDate: null,
    endDate: null
  });

  const [date_fin, setDateFin] = useState({
    startDate: null,
    endDate: null
  });

  const { data, get, errors, processing, setData } = useForm({
    search: search?.search ?? '',
    /*date_debut: search?.date_debut ?? '',
    date_fin: search?.date_fin ?? '',
    heure_debut: search?.heure_debut ?? '',
    heure_fin: search?.heure_fin ?? '',
    minute_debut: search?.minute_debut ?? '',
    minute_fin: search?.minute_fin ?? '',
    kilometrage_min: search?.kilometrage_min ?? '',
    kilometrage_max: search?.kilometrage_max ?? '',
    */
    prix_max: search?.prix_max ?? '',
    prix_min: search?.prix_min ?? '',
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
    if (search!=null && search?.carburant) {
      let select = location_carburants?.find(({ id }) => id == search.carburant);
      setLcarbure({ value: select?.id, label: select?.nom });
    }
    /*Marque*/
    if (search!=null && search?.marque) {
      let selectm = location_marques?.find(({ id }) => id == search.marque);
      setLmarque({ value: search.marque, label: selectm?.nom });
    }
    /*Catégorie*/
    if (search!=null && search?.categorie) {
      let selectct = location_categories?.find(({ id }) => id == search.categorie);
      setLcat({ value: search.categorie, label: selectct?.nom });
    }

    /*Date debut et fin*/
    setDateDebut(setTheDate(search.date_debut ?? ''));//for Datepicker
    setDateFin(setTheDate(search.date_fin ?? ''));//for Datepicker
    setDatas(locations?.data);
    setLoaded(true);

  }, []);
  const setTheDate = (val) => {
    if (val === '' || val === null) {
      return {
        startDate: null,
        endDate: null
      };
    }
    val = convertDateFormat(val);
    return { startDate: val, endDate: val };
  }
  const handleDateDebutChange = (newValue) => {
    if (newValue!=null) {
      const { startDate } = newValue;
      let year = getYearFromStringDate(startDate);
      if (startDate != '' && startDate != null && year != '1970') {
        alert(startDate)
        setDateDebut(newValue);
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setData("date_debut", frDate);
      } else {
        setDateDebut({
          startDate: null,
          endDate: null
        });
        setData("date_debut", '');
      }
    }
  }
  const convertDateFormat = (inputDate) => {
    const [day, month, year] = inputDate.split('/');
    const convertedDate = new Date(`${month}/${day}/${year}`);
    const convertedDay = convertedDate.getDate().toString().padStart(2, '0');
    const convertedMonth = (convertedDate.getMonth() + 1).toString().padStart(2, '0');
    const convertedYear = convertedDate.getFullYear();
    return `${convertedMonth}-${convertedDay}-${convertedYear}`;
  }
  function getYearFromStringDate(dateString) {

    if (!dateString) {
      return 1970;
    }
    var parts = dateString.split('/');

    var jsDate = new Date(parts[0], parts[1] - 1, parts[2]);
    var year = jsDate.getFullYear();
    return year;
  }
  const handleDateFinChange = (newValue) => {
    if (newValue) {
      const { startDate } = newValue;
      let year = getYearFromStringDate(startDate);
      if (startDate != '' && startDate != null && year != '1970') {
        setDateFin(newValue);
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setData("date_fin", frDate);
      } else {
        setDateFin({
          startDate: null,
          endDate: null
        });
        setData("date_fin", '');
      }
    }
  }

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
    if (id != '' && val != '') { return { label: val, value: id }; }
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
  };
  const handleSelectBoite = (options) => {
    if (options) {
      const { value } = options;
      setData("type_boite", value);
    } else {
      setData("type_boite", '');
    }
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    get(route('front.locations'), {
      onSuccess: () => {
      },
      onError: (errors) => {
        console.error(errors);
      },
    });
    //}
  };
  const getStartedDate = () => {

    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function getEndDate() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);

    const day = futureDate.getDate().toString().padStart(2, '0');
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = futureDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const [titleDialog, setTitleDialog] = useState(null);
  const [contentDialog, setContentDialog] = useState(null);
  const [btntext, setBtntext] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const showSupDialog = (title, content, btntxt) => {
    setBtntext(btntxt);
    setTitleDialog(title);
    setContentDialog(content);
    setDialogOpen(true)
  }
  const CloseDialog = () => setDialogOpen(false);
  return (
    <FrontLayout>
      <PageTitle title={"Locations de voitures"} head={true}>
        <FrontBreadcrumbs pages={[{ 'url': "", 'page': ('Locations') }]} />
      </PageTitle>
      <ModalInfo
        title={titleDialog}
        content={contentDialog}
        showFunction={dialogOpen}
        closeFunction={CloseDialog}
        btntext={btntext}
      />
      <div className="bg-slate-50_ md:shadow-inner__mt-[1px]">
        <div className="max-w-screen-xl mx-auto px-4 mb-8">
          <div className="md:grid md:grid-cols-12 md:gap-4 ">
            <div className="md:col-span-4 lg:col-span-3 md:py-8 py-4">
              <Card className='bordershadows-smrounded-mdborder dark:bg-gray-800 dark:border-gray-700  border'>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className='p-4'>
                    <h3 className="text-sm text-slate-500 -gray-100 rounded-sm uppercase font-bold">Option de recherche</h3>
                    <Button variant='text' size='sm' className="my-2 w-full dark:bg-slate-700 dark:border-slate-700 dark:shadow dark:border dark:text-white bg-gray-200 py-4 flex gap-2 sm:hidden" onClick={toggleOpen}>
                      <SlEqualizer />  Filtrer
                    </Button>
                    <div className={(open === true ? 'flex' : 'hidden') + ' sm:flex transition-all duration-300'}>
                      <div className="mb-3 sm:mt-4">
                        {/*<SearchBar onSubmit={handleSubmit} searchText='Rechercher' icon={<AiOutlineSearch className='h-5 rounded-sm' />} />
                      <br />*/}

                        {/* <div className="mb-3">
                          <InputLabel htmlFor="date_debut" className='font-bold '  >Date début</InputLabel>

                          <Datepicker
                            required
                            id="date_debut"
                            asSingle={true}
                            useRange={false}
                            classNames={'rounded-none'}
                            value={date_debut}
                            onChange={handleDateDebutChange}
                            i18n={i18n.language}
                            displayFormat={"DD/MM/YYYY"}
                            placeholder={getStartedDate()}
                          />

                          <InputError message={errors.date_debut} className="mt-2" />
                        </div>*/}
                        {/* <div className="mb-3">
                      <div className="grid grid-cols-2">
                              <select name='heure_debut'  value={data.heure_debut} onChange={(e) => setData("heure_debut",e.target.value)} className='text-sm pe-0  rounded-l-md border border-gray-200 bg-white'>
                                  <option value=''>Heure</option>
                                  {default_heures.map((v) =>
                                      <option key={v} value={v}>{v > 9 ? v : '0' + v}H</option>

                                  )}
                              </select>
                              <select  name='minute_debut' 
                              className='text-md rounded-r-md border  border-gray-200 -ms-1'
                              value={data.minute_debut} onChange={(e) => setData("minute_debut",e.target.value)} 
                              >
                                  <option value=''>min</option>
                                  {default_minutes.map((v) =>
                                      <option key={v} value={v}>{v > 9 ? v : '0' + v}</option>
                                  )}
                              </select>
                          </div>
                        <InputError message={errors.heure_debut} className="mt-2" />
                        <InputError message={errors.minute_debut} className="mt-2" />

                                  </div>*/}
                        {/* <div className="mb-3">

                          <InputLabel htmlFor="date_fin" className='font-bold '  >Date fin</InputLabel>

                          <Datepicker
                            required
                            id="date_fin"
                            asSingle={true}
                            useRange={false}
                            classNames={'rounded-none'}
                            value={date_fin}
                            onChange={handleDateFinChange}
                            i18n={i18n.language}
                            displayFormat={"DD/MM/YYYY"}
                            placeholder={getEndDate()}
                          />
                          <InputError message={errors.date_fin} className="mt-2" />

                                </div>*/}
                        {/*  <div className="mb-3">
                     <div className="grid grid-cols-2">
                              <select name='heure_fin' 
                              className='text-sm pe-0  rounded-l-md border border-gray-200 bg-white'
                              value={data.heure_fin} onChange={(e) => setData("heure_fin",e.target.value)} 
                              >
                                  <option value=''>Heure</option>
                                  {default_heures.map((v) =>
                                      <option key={v} value={v}>{v > 9 ? v : '0' + v}H</option>

                                  )}
                              </select>
                              <select name='minute_fin' 
                              className='text-md rounded-r-md border  border-gray-200 -ms-1 '
                              value={data.heure_fin} onChange={(e) => setData("heure_fin",e.target.value)} 
                              >
                                  <option value=''>min</option>
                                  {default_minutes.map((v) =>
                                      <option key={v} value={v}>{v > 9 ? v : '0' + v}</option>
                                  )}
                              </select>
                          </div>
                        <InputError message={errors.heure_fin} className="mt-2" />
                        <InputError message={errors.minute_fin} className="mt-2" />

                      </div>*/}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <InputLabel htmlFor="prix_min" className='font-bold '  >Prix/jour mini</InputLabel>

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
                            <InputLabel htmlFor="prix_max" className='font-bold '  >Prix/jour maxi</InputLabel>

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
                            options={ConvertSelectDataV1(location_marques)}

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
                            options={ConvertSelectDataV1(location_categories)}
                            type="text"
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                          />

                          <InputError message={errors.categorie} className="mt-2" />
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

                            options={ConvertSelectDataV2(location_boites)}
                            type="text"
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                          />

                          <InputError message={errors.type_boite} className="mt-2" />
                        </div>
                        <div className="mb-3">
                          <InputLabel htmlFor="carburant" className='font-bold '  >Carburant</InputLabel>
                          <Select
                            isClearable
                            id="carburant"
                            ref={addToRefs}
                            value={lcarburant}
                            isSearchable={true}
                            //defaultInputValue={ConvertSelectDataV1(location_carburants.filter(({id})=>id==2))}
                            //defaultInputValue={{ value:data.carburant,label:"OK" }}
                            onChange={(options) =>
                              !options ? handleSelectCarburant(null) : handleSelectCarburant(options)
                            }
                            options={ConvertSelectDataV1(location_carburants)}
                            type="text"
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                          />
                         
                          <InputError message={errors.carburant} className="mt-2" />
                        </div>

                        <div className="pt-4 mt-4 border-t dark:border-slate-700">
                          <Button color='black' disabled={processing ? 'disabled' : ''} type='submit' className='w-full dark:bg-yellow-500 dark:text-black flex justify-center gap-2'>{processing && <Spinner className="h-4 w-4" />}Rechercher {processing ? '...' : ''}</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            <div className="md:col-span-8 lg:col-span-9 md:py-4 ">
              {datas !== null && datas?.length > 0 &&
                <>
                  <div className="pb-4">
                    { /*  <SearchBar placeholder='Rechercher dans les voitures disponibles...' />
              */}</div>
                  {datas != null && datas?.length > 0 && datas?.map(({ id, points_retrait, voiture,
                    tarif_location_hebdomadaire, tarif_location_heure,
                    tarif_location_journalier, tarif_location_mensuel, conditions, description
                  }, index) => {
                    return <LocaVoitureCard2
                      id={id}
                      nb_personne={voiture?.nombre_place}
                      type_boite={voiture?.type_transmission}
                      vitesse={voiture?.nombre_vitesse}
                      nb_grande_valise={voiture?.nombre_grande_valise}
                      nb_petite_valise={voiture?.nombre_petite_valise}
                      volume_coffre={voiture?.volume_coffre}
                      marque={voiture?.marque?.nom}
                      categorie={voiture?.nombre_petite_valise}
                      nom={voiture?.nom}
                      carburant={voiture?.type_carburant?.nom}
                      photo={voiture?.photo}
                      points={points_retrait}
                      showInfoFunc={() => showSupDialog("Conditions de location", "<div className='font-bold text-xl text-red-500 mb-2 '>" + voiture?.nom + "</div>" + conditions ?? '' + " <hr className='dark:border-gray-700 '/> " + description ?? '', "Compris")}
                      nb_images={voiture?.location_medias?.length}
                      puissance={voiture?.puissance_moteur}
                      tarif={setTarif(tarif_location_heure, tarif_location_journalier, tarif_location_hebdomadaire, tarif_location_mensuel)}
                      key={index} />
                  })}

                  <div className="">
                    <Pagination className={"my-4"} links={locations?.links} />
                  </div>
                </>
              }

              {(datas === null || datas?.length === 0) && loaded &&
                <div className='p-10 md:py-28 border md:mt-4 shadow-md dark:bg-yellow-500 dark:text-black dark:border-gray-800 mb-12 mx-auto text-center  rounded-lg'>
                  <MdOutlineCarRental className='h-60 w-60 rotate-12 mx-auto  mb-4 text-slate-200 ' />
                  <span className='text-slate-500 dark:text-slate-900'>Aucune voiture ne correspond à vos critères de recherche !</span>
                  <div className='font-bold'>Veuillez réessayer en choississant d'autres paramètres</div>
                  <div className="p-4">
                    <Button className='text-center' size="sm" color='gray'>
                      <Link className="flex items-center" href={route('front.locations')}>
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
                  : <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>}
              </div>
              <input type="search" disabled={disabled} value={searchText} onChange={onChange} id="search" className="disabled:bg-zinc-200 block w-full px-3 py-[13px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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


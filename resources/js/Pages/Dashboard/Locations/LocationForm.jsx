import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Avatar, Card, CardBody, Progress } from '@material-tailwind/react';
import Select from 'react-select';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';
import { useTranslation } from 'react-i18next';
import { DateToFront } from '@/tools/utils';
import i18n from '@/i18n';

//import DatePicker from "react-datepicker";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/css/quill-editor.css';


import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import ModaleImage from '@/components/ModaleImage';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function LocationForm({ className = '', location = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const { t } = useTranslation();
    const { voitures, point_retraits,localisations } = usePage().props
    const [showDetails, setShowDetail] = useState(true);
    const [voiture, setVoiture] = useState([]);
    const [showVoitureId, setShowVoitureId] = useState([]);
    const [date_debut, setDateDebut] = useState({
        startDate: null,
        endDate: null
    });

    const [date_fin, setDateFin] = useState({
        startDate: null,
        endDate: null
    });

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote',{ 'align': [] }],
    
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
         
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
          ['clean'],                                         // remove formatting button
          ['link', 'image', 'video']                         // link and image, video
        ],
      };
    
      const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'color', 'background',
        'align', 'code-block', 'formula'
      ];

    useEffect(() => {
        if (data.date_etat === '') {
            let today = new Date(),
                txtDate = DateToFront(today, 'fr', 'd/m/Y');
            setDateDebut(setTheDate(today));
            let in6Month = new Date().setMonth(new Date().getMonth() + 6);
            setDateFin(setTheDate(in6Month));//for Datepicker
        } else {
            setDateDebut(setTheDate(location.date_debut_location ?? ''));//for Datepicker
            setDateFin(setTheDate(location.date_fin_location ?? ''));//for Datepicker
        }
    }, [location])
    useEffect(() => {
        ShowVoiture(data.voiture_id ?? '');
    }, [showVoitureId]);

    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}  

    const setTheDate = (val) => {
        if (val === '') {
            val = new Date()
        }
        return { startDate: val, endDate: val };
    }

    const handleDateDebutChange = (newValue) => {
        const { startDate } = newValue;
        setDateDebut(newValue);
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setData("date_debut_location", frDate);
    }
    const handleDateFinChange = (newValue) => {
        const { startDate } = newValue;
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setDateFin(newValue);
        setData("date_fin_location", frDate);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const handleSelectVoiture = (value) => {
        setData('voiture_id', value);
        setShowVoitureId(value ?? '');
    }
    const handleFilesChange = (e) => {
            const files = Array.from(e.target.files);
            setData("photos",files);
        }

    const handleMultiSelectChange = (selected) => {
        let newTab = [];
        if (Array.isArray(selected)) {
            selected.map(({ value }) => {
                newTab.push(value);
            })
        }
        setData('point_retraits', newTab);
    };
    const handleMultiLocalChange = (selected) => {
        let newTab = [];
        if (Array.isArray(selected)) {
            selected.map(({ value }) => {
                newTab.push(value);
            })
        }
        setData('localisations', newTab);
    };
    const setDefaultMultiValue = (array_ids) => {
        let tb = [];
        if (Array.isArray(array_ids)) {
            array_ids.map(({ lieu, id }) => {
                tb.push({ label: lieu, value: id });
            })
        }
        return tb;
    }
    const setDefaultMultiLocal = (array_ids) => {
        let tb = [];
        if (Array.isArray(array_ids)) {
            array_ids.map(({ nom, id }) => {
                tb.push({ label: nom, value: id });
            })
        }
        return tb;
    }
    const SetPoints=(array_ids)=>{
        let ids=[];
        if (Array.isArray(array_ids)) {
            array_ids.map(({ id }) => {
                ids.push(id);
            })
        }
       return ids
    }
    const handleDescription = (value) => {
        setData('description',value);
    }
    const handleConditions = (value) => {
        //setDescription(value);
        setData('conditions',value);
    }
    const setDefaultValue = (id, val) => {
        if (id && val) { return { label: val, value: id }; }
        return null;
    }
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
    const ShowVoiture = (id = 0) => {

        let v = voitures.find(obj => obj.id === id);
        if (v) {
            setVoiture(v);
        } else {
            setVoiture([]);
        }
    }
    const ConvertSelectDataV2 = (tab) => {
        if (Array.isArray(tab)) {
            let v = [];
            tab.map(({ id, lieu }) => {
                v.push({ value: id, label: lieu });
            });
            return v;
        }
        return [];
    }
    const ConvertSelectDataV3 = (tab) => {
        if (Array.isArray(tab)) {
            let v = [];
            tab.map(({ id, nom }) => {
                v.push({ value: id, label: nom });
            });
            return v;
        }
        return [];
    }
    const addToRefs = el => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const { data, setData, post, progress, errors, processing, recentlySuccessful } = useForm(location !== null && action === 'update' ?
        {
            date_etat: 'new',
            voiture_id: location.voiture_id ?? '',
            tarif_location_heure: location.tarif_location_heure ?? '',
            tarif_location_hebdomadaire: location.tarif_location_hebdomadaire ?? '',
            tarif_location_journalier: location.tarif_location_journalier ?? '',
            tarif_location_mensuel: location.tarif_location_mensuel ?? '',
            date_debut_location: DateToFront(location.date_debut_location, i18n.language, 'd/m/Y') ?? '',
            date_fin_location: DateToFront(location.date_fin_location, i18n.language, 'd/m/Y') ?? '',
            point_retraits: SetPoints(location?.points_retrait),
            localisation_villes:location?.localisations,
            localisations:SetPoints(location?.localisations),
            photos: [],
            conditions: location.conditions ?? '',
            description: location.description ?? ''
        } : {
            date_etat: '',
            voiture_id: '',
            tarif_location_heure: '',
            tarif_location_hebdomadaire: '',
            tarif_location_journalier: '',
            tarif_location_mensuel: '',
            date_debut_location: DateToFront(new Date(), i18n.language, 'd/m/Y'),
            date_fin_location: DateToFront(new Date().setMonth(new Date().getMonth() + 6), i18n.language, 'd/m/Y'),
            point_retraits: [],
            localisation_villes: [],
            localisations: [],
            photos: [],
            conditions: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (location && action === 'update') {
            post(route('dashboard.locations.update', location.id), data, {
                onSuccess: () => {
                    // Handle success, e.g., redirect
                    //alert('Ok')
                },

                onError: (errors) => {
                    //console.log(errors);
                },
            });
        }
        if (action === 'save') {
            post(route('dashboard.locations.store'), {
                onSuccess: () => {
                    // Handle success, e.g., redirect
                    //alert('Ok')
                },
                onError: (errors) => {
                    //console.log(errors);
                },
            });
        }
    };

    return (
        <div className='md:grid md:grid-cols-2 md:gap-4'>
            <Card>
                <CardBody>
                    <section className={className}>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <InputLabel htmlFor="voiture_id">Voiture</InputLabel>
                                <Select
                                    id="voiture_id"
                                    required
                                    isClearable={true}
                                    isSearchable={true}
                                    defaultValue={setDefaultValue(data.voiture_id, (location && location.voiture.nom) ? location.voiture.nom : '')}
                                    onChange={(options) =>
                                        !options ? handleSelectVoiture("") : handleSelectVoiture(options.value)
                                    }
                                    className="mt-1 block w-full"
                                    options={ConvertSelectDataV1(voitures)}
                                />


                                <InputError message={errors.voiture_id} className="mt-2" />
                            </div>
                            <div className='md:grid md:grid-cols-2 gap-4'>
                                <div>
                                    <InputLabel htmlFor="tarif_location_heure"  >Tarif par heure</InputLabel>
                                    <TextInput
                                        id="tarif_location_heure"
                                        ref={addToRefs}
                                        value={data.tarif_location_heure}
                                        onChange={handleInputChange}
                                        type="number"
                                        className="mt-1 block w-full"
                                        placeholder={t('5000')}

                                    />

                                    <InputError message={errors.tarif_location_heure} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="tarif_location_journalier"  >Tarif par jour</InputLabel>
                                    <TextInput
                                        id="tarif_location_journalier"
                                        ref={addToRefs}
                                        value={data.tarif_location_journalier}
                                        onChange={handleInputChange}
                                        type="number"
                                        className="mt-1 block w-full"
                                        placeholder={t('20000')}

                                    />

                                    <InputError message={errors.tarif_location_journalier} className="mt-2" />
                                </div>
                            </div>
                            <div className='md:grid md:grid-cols-2 gap-4'>

                                <div>
                                    <InputLabel htmlFor="tarif_location_hebdomadaire"  >Tarif par semaine (Hedomadaire)</InputLabel>
                                    <TextInput
                                        id="tarif_location_hebdomadaire"
                                        ref={addToRefs}
                                        value={data.tarif_location_hebdomadaire}
                                        onChange={handleInputChange}
                                        type="number"
                                        className="mt-1 block w-full"
                                        placeholder={t('100000')}

                                    />

                                    <InputError message={errors.tarif_location_hebdomadaire} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="tarif_location_mensuel"  >Tarif par mois</InputLabel>
                                    <TextInput
                                        id="tarif_location_mensuel"
                                        ref={addToRefs}
                                        value={data.tarif_location_mensuel}
                                        onChange={handleInputChange}
                                        type="number"
                                        className="mt-1 block w-full"
                                        placeholder={t('300000')}

                                    />
                                    <InputError message={errors.tarif_location_mensuel} className="mt-2" />
                                </div>
                            </div>

                            <div className='md:grid md:grid-cols-12 gap-4'>
                                <div className='md:col-span-6'>
                                    <InputLabel htmlFor="date_debut_location" >Date début location</InputLabel>

                                    {/* <DatePicker selected={new Date(startDate)} locale={i18n.language=='fr'?fr:enUS} dateFormat="P" onChange={(date) => setTheDate(date)} />
                                */}
                                    <Datepicker
                                        required
                                        id="date_debut_location"
                                        asSingle={true}
                                        useRange={false}
                                        classNames={'rounded-none'}
                                        value={date_debut}
                                        onChange={handleDateDebutChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={'10/01/' + (new Date().getFullYear())}
                                    />
                                    {console.log(date_debut)}
                                    {/* <TextInput
                                        id="date_debut_location"
                                        ref={addToRefs}
                                        value={data.date_debut_location}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="mt-1 w-full block  "
                                        placeholder={'10/01/'+(new Date().getFullYear())}

                            />*/}
                                    <InputError message={errors.date_debut_location} className="mt-2" />
                                </div>
                                <div className='md:col-span-6'>

                                    <InputLabel htmlFor="date_fin_location" >Date fin location</InputLabel>
                                    <Datepicker
                                        required
                                        id="date_debut_location"
                                        asSingle={true}
                                        classNames={'rounded-none'}
                                        value={(date_fin)}
                                        useRange={false}
                                        onChange={handleDateFinChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={'10/07/' + (new Date().getFullYear())}
                                    />
                                    {/* <TextInput
                                        id="date_fin_location"
                                        ref={addToRefs}
                                        value={data.date_fin_location}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="mt-1 w-full block  "
                                        placeholder={'10/01/'+(new Date().getFullYear())}

                        />*/}
                                    <InputError message={errors.date_fin_location} className="mt-2" />
                                </div>
                            </div>
                            <div className='md:col-span-4'>

                                <InputLabel htmlFor="point_retraits" >Points de retrait</InputLabel>
                                <Select
                                    isMulti
                                    required
                                    id="point_retraits"
                                    ref={addToRefs}
                                    isSearchable={true}
                                    onChange={handleMultiSelectChange}
                                    className="mt-1 block w-full"
                                    defaultValue={ConvertSelectDataV2(location?.points_retrait?? [])}
                                    options={ConvertSelectDataV2(point_retraits)}
                                />
                                <InputError message={errors.point_retraits} className="mt-2" />
                                <InputError message={errors["point_retraits.0"]} className="mt-2" />
                                <InputError message={errors["point_retraits.1"]} className="mt-2" />
                            </div>
                            {console.log("ICI",(location??[]))}

                            <div className='md:col-span-4'>
                                    {console.log(data)}
                                <InputLabel htmlFor="localisations" >Localisations (lieux de recherche associés)</InputLabel>
                                <Select
                                    isMulti
                                    required
                                    id="localisations"
                                    ref={addToRefs}
                                    isSearchable={true}
                                    onChange={handleMultiLocalChange}
                                    className="mt-1 block w-full"
                                    defaultValue={ConvertSelectDataV3(data?.localisation_villes?? [])}
                                    options={ConvertSelectDataV3(localisations)}
                                />
                                <InputError message={errors.localisations} className="mt-2" />
                                <InputError message={errors["localisations.0"]} className="mt-2" />
                                <InputError message={errors["localisations.1"]} className="mt-2" />
                            </div>
                            <div>
                    <InputLabel htmlFor="photo" >Photos de la location (3 à 10 images maximum)</InputLabel>
                        <input
                            id="photo" accept="image/*"
                            multiple
                            ref={addToRefs}
                            onChange={handleFilesChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border border-gray-300 py-1.5 px-4 block w-full"

                        />
                        {progress && (
                            <Progress value={progress.percentage} color="blue" max="100">
                                {progress.percentage}%
                            </Progress>
                        )}

                        <InputError message={errors.photo} className="mt-2" />
                    </div>
                            <div >
                                <div >

                                    <InputLabel htmlFor="conditions" >Conditions de la location</InputLabel>
                                    <div className="mb-28">
                                    <ReactQuill theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    className='h-[250px] border-0 bg-white' value={data.conditions} onChange={handleConditions} />
                                    </div> 
                                    {/*<TextArea
                                        required
                                        id="conditions"
                                        ref={addToRefs}
                                        value={data.conditions}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="mt-1 w-full block"

                                    />*/}
                                    <InputError message={errors.conditions} className="mt-2" />
                                </div>
                            </div>
                            <div className=''>
                                <div>
                                    <InputLabel htmlFor="nom">Description</InputLabel>
                                    <div className="mb-28">
                                    <ReactQuill theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    className='h-[400px] border-0 bg-white' value={data.description} onChange={handleDescription} />
                                    </div> 
                                    {/*<TextArea
                                        id="description"
                                        ref={addToRefs}
                                        value={data.description}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="mt-1 block w-full"
                                        placeholder={t('Description')}

                                    />*/}

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                            </div>


                            <div className="flex items-center gap-4">
                                {progress > 0 && <div>{`Upload Progress: ${progress}%`}</div>}
                                <PrimaryButton
                                    className='bg-blue-600 hover:bg-blue-800 text-white'
                                    disabled={processing}>
                                    <Translate>{btntext}</Translate>
                                </PrimaryButton>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <Translate>Sauvegardé</Translate>
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </section>
                </CardBody>
            </Card>
            {voiture != null && voiture != '' &&
                <Card className={"transition-all duration-300 mt-8 md:mt-0 "}>
                    <CardBody className='overflow-auto'>
                        <section>
                            {voiture != null && voiture != '' && (
                                <div>

                                    {voiture.nom != null &&
                                        <div className="font-bold pb-3 text-xl ">
                                            {voiture.nom}
                                        </div>
                                    }
                                    <ModaleImage title={voiture.nom} url={HTTP_FRONTEND_HOME + '' + voiture.photo}>

                                        {voiture.photo != '' && voiture.photo != null &&
                                            <LazyLoadImage src={HTTP_FRONTEND_HOME + voiture.photo} alt={voiture.nom} className='w-auto  rounded-md h-auto max-w-[100%] _max-h-[400px]' />
                                        }
                                    </ModaleImage>

                                    <div className="border-t mt-4">
                                        {voiture.immatriculation != null && voiture.immatriculation != '' &&
                                            <div className="border-b  flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Immatriculation :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.immatriculation}
                                                </div>
                                            </div>
                                        }
                                        {voiture.annee_fabrication != null &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Année :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.annee_fabrication}
                                                </div>
                                            </div>
                                        }
                                        {voiture.nombre_place > 0 &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Nombre de places :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.nombre_place}
                                                </div>
                                            </div>
                                        }
                                        {voiture.type_eclairage != null && voiture.type_eclairage != '' &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Eclairage :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.type_eclairage}
                                                </div>
                                            </div>
                                        }
                                        {voiture.nombre_vitesse != null && voiture.nombre_vitesse != '' &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Nombre de vitesses :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.nombre_vitesse}
                                                </div>
                                            </div>
                                        }
                                        {voiture.nombre_vitesse != null && voiture.nombre_vitesse != '' &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Nombre de vitesses :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.nombre_vitesse}
                                                </div>
                                            </div>
                                        }
                                        {voiture.consommation != null &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Consommation :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.consommation}
                                                </div>
                                            </div>
                                        }

                                        {voiture.volume_coffre != null &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Volume du coffre :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.volume_coffre}
                                                </div>
                                            </div>
                                        }
                                        {voiture.capacite_reservoir != null && voiture.capacite_reservoir != '' &&
                                            <div className="border-b flex flex-wrap gap-2 px-2 py-2">
                                                <div className="col-span-2 font-bold ">
                                                    Réservoir :
                                                </div>
                                                <div className="col-span-4">
                                                    {voiture.capacite_reservoir}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="medias py-4">
                                        <div className="flex items-center -space-x-4">
                                            {voiture && voiture.location_medias && voiture.location_medias.length>0 && voiture.location_medias.map(({url,nom},index)=>(
                                                   <div key={index}> 
                                                    <ModaleImage url={HTTP_FRONTEND_HOME+''+url}>
                                                     <Avatar
                                                    variant="circular"
                                                    alt={nom}
                                                    className="border-2 border-white hover:z-10 focus:z-10"
                                                    src={HTTP_FRONTEND_HOME+''+url}
                                                  />
                                                  </ModaleImage>
                                                  </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </section>
                    </CardBody>
                </Card>
            }
        </div>
    );
}


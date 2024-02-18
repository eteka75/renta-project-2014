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
import { DateToFront, formaterMontant } from '@/tools/utils';
import i18n from '@/i18n';

//import DatePicker from "react-datepicker";

import { enUS, fr } from 'date-fns/locale';
import { format } from 'date-fns';


import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import ModaleImage from '@/components/ModaleImage';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function VenteForm({ className = '', vente = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const { t } = useTranslation();
    const { voitures, point_retraits,options_ventes } = usePage().props;
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

    useEffect(() => {
        if (data.date_etat === '') {
            let today = new Date();
                //txtDate = DateToFront(today, i18n.language, 'd/m/Y');
            setDateDebut(setTheDate(today));

            let in6Month = new Date().setMonth(new Date().getMonth() + 6);
            setDateFin(setTheDate(in6Month));//for Datepicker
        } else {
            setDateDebut(setTheDate(vente.date_debut_vente ?? ''));//for Datepicker
            setDateFin(setTheDate(vente.date_fin_vente ?? ''));//for Datepicker
        }

        /* points ids */
        if (vente && vente.points_retrait) {
            let ids = [];
            vente.points_retrait.map(({ id }) => { ids.push(id) });
            setData('point_retraits', ids);
        }
    }, [vente])
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
        setData("date_debut_vente", frDate);
    }
    const handleDateFinChange = (newValue) => {
        const { startDate } = newValue;
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setDateFin(newValue);
        setData("date_fin_vente", frDate);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const handleSelectVoiture = (value) => {
        setData('voiture_id', value);
        setShowVoitureId(value ?? '');
    }

    const handleSelectChange = (selected) => {
       let {value}=selected;
        setData('point_retrait_id', value);
    };
    const handleOptionVenteChange = (selected) => {
        let newTab = [];
        if (Array.isArray(selected)) {
            selected.map(({ value }) => {
                newTab.push(value);
            })
        }
        setData('options_vente', newTab);
    };
    const handleFileChange=(e)=>{
        const files = Array.from(e.target.files);
        setData("photos",files);
    }
    const setDefaultMultiValue = (array_ids) => {
        let tb = [];
        if (Array.isArray(array_ids)) {
            array_ids.map(({ nom, id, prix }) => {
                tb.push({ label: nom +'('+formaterMontant(prix)+')', value: id });
            });
        }
        return tb;
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
    const setDefaultIds=(tab)=>{
        if (Array.isArray(tab)) {
            let v = [];
            tab.map(({id}) => {
                v.push(id);
            });
            return v;
        }
        return [];
    }
    const ConvertSelectDataV3 = (tab) => {
        if (Array.isArray(tab)) {
            let v = [];
            tab.map(({ id, nom, prix }) => {
                v.push({ value: id, label: nom+' ('+formaterMontant(prix,i18n.language)+')' });
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

    const { data, setData, post, progress, errors, processing, recentlySuccessful } = useForm(vente !== null && action === 'update' ?
        {
            date_etat: 'new',
            voiture_id: vente.voiture_id ?? '',
            delai_livraison: vente.delai_livraison ?? '',
            duree_garantie: vente.duree_garantie ?? '',
            kilometrage: vente.kilometrage ?? '',
            prix_vente: vente.prix_vente ?? '',
            prix_defaut: vente.prix_defaut ?? '',
            date_debut_vente: DateToFront(vente.date_debut_vente, i18n.language, 'd/m/Y') ?? '',
            date_fin_vente: DateToFront(vente.date_fin_vente, i18n.language, 'd/m/Y') ?? '',
            point_retrait_id: vente.point_retrait_id,
            options_vente_o: vente.option_ventes??'',
            options_vente: setDefaultIds(vente.option_ventes)??'',
            photos: [],
            description: vente.description ?? '',
            lien_video: vente.lien_video ?? ''
        } : {
            date_etat: '',
            lien_video: '',
            voiture_id: '',
            delai_livraison: '',
            kilometrage: '',
            prix_vente: '',
            prix_defaut: '',
            options_vente_o: [],
            date_debut_vente: DateToFront(new Date(), i18n.language, 'd/m/Y'),
            date_fin_vente: DateToFront(new Date().setMonth(new Date().getMonth() + 6), i18n.language, 'd/m/Y'),
            point_retrait_id: '',
            options_vente: [],
            photos: [],
            description: ''
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (vente && action === 'update') {
            post(route('dashboard.ventes.update', vente.id), data,  {
                forceFormData: true,
                onSuccess: () => {
                    // Handle success, e.g., redirect
                    //alert('Ok')
                },
                onError: (errors) => {
                    //console.log("ERRORRRRRRRRRRRS",errors);
                },
            });
        }
        if (action === 'save') {
            post(route('dashboard.ventes.store'), {
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
                                    defaultValue={setDefaultValue(data.voiture_id, (vente && vente.voiture.nom) ? vente.voiture.nom : '')}
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
                                <InputLabel htmlFor="prix_vente" className='text-green-500'>Prix de vente</InputLabel>
                                <TextInput
                                    id="prix_vente"
                                    required
                                    ref={addToRefs}
                                    value={data.prix_vente}
                                    onChange={handleInputChange}
                                    type="number"
                                    className="mt-1 block  w-full"
                                    placeholder={t('2500000')}
                                />
                                <InputError message={errors.prix_vente} className="mt-2" />
                            </div>                           
                            <div>
                                <s className='text-red-500'><Translate htmlFor="prix_defaut"   >Prix par défaut</Translate></s>
                                <TextInput
                                    id="prix_defaut"
                                    ref={addToRefs}
                                    value={data.prix_defaut}
                                    onChange={handleInputChange}
                                    type="number"
                                    className="mt-1 block w-full"
                                    
                                    placeholder={t('3000000 (facultatif)')}

                                />
                                <InputError message={errors.prix_defaut} className="mt-2" />
                            </div>                           
                            </div>                           
                            <div className='md:grid md:grid-cols-2 gap-4'>
                            
                            <div>
                                <InputLabel htmlFor="delai_livraison"  >Délai de livraison</InputLabel>
                                <TextInput
                                    id="delai_livraison"
                                    ref={addToRefs}
                                    value={data.delai_livraison}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="mt-1 block w-full"
                                    placeholder={t('24 Heures')}

                                />
                                <InputError message={errors.delai_livraison} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="duree_garantie">Durée de la garantie</InputLabel>
                                <TextInput
                                    id="duree_garantie"
                                    ref={addToRefs}
                                    value={data.duree_garantie}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="mt-1 block w-full"
                                    placeholder={t('6 mois')}

                                />
                                <InputError message={errors.duree_garantie} className="mt-2" />
                            </div>
                            <div className='col-span-2'>
                                <InputLabel htmlFor="kilometrage">Kilmétrage</InputLabel>
                                <TextInput
                                    id="kilometrage"
                                    ref={addToRefs}
                                    value={data.kilometrage}
                                    onChange={handleInputChange}
                                    type="number"
                                    className="mt-1 block w-full"
                                    placeholder={t('160000')}

                                />
                                <InputError message={errors.kilometrage} className="mt-2" />
                            </div>
                            </div>
                            

                            <div className='md:grid md:grid-cols-12 gap-4'>
                                <div className='md:col-span-6'>
                                    <InputLabel htmlFor="date_debut_vente" >Date début vente</InputLabel>

                                    {/* <DatePicker selected={new Date(startDate)} locale={i18n.language=='fr'?fr:enUS} dateFormat="P" onChange={(date) => setTheDate(date)} />
                                */}
                                    <Datepicker
                                        required
                                        id="date_debut_vente"
                                        asSingle={true}
                                        useRange={false}
                                        classNames={'rounded-none'}
                                        value={date_debut}
                                        onChange={handleDateDebutChange}
                                        i18n={i18n.language}
                                        displayFormat={"DD/MM/YYYY"}
                                        placeholder={'10/01/' + (new Date().getFullYear())}
                                    />
                                    <InputError message={errors.date_debut_vente} className="mt-2" />
                                </div>
                                <div className='md:col-span-6'>

                                    <InputLabel htmlFor="date_fin_vente" >Date fin de vente</InputLabel>
                                    <Datepicker
                                        required
                                        id="date_fin_vente"
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
                                        id="date_fin_vente"
                                        ref={addToRefs}
                                        value={data.date_fin_vente}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="mt-1 w-full block  "
                                        placeholder={'10/01/'+(new Date().getFullYear())}

                        />*/}
                                    <InputError message={errors.date_fin_vente} className="mt-2" />
                                </div>
                            </div>
                            <div className='md:col-span-4'>

                                <InputLabel htmlFor="point_retrait_id" >Points de retrait</InputLabel>
                                <Select
                                    required
                                    id="point_retrait_id"
                                    ref={addToRefs}
                                    isSearchable={true}
                                    onChange={handleSelectChange}
                                    className="mt-1 block w-full"
                                    defaultValue={setDefaultValue(data.point_retrait_id,vente && vente.point_retrait?vente.point_retrait.lieu:'')}

                                    options={ConvertSelectDataV2(point_retraits)}
                                />
                                <InputError message={errors.point_retrait_id} className="mt-2" />
                            </div>
                            <div className='md:col-span-4'>

                                <InputLabel htmlFor="options_vente" >Options de ventes</InputLabel>
                                <Select
                                    isMulti
                                    id="options_vente"
                                    ref={addToRefs}
                                    isSearchable={true}
                                    onChange={handleOptionVenteChange}
                                    className="mt-1 block w-full"
                                    defaultValue={setDefaultMultiValue(data.options_vente_o ? data.options_vente_o : [])}
                                    options={ConvertSelectDataV3(options_ventes)}
                                />
                                <InputError message={errors.options_vente} className="mt-2" />
                                <InputError message={errors["ptotions_options_ventevente.0"]} className="mt-2" />
                                <InputError message={errors["options_vente.1"]} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="lien_video"  >Lien de la vidéo</InputLabel>
                                <TextArea
                                    id="lien_video"
                                    ref={addToRefs}
                                    value={data.lien_video}
                                    onChange={handleInputChange}
                                    type="text"
                                    rows='5'
                                    placeholder="1- Aller sur la vidéo Youtube/Vimeo/Youtube 2- Faire clique droit sur la vidéo 3-Clique sur 'Copier le code d'intégration' 4- Coller le code ici 5-Modifier au besoin le contenu (taille de l'affichage de la vidéo)"
                                    className="mt-1 block text-xs w-full"


                                />

                                <InputError message={errors.lien_video} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="photos" >Photos (3 à 5 images, 10 images maximum)</InputLabel>
                                <input
                                    multiple
                                    id="photos" accept="image/*"
                                    ref={addToRefs}
                                    onChange={handleFileChange}
                                    type="file"
                                    className="mt-1 rounded-md  bg-white shadow-none border border-gray-300 py-1.5 px-4 block w-full"

                                />
                                {progress && (
                                    <Progress value={progress.percentage} color="blue" max="100">
                                        {progress.percentage}%
                                    </Progress>
                                )}

                                <InputError message={errors.photos} className="mt-2" />
                                {errors.photos && errors.photos.map((error, index) => (
                                <InputError key={index} message={error} className="mt-2" />
                                ))}
                            </div>
                            <div className=''>
                                <div>
                                    <InputLabel htmlFor="nom">Description</InputLabel>

                                    <TextArea
                                        id="description"
                                        ref={addToRefs}
                                        value={data.description}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="mt-1 block w-full"
                                        placeholder={t('Description')}

                                    />

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
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
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

                                        <div className="medias py-4">
                                        <div className="flex items-center -space-x-4">
                                        
                                            {voiture && voiture.medias && voiture.medias.length>0 && voiture.medias.map(({url,nom},index)=>(
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


                                </div>
                            )}
                        </section>
                    </CardBody>
                </Card>
            }
        </div>
    );
}


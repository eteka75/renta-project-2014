import {  useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress } from '@material-tailwind/react';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import Select from 'react-select'
import { DateToFront, types_transmission } from '@/tools/utils';
import i18n from '@/i18n';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/css/quill-editor.css';

export default function VoitureForm({ className = '', voiture = null, action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const { t } = useTranslation();
    const { marques, categories, type_carburants,sys_securites } = usePage().props
    const [syst_ids, SetSystId] = useState([]);
    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(voiture !== null && action === 'update' ?
        {
            nom: voiture.nom??'',
            photo: '',
            marque_id: voiture.marque_id??'',
            annee_fabrication:voiture.annee_fabrication?? '',
            nombre_place: voiture.nombre_place??'',
            volume_coffre:voiture.volume_coffre?? '',
            date_achat:DateToFront(voiture.date_achat,i18n.language,'d/m/Y')?? '',
            couleur: voiture.couleur??'',
            disponibilite: voiture.disponibilite??0,
            type_carburant_id:voiture.type_carburant_id?? '',
            categorie_id:voiture.categorie_id?? '',
            systeme_securites:[],
            puissance_moteur:voiture.puissance_moteur?? '',
            immatriculation:voiture.immatriculation?? '',
            type_transmission:voiture.type_transmission?? '',
            dimenssions:voiture.dimenssions?? '',
            nombre_vitesse:voiture.nombre_vitesse?? '',
            nombre_portes:voiture.nombre_portes?? '',
            consommation:voiture.consommation?? '',
            capacite_reservoir:voiture.capacite_reservoir?? '',
            emission_co2:voiture.emission_co2?? '',
            type_eclairage:voiture.type_eclairage?? '',
            type_suspenssion:voiture.type_suspenssion?? '',
            technologies_a_bord:voiture.technologies_a_bord?? '',
            description:voiture.description?? ''
        } : {
            nom: '',
            photo: '',
            marque_id: '',
            annee_fabrication: '',
            nombre_place: '',
            volume_coffre: '',
            date_achat: '',
            couleur: '',
            disponibilite: 0,
            type_carburant_id: '',
            categorie_id: '',
            immatriculation: '',
            systeme_securites: '',
            puissance_moteur: '',
            nombre_portes: '',
            type_transmission: '',
            dimenssions: '',
            nombre_vitesse: '',
            consommation: '',
            capacite_reservoir: '',
            emission_co2: '',
            type_eclairage: '',
            type_suspenssion: '',
            technologies_a_bord: '',
            description: ''
        });
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}

    
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

    const ConvertSelectData = (tab) => {
        if (Array.isArray(tab)) {
            let v = [];
            tab.map(({ id, nom }) => {
                v.push({ value: id, label: nom });
            })
            return v;
        }
        return {};
    }

    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("photo", file[0]);
        }
    };  
    const handleDescription = (value) => {
        setData('description',value);
    }
    const setDefaultValue=(id, val)=>{
        return { label: val, value: id };
    }
    const setDefaultMultiValue=(array_ids)=>{
        let tb=[];
        if(Array.isArray(array_ids)){
            array_ids.map(({nom,id})=>{
                tb.push({ label: nom, value: id });
            })
        }
        return tb;
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const handleMultiSelectChange = (selected) => {
        let newTab=[];
        if(Array.isArray(selected)){
            selected.map(({value})=>{
                newTab.push(value);
            })
        }
        setData('systeme_securites',newTab);       
    };
    const addToRefs = el => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };
const setRealSysId=()=>{
    setData('systeme_securite',syst_ids);
    return true;
}
    const handleSubmit = (e) => {
        e.preventDefault();
        //if(!setRealSysId()){return;}
        if (action === 'update') {
            post(route('dashboard.voitures.update', voiture.id), data, {
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
            post(route('dashboard.voitures.store'), {
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
        <section className={className}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="flex"><InputLabel htmlFor="nom"  >Nom</InputLabel><span className="text-red-500">*</span></div>
                    <TextInput
                        id="nom"
                        ref={addToRefs}
                        value={data.nom}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t('Toyota Camry Full option')}

                    />

                    <InputError message={errors.nom} className="mt-2" />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-4'>
                    <div>
                        <div className="flex"><InputLabel htmlFor="annee_fabrication">Année de fabrication</InputLabel> <span className="text-red-500">*</span></div>
                        <TextInput
                            id="annee_fabrication"
                            ref={addToRefs}
                            value={data.annee_fabrication}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('2018')}

                        />

                        <InputError message={errors.annee_fabrication} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="date_achat"  >Date d'achat</InputLabel>
                        <TextInput
                            id="date_achat"
                            ref={addToRefs}
                            value={data.date_achat}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('10/01/2012')}

                        />

                        <InputError message={errors.date_achat} className="mt-2" />
                    </div>
                    <div>
                        <div className="flex"><InputLabel htmlFor="nombre_place">Nombre de places</InputLabel><span className="text-red-500">*</span></div>
                        <TextInput
                            id="nombre_place"
                            ref={addToRefs}
                            value={data.nombre_place}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-0 block w-full"
                            placeholder={t('5')}

                        />

                        <InputError message={errors.nombre_place} className="mt-2" />
                    </div>

                </div>
                <div className='grid md:grid-cols-3 md:gap-4'>
                    <div className='col-span-1'>
                        <div className="flex"><InputLabel htmlFor="categorie_id" >Catégories</InputLabel><span className="text-red-500">*</span></div>
                        <Select
                            id="categorie_id"
                            isClearable={true}
                            isSearchable={true}
                            defaultValue={setDefaultValue(data.categorie_id,(voiture && voiture.categorie.nom)?voiture.categorie.nom:'')}
                            onChange={(options) =>
                                !options ? setData('categorie_id', "") : setData('categorie_id', options.value)
                            }
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                            options={ConvertSelectData(categories)} />

                        <InputError message={errors.categorie_id} className="mt-2" />
                    </div>
                    <div className='col-span-1'>
                        <div className="flex"> <InputLabel htmlFor="marque_id" >Marques</InputLabel><span className="text-red-500">*</span></div>
                        <Select
                            id="marque_id"
                            ref={addToRefs}
                            defaultValue={setDefaultValue(data.marque_id,(voiture && voiture.marque)?voiture.marque.nom:'')}

                            isClearable={true}
                            isSearchable={true}
                            onChange={(options) =>
                                !options ? setData('marque_id', null) : setData('marque_id', options.value)
                            }
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                            options={ConvertSelectData(marques)} />
                        <InputError message={errors.marque_id} className="mt-2" />
                    </div>
                    <div className='col-span-1'>
                        <div className="flex"><InputLabel htmlFor="marque_id" >Type de carburant</InputLabel><span className="text-red-500">*</span></div>
                        
                        <Select
                            id="type_carburant_id"
                            defaultValue={setDefaultValue(data.type_carburant_id,(voiture && voiture.type_carburant)?voiture.type_carburant.nom:'')}

                            ref={addToRefs}
                            onChange={(options) =>
                                !options ? setData('type_carburant_id', "") : setData('type_carburant_id', options.value)
                            }
                            
                            isClearable={true}
                            isSearchable={true}
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                            options={ConvertSelectData(type_carburants)}
                        />
                        <InputError message={errors.type_carburant_id} className="mt-2" />
                    </div>

                </div>
                <div>
                        <InputLabel htmlFor="systeme_securite">Systèmes de sécurité à bord</InputLabel>
                       
                        <Select
                            id="systeme_securite"
                            ref={addToRefs}
                            isSearchable={true}
                            isMulti
                            onChange={handleMultiSelectChange}
                            className="my-react-select-container"
                            classNamePrefix="my-react-select"
                            defaultValue={setDefaultMultiValue((voiture && voiture.systeme_securites) ? voiture.systeme_securites:[])}
                            options={ConvertSelectData(sys_securites)} />
                        <InputError message={errors.systeme_securite} className="mt-2" />
                        <InputError message={errors["systeme_securite.0"]} className="mt-2" />
                        <InputError message={errors["systeme_securite.1"]} className="mt-2" />
                    </div>
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-4'>
                    <div>
                        <InputLabel htmlFor="couleur">Couleur</InputLabel>
                        <TextInput
                            id="couleur"
                            ref={addToRefs}
                            value={data.couleur}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-0 block w-full"
                            placeholder={t('Rouge')}

                        />

                        <InputError message={errors.couleur} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="annee_fabrication">Volume du coffre</InputLabel>
                        <TextInput
                            id="volume_coffre"
                            ref={addToRefs}
                            value={data.volume_coffre}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('15 Litres')}

                        />

                        <InputError message={errors.volume_coffre} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="nombre_portes">Nombre de portes</InputLabel>
                        <TextInput
                            id="nombre_portes"
                            ref={addToRefs}
                            value={data.nombre_portes}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('5')}

                        />

                        <InputError message={errors.nombre_portes} className="mt-2" />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-9 md:gap-4'>

                    <div className='col-span-3'>
                        <div className="flex"><InputLabel htmlFor="nombre_vitesse">Nombre de vitesses</InputLabel><span className="text-red-500">*</span></div>
                        <TextInput
                            id="nombre_vitesse"
                            ref={addToRefs}
                            value={data.nombre_vitesse}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-0 block w-full"
                            placeholder={t('4')}

                        />

                        <InputError message={errors.nombre_vitesse} className="mt-2" />
                    </div>
                    <div className='col-span-3'>
                        <div className="flex"><InputLabel htmlFor="nombre_vitesse">Immatriculation</InputLabel><span className="text-red-500">*</span></div>
                        <TextInput
                            id="immatriculation"
                            ref={addToRefs}
                            value={data.immatriculation}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-0 block w-full"
                            placeholder={t('JP 0025 RB')}

                        />

                        <InputError message={errors.immatriculation} className="mt-2" />
                    </div>
                    <div className='col-span-3'>
                        <InputLabel htmlFor="annee_fabrication">Puissance du moteur</InputLabel>
                        <TextInput
                            id="puissance_moteur"
                            ref={addToRefs}
                            value={data.puissance_moteur}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('50 CH')}

                        />

                        <InputError message={errors.puissance_moteur} className="mt-2" />
                    </div>
                    <div className='col-span-5'>
                    <InputLabel htmlFor="photo" >Photo</InputLabel>
                    <input
                        id="photo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                        ref={addToRefs}
                        onChange={handleFileChange}
                        type="file"
                        className="mt-1 bg-white border py-1.5 px-4 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "

                    />
                    {progress && (
                        <Progress value={progress.percentage} color="blue" max="100">
                            {progress.percentage}%
                        </Progress>
                    )}

                    <InputError message={errors.photo} className="mt-2" />
                </div>
                    <div className='col-span-4'>
                        <InputLabel htmlFor="type_transmission">Type de transmission</InputLabel>
                        <select
                            id="type_transmission"
                            ref={addToRefs}
                            value={data.type_transmission}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 rounded-md  bg-white shadow-none border border-slate-300 py-2 px-4 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                            placeholder={t('Manuelle, Automatique, Séquentielle')}

                        >
                            {types_transmission && types_transmission.map(({value, label},index)=>
                                 (
                                    <option value={value}>{value}</option>
                                )
                            )}

                        </select>

                        <InputError message={errors.type_transmission} className="mt-2" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-12 md:gap-4'>

                    <div className='col-span-3'>
                        <InputLabel htmlFor="consommation">Consommation (au 100km)</InputLabel>

                        <TextInput
                            id="consommation"
                            ref={addToRefs}
                            value={data.consommation}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('10L/100km')}

                        />

                        <InputError message={errors.consommation} className="mt-2" />
                    </div>
                    <div className='col-span-4'>
                        <InputLabel htmlFor="capacite_reservoir">Capacité du réservoir</InputLabel>
                        <TextInput
                            id="capacite_reservoir"
                            ref={addToRefs}
                            value={data.capacite_reservoir}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('160 Litres')}

                        />

                        <InputError message={errors.capacite_reservoir} className="mt-2" />
                    </div>
                    <div className='col-span-5'>
                        <InputLabel htmlFor="emission_co2">Emission du CO2</InputLabel>
                        <TextInput
                            id="emission_co2"
                            ref={addToRefs}
                            value={data.emission_co2}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('2,7 kg/Litre')}

                        />

                        <InputError message={errors.emission_co2} className="mt-2" />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-12 md:gap-4'>

                    <div className='col-span-4'>
                        <InputLabel htmlFor="type_eclairage">Type d'éclairage</InputLabel>

                        <TextInput
                            id="type_eclairage"
                            ref={addToRefs}
                            value={data.type_eclairage}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('Halogènes, LED, Xenon')}

                        />

                        <InputError message={errors.type_eclairage} className="mt-2" />
                    </div>
                    <div className='col-span-5'>
                        <InputLabel htmlFor="type_suspenssion">Type de suspenssion</InputLabel>
                        <TextInput
                            id="type_suspenssion"
                            ref={addToRefs}
                            value={data.type_suspenssion}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('Indépendante, Essieu rigide,...')}

                        />

                        <InputError message={errors.type_suspenssion} className="mt-2" />
                    </div>
                    <div className='col-span-3'>
                        <InputLabel htmlFor="dimenssions">Dimenssions</InputLabel>
                        <TextInput
                            id="dimenssions"
                            ref={addToRefs}
                            value={data.dimenssions}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('4,5m X 4,8 m')}

                        />

                        <InputError message={errors.dimenssions} className="mt-2" />
                    </div>
                    <div className='col-span-12'>
                        <InputLabel htmlFor="technologies_a_bord">Autres technologies à bord</InputLabel>
                        <TextArea
                            id="technologies_a_bord"
                            ref={addToRefs}
                            rows={3}
                            value={data.technologies_a_bord}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder={t('GPS, Caméra de récule,')}

                        />

                        <InputError message={errors.technologies_a_bord} className="mt-2" />
                    </div>
                </div>
                <div className=''>
                    <div>
                        <InputLabel htmlFor="description">Description de la voiture</InputLabel>
                        <div className="mb-28">
                            <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            className='h-[300px] border-0 bg-white' value={data.description} onChange={handleDescription} />
                        </div>
                        {/*<TextArea
                            id="description"
                            ref={addToRefs}
                            value={data.description}
                            onChange={handleInputChange}
                            rows="6"
                            className="mt-1 block w-full"

                        />*/}

                        <InputError message={errors.description} className="mt-2" />
                    </div>

                </div>

                <div>
                    <div className="flex items-center">
                        <input name="disponibilite"
                            checked={data.disponibilite}
                            onChange={(e) => setData('disponibilite', e.target.checked?1:0)}
                            type="checkbox" id="hs-basic-with-description" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
                                focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500
                                dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition 
                                before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"/>
                        <label htmlFor="hs-basic-with-description" className="text-sm text-gray-500 ms-3 dark:text-gray-300">Disponible</label>
                    </div>
                    <InputError message={errors.disponibilite} className="mt-2" />

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
    );
}

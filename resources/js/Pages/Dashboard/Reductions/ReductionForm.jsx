import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button, Progress, Tooltip } from '@material-tailwind/react';
import Select from 'react-select';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';
import { useTranslation } from 'react-i18next';
import { DateToFront } from '@/tools/utils';
import i18n from '@/i18n';

import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-tailwindcss-datepicker";
import { IoReload, IoReloadCircle } from 'react-icons/io5';

export default function ReductionForm({ className = '', location_reduction = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const { t } = useTranslation();
    const [date_debut, setDateDebut] = useState({
        startDate: null,
        endDate: null
    });
    const [date_fin, setDateFin] = useState({
        startDate: null,
        endDate: null
    });
    const types = [
        { value: 'Montant', label: t('Montant') },
        { value: 'Pourcentage', label: t('Pourcentage') },
    ];
    const [isP, setIsP] = useState(false);
    const [isM, setIsM] = useState(false)
    const [pourcentages, setPourcent] = useState([])
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}  
    useEffect(() => {
        const p = [];
        for (let i = 0; i <= 50; i++) {
            p.push({ value: i, label: i + '%' });
        }
        setPourcent(p);
        setDateDebut(setTheDate(location_reduction.date_debut_reduction ?? ''));//for Datepicker
        setDateFin(setTheDate(location_reduction.date_fin_reduction ?? ''));//for Datepicker
        if(location_reduction.type_reduction==='M'){
            setIsM(true);            
        }
        if(location_reduction.type_reduction==='P'){
            setIsP(true);
        }
    }, []);

    const setTheDate = (val) => {
        if (val === '') {
            val = new Date()
        }
        return { startDate: val, endDate: val };
    }
    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("photo", file[0]);
        }
    };
    const generateRandomCode = (nb) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        let n = parseInt(nb);
        for (let i = 0; i < n; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        for (let i = 0; i < 2; i++) {
            // Ajoutez deux chiffres aléatoires
            code += Math.floor(Math.random() * 10);
        }

        return code;
    }
    const setCode = () => {
        let code = generateRandomCode(3);
        setData('code_reduction', code);
    }

    const handleDateDebutChange = (newValue) => {
        const { startDate } = newValue;
        setDateDebut(newValue);
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setData("date_debut_reduction", frDate);
    }
    const handleDateFinChange = (newValue) => {
        const { startDate } = newValue;
        let frDate = DateToFront(startDate, i18n.language, 'd/m/Y');
        setDateFin(newValue);
        setData("date_fin_reduction", frDate);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };


    const setDefaultValueType = (id) => {
        let i,v;
        if(id==='Montant'){i=v='Montant';}
        if(id==='Pourcentage'){i=v='Pourcentage';}
        return { label: v, value: i }; 
    }
    const setDefaultValuePc = (id) => {        
        return { label: id+'%', value: id }; 
    }
    const handleTypeChange = (value) => {
        let m = data.montant, p = data.pourcentage;
        if (value === 'Montant') { setIsM(true); } else { setIsM(false); m = 0; }
        if (value === 'Pourcentage') { setIsP(true); } else { setIsP(false); p = 0; }
        setData(data => ({ ...data, 'pourcentage': p, 'montant': m, 'type_reduction': value }));

    }
    const handleSelectPc=(options)=>{
        let p,m;
         if(!options){
            p=0;m=0;
         }else{
            p= options.value;
            m=0;
         } 
         setData((datas)=>({...datas, 'pourcentage':p, 'montant': m }));
         //console.log(data)
                        
    }
    const ConvertSelectData = (tab) => {
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

    const { data, setData, post, progress, errors, processing, recentlySuccessful } = useForm(location_reduction !== null && action === 'update' ?
        {
            nom: location_reduction.nom ?? '',
            type_reduction: location_reduction.type_reduction=='M'?"Montant":(location_reduction.type_reduction=="P"?'Pourcentage':''),
            code_reduction: location_reduction.code_reduction ?? '',
            montant_min_reduction: location_reduction.montant_min_reduction ?? '',
            montant_max_reduction: location_reduction.montant_max_reduction ?? '',
            date_debut_reduction: DateToFront(location_reduction.date_debut_reduction, i18n.language, 'd/m/Y') ?? '',
            date_fin_reduction: DateToFront(location_reduction.date_fin_reduction, i18n.language, 'd/m/Y'),
            montant: location_reduction.montant ?? 0,
            pourcentage: location_reduction.pourcentage ?? 0,
            photo: '',
            date_etat: 'new',
            description: location_reduction.description ?? ''
        } : {
            nom: '',
            date_etat: '',
            type_reduction: '',
            code_reduction: '',
            montant_min_reduction: '',
            montant_max_reduction: '',
            date_debut_reduction: '',
            date_fin_reduction: '',
            montant: 0,
            pourcentage: 0,
            photo: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (location_reduction && action === 'update') {
            post(route('dashboard.location_reductions.update', location_reduction.id), data, {
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
            post(route('dashboard.location_reductions.store'), {
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
                    <InputLabel htmlFor="nom"  >Nom de la promotion</InputLabel>
                    <TextInput
                        required
                        id="nom"
                        ref={addToRefs}
                        value={data.nom}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t("Promotion des fêtes de fin d'année 2024")}

                    />
                    <InputError message={errors.nom} className="mt-2" />
                </div>
                <div className='md:grid md:grid-cols-2 md:gap-4'>
                    <div className='grid items-center grid-cols-12 '>
                        <div className='col-span-10'>
                            <InputLabel htmlFor="code_reduction"  >Code</InputLabel>

                            <TextInput
                                required
                                id="code_reduction"
                                ref={addToRefs}
                                value={data.code_reduction}
                                onChange={handleInputChange}
                                type="text"
                                className="mt-1 block pe-14 w-full"
                                placeholder={t('AMXG15')}

                            />
                        </div>
                        <div className='col-span-2 flex relative'>
                            <Tooltip content="Générer un nouveau code de réduction" className=''>
                                <button title='Générer un code' type='button' onClick={setCode} className='mt-7 -ms-10 border-0   bg-white items-center p-2'>
                                    <IoReload /></button>
                            </Tooltip>
                        </div>
                        <div className="col-span-12">
                            <InputError message={errors.code_reduction} className="mt-2 flex" />

                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="type_reduction"  >Type </InputLabel>
                        <Select
                            required
                            id="type_reduction"
                            isClearable={true}
                            isSearchable={true}
                            defaultValue={setDefaultValueType(data.type_reduction)}
                            onChange={(options) =>
                                !options ? handleTypeChange("") : handleTypeChange(options.value)
                            }
                            className="mt-1 block w-full"
                            options={types} />

                        <InputError message={errors.type_reduction} className="mt-2" />
                    </div>
                </div>
                <div className={"bg-gray-100 px-4 pt-2 pb-3 shadow-sm rounded-lg " + (isM ? '' : 'hidden')}>

                    <InputLabel htmlFor="montant">Saisir le montant à réduire</InputLabel>
                    <TextInput
                        id="montant"
                        ref={addToRefs}
                        value={data.montant}
                        onChange={handleInputChange}
                        type="number"
                        className="mt-1 block w-full"
                        placeholder={t('2500')}

                    />
                    <InputError message={errors.montant} className="mt-2" />
                </div>
                <div className={"bg-gray-100 px-4 pt-2 pb-3 shadow-sm rounded-lg " + (isP ? '' : 'hidden')}>

                    <InputLabel htmlFor="pourcentage">Saisir le pourcentage de la réduction</InputLabel>
                    <Select
                        id="pourcentage"
                        isClearable={true}
                        isSearchable={true}
                        defaultValue={setDefaultValuePc(data.pourcentage)}
                        onChange={(options) =>
                            !options ? handleSelectPc(null) : handleSelectPc(options)
                        }
                        className="mt-1 block w-full"
                        options={pourcentages}
                    />
                    <InputError message={errors.pourcentage} className="mt-2" />
                </div>
                <div className='grid md:grid-cols-2 md:gap-4'>

                    <div>
                        <InputLabel htmlFor="montant_min_reduction"  >Montant minimum</InputLabel>
                        <TextInput
                            required
                            id="montant_min_reduction"
                            ref={addToRefs}
                            value={data.montant_min_reduction}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                            placeholder={t('50000')}

                        />
                        <InputError message={errors.montant_min_reduction} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="montant_max_reduction"  >Montant maximum</InputLabel>
                        <TextInput
                            required
                            id="montant_max_reduction"
                            ref={addToRefs}
                            value={data.montant_max_reduction}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                            placeholder={t('1000000')}

                        />
                        <InputError message={errors.montant_max_reduction} className="mt-2" />
                    </div>
                </div>
                <div className='grid md:grid-cols-2 md:gap-4'>

                    <div>
                        <InputLabel htmlFor="date_debut_reduction"  >Date début de la réduction</InputLabel>
                        <Datepicker
                            required
                            id="date_debut_reduction"
                            asSingle={true}
                            useRange={false}
                            className={'rounded-none'}
                            value={date_debut}
                            onChange={handleDateDebutChange}
                            i18n={i18n.language}
                            displayFormat={"DD/MM/YYYY"}
                            placeholder={'03/01/' + (new Date().getFullYear())}
                        />
                        <InputError message={errors.date_debut_reduction} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="date_fin_reduction"  >Date fin de la réduction</InputLabel>
                        <Datepicker
                            required
                            id="date_fin_reduction"
                            asSingle={true}
                            useRange={false}
                            className={'rounded-none'}
                            value={date_fin}
                            onChange={handleDateFinChange}
                            i18n={i18n.language}
                            displayFormat={"DD/MM/YYYY"}
                            placeholder={'12/06/' + (new Date().getFullYear())}
                        />
                        <InputError message={errors.date_fin_reduction} className="mt-2" />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="photo" >Photo</InputLabel>
                    <input
                        id="photo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
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

                    <InputError message={errors.photo} className="mt-2" />
                </div>
                <div className=''>
                    <div>
                        <InputLabel htmlFor="nom">Description</InputLabel>

                        <TextArea
                            id="description"
                            ref={addToRefs}
                            value={data.description}
                            onChange={handleInputChange}
                            rows="5"
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
    );
}

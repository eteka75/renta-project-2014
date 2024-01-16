import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress } from '@material-tailwind/react';
import Select from 'react-select';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';
import { useTranslation } from 'react-i18next';
import { DateToFront } from '@/tools/utils';
import i18n from '@/i18n';

export default function ControleForm({ className = '', controle = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
  const { t } = useTranslation();
  const {voitures} = usePage().props

    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    
    const [countries, setCountries] = useState([]);
    useEffect(() => { setCountries(pays); }, []);

    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("fichier", file[0]);
        }
        console.log(data);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    }; 
    
    const setDefaultValue=(id, val)=>{
        if(id && val)
        {return { label: val, value: id };}
        return null;
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

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(controle !== null && action === 'update' ?
        {
            nom_controle: controle.nom_controle ?? '',
            voiture_id:controle.voiture_id?? '',
            date_controle: DateToFront(controle.date_controle,i18n.language,'d/m/Y') ?? '',
            kilometrage: controle.kilometrage ?? '',
            organisme_controle: controle.organisme_controle ?? '',
            fichier: '',
            description: controle.description ?? ''
        } : {
            nom_controle: '',
            voiture_id: '',
            date_controle: '',
            organisme_controle: '',
            kilometrage: '',
            fichier: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (controle && action === 'update') {
            post(route('dashboard.controle_techniques.update', controle.id), data, {
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
            post(route('dashboard.controle_techniques.store'), {
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
                    <InputLabel htmlFor="nom_controle"  >Nom</InputLabel>
                    <TextInput
                        id="nom_controle"
                        ref={addToRefs}
                        value={data.nom_controle}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"                        
                        placeholder={t('Contrôle technique de 2015')}

                    />

                    <InputError message={errors.nom_controle} className="mt-2" />
                </div>
            <div>
                    <InputLabel htmlFor="voiture_id"  >Voiture</InputLabel>
                    <Select
                            id="voiture_id"
                            isClearable={true}
                            isSearchable={true}
                            defaultValue={setDefaultValue(data.categorie_id,(controle && controle.voiture.nom)?controle.voiture.nom:'')}

                            onChange={(options) =>
                                !options ? setData('voiture_id', "") : setData('voiture_id', options.value)
                            }
                            className="mt-1 block w-full"
                            options={ConvertSelectData(voitures)} 
                            />

                    <InputError message={errors.voiture_id} className="mt-2" />
                </div>
                
                <div className='md:grid md:grid-cols-2 md:gap-4'>
                <div>
                    <InputLabel htmlFor="organisme_controle" >Organisme de decontrôle</InputLabel>
                    <TextInput
                        id="organisme_controle"
                        ref={addToRefs}
                        value={data.organisme_controle}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={("ANC")}

                    />
                    <InputError message={errors.organisme_controle} className="mt-2" />
                </div>
                <div>
                
                    <InputLabel htmlFor="fichier" >Fichier du contrôle technique</InputLabel>

                    <input
                        id="fichier"
                        ref={addToRefs}
                        onChange={handleFileChange}
                        type="file"
                        className="mt-1 rounded-md  bg-white shadow-none border border-slate-300 py-1.5 px-4 block w-full"

                    />
                    {progress && (
                        <Progress value={progress.percentage} color="blue" max="100">
                            {progress.percentage}%
                        </Progress>
                    )}

                    <InputError message={errors.fichier} className="mt-2" />
                </div>
                </div>
                <div className='grid md:grid-cols-5 md:gap-4'>
                    <div className='col-span-3'>
                        <InputLabel htmlFor="date_controle" >Date du contrôle</InputLabel>
                        <TextInput
                            id="date_controle"
                            ref={addToRefs}
                            value={data.date_controle}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 w-full block  "
                            placeholder={t('10/01/1990')}

                        />
                        <InputError message={errors.date_controle} className="mt-2" />
                    </div>
                    <div className='col-span-2'>
                        <InputLabel htmlFor="kilometrage" >Kilométrage</InputLabel>

                        <TextInput
                            id="kilometrage"
                            ref={addToRefs}
                            size='4'
                            value={data.kilometrage}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 w-full block  "
                            placeholder={t('100045')}

                        />

                        <InputError message={errors.kilometrage} className="mt-2" />
                    </div>

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
    );
}

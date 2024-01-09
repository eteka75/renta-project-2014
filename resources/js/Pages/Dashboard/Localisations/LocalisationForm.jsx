import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress, Switch } from '@material-tailwind/react';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';
import { useTranslation } from 'react-i18next';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/css/quill-editor.css';

export default function LocalisationForm({ className = '', option_vente = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const {t}=useTranslation();
    const [countries, setCountries] = useState([]);
    useEffect(() => { setCountries(pays); }, []);

    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("photo", file[0]);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const addToRefs = el => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(option_vente !== null && action === 'update' ?
        {
            nom: option_vente?.nom ?? '',
            ville: option_vente?.ville ?? '',
            commune: option_vente?.commune ?? '',
            departement: option_vente?.departement ?? '',
            adresse: option_vente?.adresse ?? '',
            photo: '',
            description: option_vente?.description ?? ''
        } : {
            nom: '',
            ville: '',
            commune: '',
            departement: '',
            adresse: '',
            photo: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.localisations.update', option_vente?.id), data, {
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
            post(route('dashboard.localisations.store'), {
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
                
            <div className='md:grid md:grid-cols-2 md:gap-4'>
            <div>
                    <InputLabel htmlFor="nom"  >Nom de la localisation</InputLabel>
                    <TextInput
                        id="nom"
                        ref={addToRefs}
                        value={data.nom}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t('Ouidah')}
                    />

                    <InputError message={errors.nom} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="ville"  >Ville</InputLabel>
                    <TextInput
                        id="ville"
                        ref={addToRefs}
                        value={data.ville}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t('Ouidah')}
                    />

                    <InputError message={errors.ville} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="commune"  >Commune</InputLabel>
                    <TextInput
                        id="commune"
                        ref={addToRefs}
                        value={data.commune}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t('Ouidah')}
                    />

                    <InputError message={errors.commune} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="departement"  >Département</InputLabel>
                    <TextInput
                        id="departement"
                        ref={addToRefs}
                        value={data.departement}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t('Atlantique')}
                    />

                    <InputError message={errors.departement} className="mt-2" />
                </div>

            </div>
                <div>
                    <InputLabel htmlFor="adresse"  >Lien de l'adresse sur Google Maps</InputLabel>
                    <TextArea
                        id="adresse"
                        ref={addToRefs}
                        value={data.adresse}
                        onChange={handleInputChange}
                        type="text"
                        rows='2'
                        className="mt-1 block w-full"
                        

                    />

                    <InputError message={errors.prix} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="photo" >Photo de la ville</InputLabel>

                    <input
                        id="photo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                        ref={addToRefs}
                        onChange={handleFileChange}
                        type="file"
                        className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

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
                            rows="6"
                            className="mt-1 block w-full"

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
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <Translate>Sauvegardé</Translate>
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

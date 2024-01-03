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

export default function OptionForm({ className = '', operation = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const { t } = useTranslation();
    const { voitures } = usePage().props

    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}  

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

    const setDefaultValue = (id, val) => {
        if (id && val) { return { label: val, value: id }; }
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

    const { data, setData, post, progress, errors, processing, recentlySuccessful } = useForm(operation !== null && action === 'update' ?
        {
            nom: operation.nom ?? '',
            tarif_option_heure: operation.tarif_option_heure ?? '',
            tarif_option_journalier: operation.tarif_option_journalier ?? '',
            tarif_option_hebdomadaire: operation.tarif_option_hebdomadaire ?? '',
            tarif_option_mensuel: operation.tarif_option_mensuel ?? '',
            photo: '',
            description: operation.description ?? ''
        } : {
            nom: '',
            tarif_option_heure: '',
            tarif_option_journalier: '',
            tarif_option_hebdomadaire: '',
            tarif_option_mensuel: '',
            photo: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();

        if (operation && action === 'update') {
            post(route('dashboard.location_options.update', operation.id), data, {
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
            post(route('dashboard.location_options.store'), {
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
                    <InputLabel htmlFor="nom"  >Nom de l'option</InputLabel>
                    <TextInput
                        required
                        id="nom"
                        ref={addToRefs}
                        value={data.nom}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={t('Location avec chauffeur, Location avec assurance, ...')}

                    />

                    <InputError message={errors.nom} className="mt-2" />
                </div>
                <div className='md:grid md:grid-cols-2 gap-4'>
                    <div>
                        <InputLabel htmlFor="tarif_option_heure"  >Tarif par heure</InputLabel>
                        <TextInput
                            id="tarif_option_heure"
                            ref={addToRefs}
                            value={data.tarif_option_heure}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                            placeholder={t('5000')}
                        />
                        <InputError message={errors.tarif_option_heure} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="tarif_option_journalier"  >Tarif par jour</InputLabel>
                        <TextInput
                            id="tarif_option_journalier"
                            ref={addToRefs}
                            value={data.tarif_option_journalier}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                            placeholder={t('20000')}

                        />
                        <InputError message={errors.tarif_option_journalier} className="mt-2" />
                    </div>
                </div>
                <div className='md:grid md:grid-cols-2 gap-4'>
                    <div>
                        <InputLabel htmlFor="tarif_option_hebdomadaire"  >Tarif par semaine (Hedomadaire)</InputLabel>
                        <TextInput
                            id="tarif_option_hebdomadaire"
                            ref={addToRefs}
                            value={data.tarif_option_hebdomadaire}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                            placeholder={t('100000')}

                        />
                        <InputError message={errors.tarif_option_hebdomadaire} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="tarif_option_mensuel"  >Tarif par mois</InputLabel>
                        <TextInput
                            id="tarif_option_mensuel"
                            ref={addToRefs}
                            value={data.tarif_option_mensuel}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 block w-full"
                            placeholder={t('300000')}

                        />
                        <InputError message={errors.tarif_option_mensuel} className="mt-2" />
                    </div>
                </div>
                
                
                <div>
                    <InputLabel htmlFor="photo" >photo sur la réparation</InputLabel>
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
                            rows="10"
                            className="mt-1 block w-full"
                            placeholder={t('Description')}
                            required
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

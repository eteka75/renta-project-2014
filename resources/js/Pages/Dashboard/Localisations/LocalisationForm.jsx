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

export default function LocalisationForm({ className = '', localisation = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const { t } = useTranslation();
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', { 'align': [] }],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],

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

    const handleDescription = (value) => {
        //setDescription(value);
        setData('description', value);
    }
    const addToRefs = el => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(localisation !== null && action === 'update' ?
        {
            nom: localisation?.nom ?? '',
            ville: localisation?.ville ?? '',
            commune: localisation?.commune ?? '',
            departement: localisation?.departement ?? '',
            adresse: localisation?.adresse ?? '',
            photo: '',
            description: localisation?.description ?? ''
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
            post(route('dashboard.localisations.update', localisation?.id), data, {
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
                            required
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
                            required
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
                        rows='6'
                        placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126886.21782446593!2d1.9987026035018358!3d6.368895217479654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102361980628a263%3A0xaec20944ccfbc4ee!2zT3VpZGFoLCBCw6luaW4!5e0!3m2!1sfr!2sfr!4v1704820227018!5m2!1sfr!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                        className="mt-1 block text-xs w-full"


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
                        <div className="mb-20">
                        <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            className='h-[600px] border-0 bg-white' value={data.description}
                            onChange={handleDescription}
                            placeholder="Ouidah est une ville du sud du Bénin, en Afrique de l'Ouest. Elle est connue pour son rôle ..."
                        />
                        </div>

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

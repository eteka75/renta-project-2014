import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress, Switch, Textarea } from '@material-tailwind/react';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';

export default function PointRetraitForm({ className = '', point_retrait = null, action, btntext = 'Enrégister' }) {
    // intialize as en empty array
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
    const addToRefs = el => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(point_retrait !== null && action === 'update' ?
        {
            lieu: point_retrait.lieu ?? '',
            ville: point_retrait.ville ?? '',
            contacts: point_retrait.contacts ?? '',
            quartier: point_retrait.quartier ?? '',
            adresse: point_retrait.adresse ?? '',
            map_local:point_retrait.map_local  ?? '',
            photo: '',
            description: point_retrait.description ?? ''
        } : {
            lieu: '',
            ville: '',
            contacts: '',
            quartier: '',
            adresse: '',
            map_local: '',
            photo: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.point_retraits.update', point_retrait.id), data, {
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
            post(route('dashboard.point_retraits.store'), {
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
                    <InputLabel htmlFor="lieu"  >Lieu de retrait</InputLabel>
                    <TextInput
                        id="lieu"
                        ref={addToRefs}
                        value={data.lieu}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.lieu} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="adresse"  >Adresse de retrait</InputLabel>
                    <TextInput
                        id="adresse"
                        ref={addToRefs}
                        value={data.adresse}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.adresse} className="mt-2" />
                </div>
                <div className='md:grid md:grid-cols-2 md:gap-4'>
                    <div>
                        <InputLabel htmlFor="ville">Ville</InputLabel>
                        <TextInput
                            id="ville"
                            ref={addToRefs}
                            value={data.ville}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.ville} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="quartier"  >Quartier</InputLabel>
                        <TextInput
                            id="quartier"
                            ref={addToRefs}
                            value={data.quartier}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.quartier} className="mt-2" />
                    </div>
                </div>
                <div>
                    <InputLabel htmlFor="contacts">Contacts à appeler</InputLabel>
                    <TextInput
                        id="contacts"
                        ref={addToRefs}
                        value={data.contacts}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.contacts} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="map_local">Lien de la localisation(sur Google Maps local)</InputLabel>
                    <TextArea
                        id="map_local"
                        ref={addToRefs}
                        value={data.map_local}
                        onChange={handleInputChange}
                        rows="2"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.map_local} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="photo" >Photo du lieu</InputLabel>

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
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            <Translate>Sauvegardé</Translate>
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

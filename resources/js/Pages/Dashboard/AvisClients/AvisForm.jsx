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

export default function AvisForm({ className = '', avis_client = null, pays = [], action, btntext = 'Enrégister' }) {
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

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(avis_client !== null && action === 'update' ?
        {
            auteur: avis_client.auteur ?? '',
            actif: avis_client.actif?1:0,
            profession: avis_client.profession??'',
            nombre_etoile: avis_client.nombre_etoile??'',
            photo: '',
            message: avis_client.message ?? ''
        } : {
            auteur: '',
            photo: '',
            profession: '',
            nombre_etoile: 0,
            actif: 0,
            message: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.avis_clients.update', avis_client.id), data, {
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
            post(route('dashboard.avis_clients.store'), {
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
                    <InputLabel htmlFor="auteur"  >Nom et prénom de l'auteur</InputLabel>
                    <TextInput
                    required
                        id="auteur"
                        ref={addToRefs}
                        value={data.auteur}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.auteur} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="profession"  >Poste/Profession</InputLabel>
                    <TextInput
                        id="profession"
                        ref={addToRefs}
                        value={data.profession}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.profession} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="nombre_etoile"  >Nombre d'étoiles</InputLabel>
                    <select
                        id="nombre_etoile"
                        ref={addToRefs}
                        value={data.nombre_etoile}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 border-gray-300 rounded-md block w-full"
                    >
                        <option value={0}> Selectionnez</option>
                        {[1,2,3,4,5].map((v,i)=>(
                            <option key={i} value={v}>{v} étoile{v>1?'s':''}</option>
                        ))}
                        </select>

                    <InputError message={errors.nombre_etoile} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="photo" >Photo</InputLabel>

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
                        <InputLabel htmlFor="message">Message</InputLabel>

                        <TextArea
                            id="message"
                            ref={addToRefs}
                            value={data.message}
                            onChange={handleInputChange}
                            rows="6"
                            className="mt-1 block w-full"

                        />

                        <InputError message={errors.message} className="mt-2" />
                    </div>

                </div>
                <div>
                    <div className="flex items-center">
                        <input name="disponibilite"
                            checked={data.actif}
                            onChange={(e) => setData('actif', e.target.checked?1:0)}
                            type="checkbox" id="hs-basic-with-description" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
                                focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500
                                dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition 
                                before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"/>
                        <label htmlFor="hs-basic-with-description" className="text-sm text-gray-500 ms-3 dark:text-gray-300">Actif</label>
                    </div>
                    <InputError message={errors.actif} className="mt-2" />

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

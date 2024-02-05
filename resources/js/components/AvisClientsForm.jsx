import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress, Switch } from '@material-tailwind/react';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';
import { IoMdSend } from 'react-icons/io';

export default function AvisClientsForm({ className = '', avis_client = null, pays = [], action, btntext = 'Envoyer mon avis',onClose =()=>{}}) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const {auth}=usePage().props;

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

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(
        {
            auteur: auth?.user?auth?.user?.prenom +" "+ auth?.user?.nom:'',
            photo: '',
            profession: '',
            nombre_etoile: 0,
            actif: 0,
            message: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
       
            post(route('front.avis.send'), {
                onSuccess: () => {
                    // Handle success, e.g., redirect
                    //alert('Ok')
                    onClose();

                },
                onError: (errors) => {
                    console.err(errors);
                },
            });
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
                        className="mt-1  rounded-md block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                    >
                        <option value={0}> Selectionnez</option>
                        {[1,2,3,4,5].map((v,i)=>(
                            <option key={i} value={v}>{v} étoile{v>1?'s':''}</option>
                        ))}
                        </select>

                    <InputError message={errors.nombre_etoile} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="photo" >Photo (facultatif)</InputLabel>

                    <input
                        id="photo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                        ref={addToRefs}
                        onChange={handleFileChange}
                        type="file"
                        className="mt-1  bg-white border py-1.5 px-4 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"

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
                        <InputLabel htmlFor="message">Message (min:20 caractères)</InputLabel>

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
                <div className="flex items-center gap-4">
                    {progress > 0 && <div>{`Upload Progress: ${progress}%`}</div>}
                    <PrimaryButton
                        className='bg-blue-600 hover:bg-blue-800 flex gap-2 dark:bg-yellow-500 dark:text-black text-white'
                        disabled={processing}>
                       <Translate>{btntext}</Translate> <IoMdSend/>
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
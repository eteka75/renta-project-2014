import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Collapse, Progress, Switch } from '@material-tailwind/react';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';

export default function ClientForm({ className = '', user = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const roles = [
        { id:'CL',nom: "Client" },
        {id: 'ADMIN',nom: "Administrateur" },
      ]
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

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(user !== null && action === 'update' ?
        {
            nom: user?.nom ?? '',
            prenom: user?.prenom ?? '',
            email: user?.email ?? '',
            telephone: user?.telephone ?? '',
            photo: '',
            role: user?.role ?? '',
            password: null,
            password_confirmation: null,
        } : {
            nom: '',
            prenom: '',
            email: '',
            photo: '',
            description: '',
            password: null,
            password_confirmation: null,
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.clients.update', user?.id), data, {
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
            post(route('dashboard.categories.store'), {
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
    const [open, setOpen] = useState(false);
 
    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <section className={className}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="nom"  >Nom</InputLabel>
                        <TextInput
                            id="nom"
                            ref={addToRefs}
                            value={data.nom}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.nom} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="prenom"  >Prénom</InputLabel>
                        <TextInput
                            id="prenom"
                            ref={addToRefs}
                            value={data.prenom}
                            onChange={handleInputChange}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.prenom} className="mt-2" />
                    </div>
                    </div>
                <div>
                    <InputLabel htmlFor="email"  >Email</InputLabel>
                    <TextInput
                        id="email"
                        ref={addToRefs}
                        value={data.email}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="role"  >Rôle</InputLabel>
                   
                    <select
                              id="role" value={data.role}
                    required

                    onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                        <option >Sélectionnez</option>
                        {roles && roles.length > 0 && roles.map(({ id,nom }, index) =>
                        <option

                            key={index} value={id} >{nom}</option>
                        )}
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="telephone"  >Téléphone</InputLabel>
                    <TextInput
                        id="telephone"
                        ref={addToRefs}
                        value={data.telephone}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.telephone} className="mt-2" />
                </div>
                <div onClick={toggleOpen} className='text-xs'>Modifier le mot de passe</div>
                <Collapse open={open} className=''>
                <div className="grid grid-cols-2 gap-4 bg-red-50 border border-red-200 rounded-md p-4">

                <div className="">
                            <InputLabel  htmlFor="password" value="Mot de passe" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        {console.log(errors)}
                        <div className="">
                            <InputLabel  htmlFor="password_confirmation" value="Confirmation du mot de passe"  />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>
                </Collapse>
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

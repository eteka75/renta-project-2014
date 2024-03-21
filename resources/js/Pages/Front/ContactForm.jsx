import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress, Switch } from '@material-tailwind/react';
import TextArea from '@/components/TextArea';

export default function ConrtactForm({ className = '', objet = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const {auth}=usePage().props;
    const [countries, setCountries] = useState([]);
    useEffect(() => { setCountries(pays); }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const addToRefs = el => {
        /*if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }*/
    };

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(
        
        {
            nom_prenom: (auth?.user)?(auth.user?.nom+" "+auth?.user?.prenom) :'',
            telephone:(auth?.user)?(auth.user?.telephone): '',
            email:(auth?.user)?(auth.user?.email) :'',
            objet: objet,
            message: ''
        } );
    const handleSubmit = (e) => {
        e.preventDefault();
       
        //if (action === 'save') {
            post(route('front.contact.send'), {
                onSuccess: () => {
                    // Handle success, e.g., redirect
                   // alert('Okkkkk')
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        //}
    };


    return (
        <section className={className}>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="nom_prenom" value="Nom et prénom" />

                    <TextInput
                        id="nom_prenom"
                        ref={addToRefs}
                        value={data.nom_prenom}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 bg-slate-50 py-4 block w-full"
                    />

                    <InputError message={errors.nom_prenom} className="mt-2" />
                </div>
               
                
                <div className='grid md:grid-cols-2 gap-4'>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        ref={addToRefs}
                        value={data.email}
                        onChange={handleInputChange}
                        type="email"
                        className="mt-1 bg-slate-50 py-4 block w-full"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className='mt-4md:mt-0'>
                    <InputLabel htmlFor="telephone" value="Téléphone" />

                    <TextInput
                        id="telephone"
                        ref={addToRefs}
                        value={data.telephone}
                        onChange={handleInputChange}
                        type="tel"
                        className="mt-1 bg-slate-50 py-4 block w-full"
                    />

                    <InputError message={errors.telephone} className="mt-2" />
                </div>

                </div>
                <div>
                    <InputLabel htmlFor="objet" value="Objet du message" />

                    <TextInput
                        id="objet"
                        ref={addToRefs}
                        value={data.objet}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 bg-slate-50 py-4 block w-full"
                    />

                    <InputError message={errors.objet} className="mt-2" />
                </div>
                
                <div className=''>
                    <div>
                        <InputLabel htmlFor="nom" value="Message" />

                        <TextArea
                            id="message"
                            ref={addToRefs}
                            value={data.message}
                            onChange={handleInputChange}
                            rows="5"
                            className="mt-1 bg-slate-50 block w-full"

                        />

                        <InputError message={errors.message} className="mt-2" />
                    </div>

                </div>


                <div className="flex items-center gap-4">
                    {progress > 0 && <div>{`Upload Progress: ${progress}%`}</div>}
                    <PrimaryButton
                        className='bg-blue-600 disabled:opacity-50 py-4 hover:bg-blue-800 text-white'
                        disabled={processing}>
                       Envoyer mon message
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-200">Enrégistré.</p>
                    </Transition>
                    {recentlySuccessful}
                </div>
            </form>
        </section>
    );
}

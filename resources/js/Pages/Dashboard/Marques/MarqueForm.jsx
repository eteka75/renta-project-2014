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

export default function MarqueForm({ className = '', marque = null, pays = [], action, btntext = 'Enrégister' }) {
    // intialize as en empty array
  const { t } = useTranslation();

    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const [countries, setCountries] = useState([]);
    useEffect(() => { setCountries(pays); }, []);

    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("logo", file[0]);
        }
        console.log(data);
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

    const { data, setData, post, put, progress, errors, processing, recentlySuccessful } = useForm(marque !== null && action === 'update' ?
        {
            nom: marque.nom ?? '',
            logo: '',
            pays_id: marque.pays_id ?? '',
            annee_fondation: marque.annee_fondation ?? '1990',
            site_web: marque.site_web ?? '',
            description: marque.description ?? ''
        } : {
            nom: '',
            logo: '',
            pays_id: '',
            annee_fondation: '1990',
            site_web: '',
            description: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.marques.update', marque.id), data, {
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
            post(route('dashboard.marques.store'), {
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
                    <InputLabel htmlFor="nom"  >Nom</InputLabel>
                    <TextInput
                        id="nom"
                        ref={addToRefs}
                        value={data.nom}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"                        
                        placeholder={t('Toyota')}

                    />

                    <InputError message={errors.nom} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="logo" >Logo</InputLabel>
                    <input
                        id="logo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                        ref={addToRefs}
                        onChange={handleFileChange}
                        type="file"
                        className="mt-1 bg-white  border py-1.5 px-4 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "

                    />
                    {progress && (
                        <Progress value={progress.percentage} color="blue" max="100">
                            {progress.percentage}%
                        </Progress>
                    )}

                    <InputError message={errors.logo} className="mt-2" />
                </div>
                <div className='grid md:grid-cols-5 md:gap-4'>
                    <div className='col-span-3'>
                        <InputLabel htmlFor="pays_id" value="Pays">Pays</InputLabel>
                        <select
                            id="pays_id" value={data.pays_id}
                            ref={addToRefs}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                            <option value=''>Sélectionnez un pays</option>
                            {countries && countries.length > 0 && countries.map(({ id, nom_fr_fr }, index) =>
                                <option

                                    key={index} value={id} >{nom_fr_fr}</option>
                            )}
                        </select>


                        <InputError message={errors.pays_id} className="mt-2" />
                    </div>
                    <div className='col-span-2'>
                        <InputLabel htmlFor="annee_fondation" >Année de fondation</InputLabel>

                        <TextInput
                            id="annee_fondation"
                            ref={addToRefs}
                            size='4'
                            value={data.annee_fondation}
                            onChange={handleInputChange}
                            type="number"
                            className="mt-1 w-full block  "
                            placeholder={t('1990')}

                        />

                        <InputError message={errors.annee_fondation} className="mt-2" />
                    </div>

                </div>
                <div>
                    <InputLabel htmlFor="site_web" >Site Web</InputLabel>
                    <TextInput
                        id="site_web"
                        ref={addToRefs}
                        value={data.site_web}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                        placeholder={("http://website.com")}

                    />

                    <InputError message={errors.site_web} className="mt-2" />
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

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Avatar, Progress } from '@material-tailwind/react';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors,progress , processing, recentlySuccessful } = useForm({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        photo: '',
    });
    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("photo", file[0]);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informations</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Mettre à jour les informations de votre profil
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="md:grid md:grid-cols-12 gap-4">
                {user?.photo!==null && user?.photo!=='' && 
                <div className="md:col-span-3">
                    <Avatar src={HTTP_FRONTEND_HOME+''+user?.photo} alt={user?.nom} className='border-4  hover:shadow-lg' size="xxl" />
                </div>
                }
               
            <div className={user?.photo!==null && user?.photo!=='' ?'md:col-span-9':'md:col-span-12'}>
            
    
                    <InputLabel htmlFor="photo" >Photo de profil</InputLabel>

                    <input
                        id="photo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                        //ref={addToRefs}
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
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    
                <div>
                    <InputLabel  htmlFor="nom" value="Nom" />

                    <TextInput
                        id="nom"
                        className="mt-1 block w-full"
                        value={data.nom}
                        onChange={(e) => setData('nom', e.target.value)}
                        required
                        isFocused
                        autoComplete="nom"
                    />

                    <InputError className="mt-2" message={errors.nom} />
                </div>
                <div>
                    <InputLabel  htmlFor="prenom" value="Prénom(s)" />

                    <TextInput
                        id="prenom"
                        className="mt-1 block w-full"
                        value={data.prenom}
                        onChange={(e) => setData('prenom', e.target.value)}
                        required
                        isFocused
                        autoComplete="prenom"
                    />

                    <InputError className="mt-2" message={errors.prenom} />
                </div>
                </div>

                <div>
                    <InputLabel  htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel  htmlFor="email" value="Téléphone" />

                    <TextInput
                        id="telephone"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.telephone}
                        onChange={(e) => setData('telephone', e.target.value)}
                        autoComplete="telephone"
                    />

                    <InputError className="mt-2" message={errors.telephone} />
                </div>
                

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                        Votre adresse e-mail n'est pas vérifiée.
                            <Link
                                href={route('verification.send')}
                                
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Cliquez ici pour renvoyer l'e-mail de vérification.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                Un nouveau lien de vérification a été envoyé à votre adresse e-mail.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton className='bg-gray-800 hover:bg-gray-900 hover:shadow text-yellow-500' disabled={processing}>Enrégistrer</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enrégistré.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

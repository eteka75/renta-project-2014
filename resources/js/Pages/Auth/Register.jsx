import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FcShipped } from 'react-icons/fc';
import Logo from "../../assets/images/logo-v0-min.png";
import { GiKeyCard, GiMoneyStack } from "react-icons/gi";
import MiniFixedFooter from '@/components/MiniFixedFooter';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

export default function Register() {
    const [showPwd,setShowPwd]=useState(false);
    const [showCPwd,setShowCPwd]=useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);
    const handleInputPwd=()=>{
        setShowPwd(!showPwd);
    }
    const handleInputCPwd=()=>{
        setShowCPwd(!showCPwd);
    }
    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Création de compte" />
            <div className="md:grid md:grid-cols-2 min-h-screen mb-0">
                <div className="hidden shadow-xl md:flex border-0   overflow-hidden  bg-[url('@/assets/images/design/bg-4.jpeg')] bg-cover bg-no-repeat bg-[left_calc(50%)_top_calc(25%)]">
                    <div className="bg-[rgba(0,0,0,.5)] bg-gradient-to-t from-[rgba(0,0,0,.95)]   h-full w-full">
                        <div className='mx-auto md:my-[20vh] my-10 px-4 '>
                            <h2 className=" sm:max-w-md lg:max-w-lg mx-auto py-4 font-serif text-2xl text-white">
                                En vous inscrivant,
                            </h2>

                            <div className='sm:max-w-md lg:max-w-lg mb-6 rounded-lg shadow-sm dark:bg-slate-800 bg-[rgba(255,255,255,.8)] mx-auto  px-8 py-4 '>
                                <div className="grid grid-flow-col items-center md:gap-4">
                                    <div className='text-center '>
                                        <GiKeyCard className='text-6xl text-slate-600 dark:text-blue-300' />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-extrabold">
                                            Vous louez la voiture qui vous convient
                                        </h2>
                                        <div className="text-sm text-light dark:text-slate-400 text-slate-600">
                                            Découvrez le plaisir de la liberté avec notre flotte de voitures modernes et bien entretenus. Louez chez nous et parcourez la route en toute élégance et confort.
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='sm:max-w-md lg:max-w-lg mb-6 rounded-lg shadow-sm dark:bg-slate-800 bg-[rgba(255,255,255,.8)] mx-auto  px-8 py-4'>

                                <div className="grid grid-flow-col items-center md:gap-4">
                                    <div className='text-center '>
                                        <GiMoneyStack className='text-6xl text-yellow-700' />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-extrabold">
                                            Vous maitrisez votre budget
                                        </h2>
                                        <div className="text-sm text-light dark:text-slate-400 text-slate-600">
                                            Explorez sans compromis votre destination préférée tout en préservant votre budget. Nos locations de voitures abordables vous offrent la liberté de voyager sans vous soucier de votre porte-monnaie.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='sm:max-w-md lg:max-w-lg mb-6 rounded-lg shadow-sm dark:bg-slate-800 bg-[rgba(255,255,255,.8)] mx-auto  px-8 py-4'>
                                <div className="grid grid-flow-col items-center md:gap-4">
                                    <div className='text-center '>
                                        <FcShipped className='text-6xl ' />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-extrabold">
                                            Vous achetez ici, la voiture de vos rêves
                                        </h2>
                                        <div className="text-sm text-light dark:text-slate-400 text-slate-600">
                                            Réalisez vos rêves automobiles sans casser la tirelire !
                                            <p>
                                                Nos voitures à prix imbattables allient qualité et économie, offrant une conduite exceptionnelle sans sacrifier votre budget.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='sm:max-w-md px-4 md:px-8 py-10 md:py-[20vh]'>
                    <Link
                        href={"/"}
                        className="flex items-center  justify-center md:justify-start mb-14 space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={Logo}
                            className="h-10"
                            alt="Logo CRS Bénin"
                        />
                        <span className="self-center  sm:flex md:text-xl uppercase_ font-semibold whitespace-nowrap dark:text-white">
                            Rental Car Services
                        </span>
                    </Link>
                    <form onSubmit={submit} className='dark:text-gray-100'>
                        <h1 className='text-3xl justify-center md:justify-start dark:text-slate-100  mb-4 font-bold flex'>
                            <AiOutlineUserAdd className='me-1 hidden md:flex' />
                            Création de compte </h1>
                        <div className=" xl:grid xl:grid-cols-2 gap-4">
                            <div >
                                <InputLabel htmlFor="nom" value="Nom" />
                                <TextInput
                                    disabled={processing}
                                    id="nom"
                                    name="nom"
                                    value={data.nom}
                                    className="mt-1 block w-full"
                                    autoComplete="nom"
                                    isFocused={true}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    required
                                />
                                <InputError message={errors.nom} className="mt-2" />
                            </div>
                            <div className="mt-4 xl:mt-0">
                                <InputLabel htmlFor="prenom" value="Prénom(s)" />
                                <TextInput
                                    disabled={processing}
                                    id="prenom"
                                    name="prenom"
                                    value={data.prenom}
                                    className="mt-1 block w-full"
                                    autoComplete="prenom"
                                    onChange={(e) => setData('prenom', e.target.value)}
                                    required
                                />
                                <InputError message={errors.prenom} className="mt-2" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                disabled={processing}
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Mot de passe" />
                            <div className="flex items-center">
                                <TextInput
                                    disabled={processing}
                                    id="password"
                                    type={showPwd?'text':"password"}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                { showPwd ? <FaRegEyeSlash onClick={handleInputPwd} className='-ms-8 cursor-pointer'/>
                                    :<FaRegEye onClick={handleInputPwd} className='-ms-8 cursor-pointer'/>}
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirmation du mot de passe" />
                            <div className="flex items-center">

                                <TextInput
                                    disabled={processing}
                                    id="password_confirmation"
                                    type={showCPwd?'text':"password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required

                                />
                             { showCPwd ? <FaRegEyeSlash onClick={handleInputCPwd} className='-ms-8 cursor-pointer'/>
                                    :<FaRegEye onClick={handleInputCPwd} className='-ms-8 cursor-pointer'/>}
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-start mt-4">
                            <PrimaryButton className=" bg-blue-600" disabled={processing}>
                                Créer mon compte
                            </PrimaryButton>
                        </div>
                        <div className='my-4 justify-center md:justify-start flex'>

                            ou
                            <Link
                                href={route('login')}
                                className="underline mx-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Connectez-vous !
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
            <MiniFixedFooter />
        </GuestLayout>
    );
}

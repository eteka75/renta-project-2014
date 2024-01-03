import Logo from "../../assets/images/logo-v0-min.png";
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody } from '@material-tailwind/react';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function ForgotPassword({ status }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t("Mot de passe oublié")} />

            <div className="max-w-screen-xl mx-auto p-4">
                <div className="max-w-screen-sm mx-auto py-[10vh]">
                    <div className="items-center justify-center">
                <Link
                        href={"/"}
                        className="flex justify-center items-center  mb-14 space-x-3 rtl:space-x-reverse"
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
                    </div>
                    <Link href='#' onClick={()=>window.history.back()} >
                        <Button  variant='text' className='flex gap-1 items-center py-2 px-2 mb-2'><IoMdArrowRoundBack className='text-xl'/> {t('Retour')}</Button>
                    </Link>
                    <Card className='border shadow-sm'>
                        <CardBody>
                            <h3 className='text-2xl font-bold'>{t("Mot de passe oublié")}</h3>
                            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                {t("Mot de passe oublié? Aucun problème. Indiquez-nous simplement votre adresse e-mail et nous vous enverrons par e-mail un lien de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.")}
                            </div>

                            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

                            <form onSubmit={submit}>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />

                                <div className="flex items-center justify-end mt-4">
                                    <Button color='blue' className="ms-4" disabled={processing}>
                                        {t('Envoyer le lien de réinitialisation')}
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}

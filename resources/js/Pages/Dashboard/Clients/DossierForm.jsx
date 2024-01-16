import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToDbFormat, DateToFront, formaterMontant, getYearFromStringDate } from '@/tools/utils';
import { useForm, usePage } from '@inertiajs/react';
import { Card, CardBody } from '@material-tailwind/react';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Datepicker from "react-tailwindcss-datepicker";
export default function DossierForm({  }) {
    const user = usePage().props.auth.user;
    const { auth, countries,client } = usePage().props
    const [date_naissance, setDateNais] = useState({
        startDate: null,
        endDate: null
    })
    const [date_expiration_permis, setDateExp] = useState({
        startDate: null,
        endDate: null
    })
    const page = usePage().props;
    const list_sexes = [
        { 'id': 'M', 'nom': "Masculin" },
        { 'id': 'F', 'nom': "Féminin" },
    ]
    const types_pieces = [
        { 'nom': "Carte d'itentité" },
        { 'nom': "Passport" },
        { 'nom': "Carte d'électeur" },
    ]
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: (client != null) ? (client?.nom) : '',
        prenom: (client != null) ? (client?.prenom) : '',
        sexe: (client != null) ? (client?.sexe) : '',
        date_naissance:client?.date_naissance!=null? DateToFront(client?.date_naissance,i18n.language,'d/m/Y'):'',
        lieu_naissance: client?.lieu_naissance!=null?client?.lieu_naissance :'',
        pays_id: client?.pays_id?client?.pays_id:'',
        type_piece_identite: client?.type_piece_identite?client?.type_piece_identite:'',
        numero_piece_identite: client?.numero_piece_identite?client?.numero_piece_identite:'',
        numero_permis: client?.numero_permis?client?.numero_permis:'',
        date_expiration_permis: client?.date_expiration_permis!=null? DateToFront(client?.date_expiration_permis,i18n.language,'d/m/Y'):'',
        nb_annee_conduite: client?.nb_annee_conduite?client?.nb_annee_conduite:'',
        adresse_residence: client?.adresse?client?.adresse:'',
        ville_residence: client?.ville_residence?client?.ville_residence:'',
        fichier_identite: null,
        fichier_permis: null,
        fichier_residence: null,
        // _token: this.$page.props.csrf_token,
    });

    useEffect(()=>{
        if(client?.date_naissance!=null){
            let dateFNais=DateToDbFormat(client?.date_naissance);
            setDateNais({startDate:dateFNais,endDate:dateFNais});
        }
        if(client?.date_expiration_permis!=null){
            let dateFper=DateToDbFormat(client?.date_expiration_permis);
            setDateExp({startDate:dateFper,endDate:dateFper});
        }
    },[])
    const handleDateNaisChange = (newValue) => {
        if (newValue) {
            const { startDate } = newValue;
            setDateNais(newValue);
            let year = getYearFromStringDate(startDate);
            if (startDate != '' && startDate != null && year != '1970') {
                let frDate = DateToFront(startDate, 'fr', 'd/m/Y');
                setData("date_naissance", frDate);
            } else {
                setDateNais({
                    startDate: null,
                    endDate: null
                });

                setData("date_naissance", '');
            }
        }
    }

    const handleDateExpChange = (newValue) => {
        if (newValue) {
            const { startDate } = newValue;
            let year = getYearFromStringDate(startDate);

            if (startDate != '' && startDate != null && year != '1970') {
                setDateExp(newValue);
                let frDate = DateToFront(startDate, 'fr', 'd/m/Y');
                setData("date_expiration_permis", frDate);
            } else {
                setDateExp({
                    startDate: null,
                    endDate: null
                });
                setData("date_expiration_permis", '');
            }
        }
    }
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };



    const [activeStep, setActiveStep] = useState(0);


    const handleFileChange = (e) => {
        let file = e.target.files;
        const { id } = e.target;
        if (file !== undefined && file[0]) {
            setData(id, file[0]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('dashboard.dossier.update',{id:client?.id}));
    };
    const className = '';
    return (
        <section className={className}>
            {console.log(errors)}
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informations</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Mettre à jour les informations de votre profil
                </p>
            </header>


            <form onSubmit={submit}>
                <div className="max-w-xl ">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="mt-2">

<span className='flex'>

    <InputLabel htmlFor="type_piece_identite" value="Sexe" />
    <span className="text-red-500">*</span></span>

<select
    id="sexe" value={data.sexe}
    required
    onChange={handleInputChange}
    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
    <option value={''}>Sélectionnez</option>
    {list_sexes && list_sexes.length > 0 && list_sexes.map(({ id, nom }, index) =>
        <option

            key={index} value={id} >{nom}</option>
    )}
</select>
<InputError message={errors.sexe} className="mt-2" />
</div>
                        </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="py-2">
                            <span className='flex'>
                                <InputLabel htmlFor="nom" value="Nom " />
                                <span className="text-red-500">*</span></span>

                            <TextInput
                                id="nom"
                                required
                                type="text"
                                name="nom"
                                value={data.nom}
                                className="mt-1 block w-full"
                                autoComplete="nom_complet"
                                isFocused={true}
                                onChange={(e) => setData('nom', e.target.value)}
                            />
                            <InputError message={errors.nom} className="mt-2" />
                        </div>
                        <div className="py-2">
                            <span className='flex'>
                                <InputLabel htmlFor="prenom" value="Prénom(s) " />
                                <span className="text-red-500">*</span></span>

                            <TextInput
                                id="prenom"
                                required
                                type="text"
                                name="prenom"
                                value={data.prenom}
                                className="mt-1 block w-full"
                                autoComplete="prenom"
                                isFocused={true}
                                onChange={(e) => setData('prenom', e.target.value)}
                            />
                            <InputError message={errors.prenom} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mt-2">
                            <span className='flex'>
                                <InputLabel htmlFor="date_naissance" value="Date de naissance" />
                                <span className="text-red-500">*</span></span>
                            <Datepicker
                                required
                                id="date_naissance"
                                asSingle={true}
                                useRange={false}
                                inputClassName="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                value={date_naissance}
                                maxDate={new Date()}
                                onChange={handleDateNaisChange}
                                i18n={i18n.language}
                                displayFormat={"DD/MM/YYYY"}
                                placeholder={"dd/mm/yyyy"}
                            />
                            <InputError message={errors.date_naissance} className="mt-2" />
                        </div>
                        <div className="mt-2">
                            <span className='flex'>
                                <InputLabel htmlFor="lieu_naissance" value="Lieu de naissance" />
                                <span className="text-red-500">*</span></span>

                            <TextInput
                                required
                                id="lieu_naissance"
                                type="text"
                                name="lieu_naissance"
                                value={data.lieu_naissance}
                                className="mt-1 block w-full"
                                autoComplete="lieu_naissance"

                                onChange={(e) => setData('lieu_naissance', e.target.value)}
                            />
                            <InputError message={errors.lieu_naissance} className="mt-2" />
                        </div>
                    </div>

                        
                        <div className="mt-2">
                            <span className='flex'>
                                <InputLabel htmlFor="pays_id" value="Pays d'origine/Nationalité" />
                                <span className="text-red-500">*</span></span>
                            <select
                                required
                                id="pays_id" value={data.pays_id}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                <option value=''>Sélectionnez un pays</option>
                                {countries && countries.length > 0 && countries.map(({ id, nom_fr_fr }, index) =>
                                    <option

                                        key={index} value={id} >{nom_fr_fr}</option>
                                )}
                            </select>
                            <InputError message={errors.nationalite} className="mt-2" />
                        </div>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="mt-2">
                            <span className='flex'>

                                <InputLabel htmlFor="type_piece_identite" value="Type de pièces d'identité" />
                                <span className="text-red-500">*</span></span>

                            <select
                                id="type_piece_identite" value={data.type_piece_identite}
                                required

                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                <option value={''}>Sélectionnez</option>
                                {types_pieces && types_pieces.length > 0 && types_pieces.map(({ nom }, index) =>
                                    <option

                                        key={index} value={nom} >{nom}</option>
                                )}
                            </select>
                            <InputError message={errors.type_piece_identite} className="mt-2" />
                        </div>
                        <div className="mt-2">
                            <span className='flex'>
                                <InputLabel htmlFor="numero_piece_identite" value="Numéro de la pièce d'identité" />
                                <span className="text-red-500">*</span></span>

                            <TextInput
                                id="numero_piece_identite"
                                required
                                type="text"
                                name="numero_piece_identite"
                                value={data.numero_piece_identite}
                                className="mt-1 block w-full"

                                onChange={(e) => setData('numero_piece_identite', e.target.value)}
                            />
                            <InputError message={errors.numero_piece_identite} className="mt-2" />
                        </div>

                    </div>
                    <div className="py-2">
                        <span className='flex'>
                            <InputLabel htmlFor="fichier_identite" value="Fichier de la pièce d'identité" />
                            </span>

                        <input
                            id="fichier_identite"
                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

                        />
                        <InputError message={errors.fichier_identite} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="numero_permis" value="Numéro du permis" />

                        <TextInput
                            id="numero_permis"
                            type="text"
                            name="numero_permis"
                            value={data.numero_permis}
                            className="mt-1 block w-full"
                            autoComplete="numero_permis"

                            onChange={(e) => setData('numero_permis', e.target.value)}
                        />
                        <InputError message={errors.numero_permis} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">


                        <div className="mt-2">
                            <InputLabel htmlFor="date_expiration_permis" value="Date d'expiration" />

                            <Datepicker
                                id="date_expiration_permis"
                                asSingle={true}
                                useRange={false}
                                inputClassName="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                value={date_expiration_permis}
                                onChange={handleDateExpChange}
                                i18n={i18n.language}
                                displayFormat={"DD/MM/YYYY"}
                                placeholder={"dd/mm/yyyy"}
                            />
                            <InputError message={errors.date_expiration_permis} className="mt-2" />
                        </div>
                        <div className="mt-2">
                            <InputLabel htmlFor="nb_annee_conduite" value="Nombre d'année de conduite" />

                            <TextInput
                                id="nb_annee_conduite"
                                type="number"
                                name="nationalite"
                                value={data.nb_annee_conduite}
                                className="mt-1 block w-full"
                                autoComplete="nb_annee_conduite"

                                onChange={(e) => setData('nb_annee_conduite', e.target.value)}
                            />
                            <InputError message={errors.nb_annee_conduite} className="mt-2" />
                        </div>
                    </div>
                    <div className="py-2">
                        <span className='flex'>
                            <InputLabel htmlFor="fichier_permis" value="Fichier du permis" />
                        </span>

                        <input
                            id="fichier_permis" accept=""

                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

                        />
                        <InputError message={errors.fichier_permis} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <span className='flex'>
                            <InputLabel htmlFor="ville_residence" value="Ville de résidence" />
                            <span className="text-red-500">*</span></span>

                        <TextInput
                            id="ville_residence"
                            required
                            type="text"
                            name="ville_residence"
                            value={data.ville_residence}
                            className="mt-1 block w-full"
                            autoComplete="ville_residence"

                            onChange={(e) => setData('ville_residence', e.target.value)}
                        />
                        <InputError message={errors.ville_residence} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="adresse_residence" value="Adresse de résidence" />

                        <TextInput
                            id="adresse_residence"
                            type="text"
                            name="adresse_residence"
                            value={data.adresse_residence}
                            className="mt-1 block w-full"
                            autoComplete="adresse_residence"

                            onChange={(e) => setData('adresse_residence', e.target.value)}
                        />
                        <InputError message={errors.adresse_residence} className="mt-2" />
                    </div>
                    <div className="py-2">
                        <span className='flex'>
                            <InputLabel htmlFor="fichier_residence" value="Preuve de la résidence" />
                        </span>

                        <input
                            id="fichier_residence" accept=""

                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

                        />
                        <InputError message={errors.fichier_residence} className="mt-2" />
                    </div>
                    <div className="py-4 mt-4">
                        <PrimaryButton className="bg-blue-500  text-center whitespace-nowrap" disabled={processing}>
                            Mettre à jour le dossier
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </section>
    );
}

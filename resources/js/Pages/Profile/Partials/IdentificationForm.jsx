import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import i18n from '@/i18n';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { DateToFront, formaterMontant } from '@/tools/utils';
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
export default function IdentificationForm({ date_debut, date_fin, location_id, location, montant, mtaxe, mtotal, voiture,points }) {
    const user = usePage().props.auth.user;
    const { auth, countries } = usePage().props
    const [date_naissance,setDateNais]=useState({
      startDate:null,
      endDate:null
    })
    const [date_expiration_permis,setDateExp]=useState({
      startDate:null,
      endDate:null
    })
    const page = usePage().props;
    const types_pieces = [
      { 'nom': "Carte d'itentité" },
      { 'nom': "Passport" },
      { 'nom': "Carte d'électeur" },
    ]
    const { data, setData, post, processing, errors, reset } = useForm({
      location_id: location_id,
      date_debut: date_debut,
      date_fin: date_fin,
      nom_complet: (auth?.user!=null)? (auth?.user?.nom +" "+ auth?.user?.prenom):'',
      date_naissance: '',
      lieu_naissance: '',
      pays_id: '',
      type_piece_identite: '',
      numero_piece_identite: '',
      numero_permis: '',
      date_expiration_permis: '',
      nb_annee_conduite: '',
      adresse_residence: '',
      ville_residence: '',
      point_retrait_id: '',
      point_retrait: '',
      accept:0
      // _token: this.$page.props.csrf_token,
    });
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
    const handlePointChange = (e) => {
      let value=e.target.value;
      let getP=points.find((p)=>p.id==value);
      if(getP){
        setData(data => ({ ...data, 'point_retrait_id': getP.id, 'point_retrait': getP.lieu }));
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
    useEffect(() => {
      setActiveStep(0);
      if(points && points.length>=1){
        //alert('')
        let p=points[0];
        const  {id, lieu}=p;
        setData(data => ({ ...data, 'point_retrait_id': id, 'point_retrait': lieu }));
      }
    }, []);
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setData(id, value);
    };
  
  
  
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
  
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    const bg_active = "bg-emerald-500";

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
    const  className='';
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informations</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Mettre à jour les informations de votre profil
                </p>
            </header>

            
          <form onSubmit={submit}>
                      <div className="max-w-xl ">
                          <div className="grid grid-cols-2 gap-4">
                         <div className="py-2">
                          <span className='flex'>
                            <InputLabel htmlFor="nom_complet" value="Nom complet " />
                          <span className="text-red-500">*</span></span>

                          <TextInput
                            id="nom_complet"
                            required
                            type="text"
                            name="nom_complet"
                            value={data.nom_complet}
                            className="mt-1 block w-full"
                            autoComplete="nom_complet"
                            isFocused={true}
                            onChange={(e) => setData('nom_complet', e.target.value)}
                          />
                          <InputError message={errors.nom_complet} className="mt-2" />
                        </div>
                        <div className="py-2">
                          <span className='flex'>
                            <InputLabel htmlFor="nom_complet" value="Nom complet " />
                          <span className="text-red-500">*</span></span>

                          <TextInput
                            id="nom_complet"
                            required
                            type="text"
                            name="nom_complet"
                            value={data.nom_complet}
                            className="mt-1 block w-full"
                            autoComplete="nom_complet"
                            isFocused={true}
                            onChange={(e) => setData('nom_complet', e.target.value)}
                          />
                          <InputError message={errors.nom_complet} className="mt-2" />
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
                          <InputLabel htmlFor="pays_id" value="Pays d'origine/Nationalité" />

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
                              <option >Sélectionnez</option>
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
                            <InputLabel htmlFor="fichier" value="Fichier de la pièce d'identité" />
                          <span className="text-red-500">*</span></span>

                          <input
                        id="photo" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                            
                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

                        />
                          <InputError message={errors.nom_complet} className="mt-2" />
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
                            <InputLabel htmlFor="fichier" value="Fichier du du permis" />
                          </span>

                          <input
                        id="fichier_permis" accept=""
                            
                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

                        />
                          <InputError message={errors.nom_complet} className="mt-2" />
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
                            <InputLabel htmlFor="fichier" value="Preuve de la résidence" />
                          </span>

                          <input
                        id="photo" accept=""
                            
                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 rounded-md  bg-white shadow-none border py-1.5 px-4 block w-full"

                        />
                          <InputError message={errors.nom_complet} className="mt-2" />
                        </div>
                       
                        <div className="py-4 mt-4">
                          <PrimaryButton className="bg-gray-800 text-yellow-500 text-center whitespace-nowrap" disabled={processing}>
                            Continuer <MdOutlineNavigateNext/> 
                          </PrimaryButton>
                        </div>
            </div>
          </form>
        </section>
    );
}

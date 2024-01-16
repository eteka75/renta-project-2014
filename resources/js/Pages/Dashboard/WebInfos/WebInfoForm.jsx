import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Progress, Switch, Tooltip } from '@material-tailwind/react';
import Translate from '@/components/Translate';
import TextArea from '@/components/TextArea';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/css/quill-editor.css';
import { t } from 'i18next';

export default function WebInfoForm({ className = '', info = null, action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const [contenu, setDescription] = useState('');
    useEffect(() => { 
        setDescription((info && info?.contenu)??'OOO')
     }, []);
     const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote',{ 'align': [] }],
    
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
    
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
    
          ['clean'],                                         // remove formatting button
          ['link', 'image', 'video']                         // link and image, video
        ],
      };
    
      const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'color', 'background',
        'align', 'code-block', 'formula'
      ];


    const handleFileChange = (e) => {
        let file = e.target.files;

        if (file !== undefined && file[0]) {
            setData("photo", file[0]);
        }
    };
    const handleContenu = (value) => {
        setDescription(value);
        setData('contenu',value);
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };
    const addToRefs = el => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const { data, setData, post, progress, errors, processing, recentlySuccessful } = useForm(info !== null && action === 'update' ?
        {
            titre: info?.titre ?? '',
            photo: '',
            code: info?.code ,
            contenu: info?.contenu ?? ''
        } : {
            titre: '',
            code: '',
            photo: '',
            contenu: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.infos.update', info.id), data, {
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
            post(route('dashboard.infos.store'), {
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
                    <InputLabel htmlFor="titre"  >Titre de l'information</InputLabel>
                    <TextInput
                        id="titre"
                        ref={addToRefs}
                        required
                        value={data.titre}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.titre} className="mt-2" />
                </div>
                <div className='md:grid md:grid-cols-3 md:gap-4'>
                <div>
                    <InputLabel htmlFor="code"  >Code</InputLabel>
                    <Tooltip placement="top-start" content={("Le code doit être unique. Il n'est pas modifiable")}>

                    <TextInput
                        id="code"
                        required
                        disabled ={action === 'update'?true:false}
                        ref={addToRefs}
                        
                        value={data.code}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block bg-slate-100 w-full"
                        />
                        </Tooltip>

                    <InputError message={errors.code} className="mt-2" />
                </div>
                <div className='col-span-2'>
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
                </div>
                
                
                <div className=''>

                        <InputLabel htmlFor="nom">Contenu</InputLabel>
                    <div className=''>
                        <ReactQuill theme="snow"
                         modules={modules}
                         formats={formats}
                        className='h-[400px] mb-20 border-0 bg-white' value={data.contenu} onChange={handleContenu} />
                        </div>
                        

                        <InputError message={errors.contenu} className="mt-2" />

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

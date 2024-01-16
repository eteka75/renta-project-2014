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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/css/quill-editor.css'

export default function FaqForm({ className = '', faq = null, action, btntext = 'Enrégister' }) {
    // intialize as en empty array
    const refs = useRef([]); // or an {}
    refs.current = []; // or an {}
    const [contenu, setDescription] = useState('');
    useEffect(() => { 
        setDescription((faq && faq.contenu)??'OOO')
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
        setData('reponse',value);
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

    const { data, setData, post, progress, errors, processing, recentlySuccessful } = useForm(faq !== null && action === 'update' ?
        {
            question: faq?.question ?? '',
            photo: '',
            actif: faq.actif==1?true:false,
            reponse: faq?.reponse ?? ''
        } : {
            question: '',
            photo: '',
            actif: 0,
            reponse: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'update') {
            post(route('dashboard.faqs.update', faq.id), data, {
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
            post(route('dashboard.faqs.store'), {
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
            {console.log(data)}
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <InputLabel htmlFor="question"  >Question</InputLabel>
                    <TextInput
                        id="question"
                        ref={addToRefs}
                        value={data.question}
                        onChange={handleInputChange}
                        type="text"
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.question} className="mt-2" />
                </div>
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
                
                
                <div className=''>
                    <div>
                        {console.log(errors)}
                        <InputLabel htmlFor="reponse">Réponse à la question</InputLabel>
                        <div className="mb-20">
                        <ReactQuill theme="snow"
                         modules={modules}
                         formats={formats}
                        className='h-[200px] border-0 bg-white' value={data.reponse} onChange={handleContenu} />
                        </div>                       

                        <InputError message={errors.reponse} className="mt-2" />
                    </div>

                </div>
                <div>
                    <div className="flex items-center">
                        <input name="disponibilite"
                            checked={data.actif}
                            onChange={(e) => setData('actif', e.target.checked?1:0)}
                            type="checkbox" id="hs-basic-with-description" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
                                focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500
                                dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition 
                                before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"/>
                        <label htmlFor="hs-basic-with-description" className="text-sm text-gray-500 ms-3 dark:text-gray-300">Actif</label>
                    </div>
                    <InputError message={errors.actif} className="mt-2" />

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

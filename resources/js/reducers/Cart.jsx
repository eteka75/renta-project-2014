import React from 'react';
import { useCart } from './CartContext';
import { HTTP_FRONTEND_HOME } from '@/tools/constantes';
import { Badge, Button, Tooltip } from '@material-tailwind/react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { formaterMontant } from '@/tools/utils';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { Link, useForm, usePage } from '@inertiajs/react';
import default_photo1 from "@/assets/images/design/default_voiture.jpg";
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { handleOpenCart } from '@/components/locations/LocaVoitureCard';
import { BsCart4 } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoIosArrowBack } from 'react-icons/io';
import { useEffect } from 'react';
import { useState } from 'react';
import InputError from '@/components/InputError';


const Cart = ({ onClose }) => {
    const {auth}=usePage().props;
    const { cartState } = useCart();
    const handleRemoveFromCart = (item) => {
        dispatch({ action: 'REMOVE_FROM_CART', payload: item, cat: "Achat" });
    };
const [items,setAllItems]=useState([]);
const { errors } = useForm({
});
    let total = 0;
   // let items=[];
    useEffect(()=>{
        let t=[];
        
        if(cartState?.cartItems?.length > 0 ){
            cartState?.cartItems?.map(({ id }) => {
                t.push(id);
            });
        }
        console.log('ITEMS',t.join('-'))
        console.log('errors',errors)
        setAllItems(t.join('-'));
    },[cartState])
    const { dispatch } = useCart();
    const { t } = useTranslation();
    return (
        <div className=''>
            {cartState?.cartItems?.length > 0 &&
                <div className=''>
                    {cartState?.cartItems?.map(({ id, name, quantity, photo, prix }) => {
                        if (quantity > 0) { total += prix };
                        return (<div key={id} className="p-2 bg-white shadow-sm hover:shadow-lg dar:border-0 border mb-2 justify-between rounded-md  gap-2">
                            <div className="flex justify-between">
                                <div className='font-bold text-lg mb-1'>
                                    <Link href={route('front.achat', id)}>
                                        {name ?? '-'}
                                    </Link>
                                </div>
                                <div>
                                    <Tooltip placement="top-start" content={t('Supprimer')}>

                                        <Button size='sm' onClick={() => handleRemoveFromCart({ id: id, name: name, photo: photo, prix: prix })} variant='text'><FaRegTrashCan /> </Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-1">
                                <div>
                                    {photo != null && photo != '' ?
                                        <Link href={route('front.achat', id)}>
                                            <LazyLoadImage src={HTTP_FRONTEND_HOME + '' + photo}
                                                className='h-14  object-center object-cover rounded-md'
                                                alt={name} />
                                        </Link>
                                        : <Link href={route('front.achat', id)}>
                                            <LazyLoadImage src={default_photo1}
                                                className='h-14  object-center object-cover rounded-md'
                                                alt={name} />
                                        </Link>
                                    }
                                </div>
                                <div>

                                    <div className='text-sm font-medium text-red-600'>{formaterMontant(prix, i18n.language)} </div>
                                    <div className="flex flex-wrap">
                                        <div className='text-sm pe-4 '>Quantité  : <span className='text-center leading-4 px-1.5 bg-gray-800 text-white rounded-full'>{quantity ?? 1}</span>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>)
                    })
                    }
                    {total > 0 &&
                        <div className='flex text-lg gap-4 py-2 px-4 border rounded-md justify-between dark:border-slate-700'>
                            <div className='font-bold dark:text-white'>Total :</div>
                            <div className='font-bold text-red-500'>{formaterMontant(total, i18n.language)}</div>
                        </div>}
                    <div className='mt-4'>
                        <Link href={route('front.lachat1',{vid:items})}>
                            <Button className='w-full flex gap-1 mt-2 justify-center text-yellow-500 dark:border dark:border-yellow-500'>
                            {auth?.user===null ?         "Connectez-vous pour commander"  : "Commander"  }   <FaCartPlus />
                            </Button>
                        </Link>
                        <InputError message={errors.items} className="mt-2" />

                        <Button onClick={onClose} color='white' className='w-full flex justify-center bg-gray-100 gap-1 mt-2 border'>
                            <IoIosArrowBack />    Continuer mes achats</Button>
                    </div>
                </div>}
            {(!cartState?.cartItems?.length) &&
                <div className='p-4 border rounded-md shadow-sm text-center'>
                    <BsCart4 className='text-5xl text-slate-300 mb-4 mx-auto' />
                    <h2 className='text-lg'>  {t('Panier vide !')}</h2>
                    <p className="text-sm text-slate-500">{t('Les voitures ajoutées à votre panier apparaissent ici')}</p>

                </div>
            }
        </div>
    );
};
function CartCounter() {
    const { cartState } = useCart();
    let nb = cartState?.cartItems?.length ?? 0;
    nb = nb > 9 ? '9+' : nb;
    if (nb > 0) {
        return (

            <span className="bg-red-500 text-center items-center text-white text-[13px] rounded-full absolute ms-6 -mt-4 w-5 h-5 leading-5">{nb} </span>
        );
    }
}
function AddCartBtn({ id, nom, photo, prix, className }) {
    const { dispatch } = useCart();

    const handleAddToCart = (product) => {
        handleOpenCart();
        dispatch({ action: 'ADD_TO_CART', payload: product, cat: "Achat" });
    };
    return <Button variant='text'
        onClick={() => handleAddToCart({ id: id, name: nom, photo: photo, prix: prix })}
        className={className + " flex hover:px-4 px-4 md:px-0 dark:bg-gray-900 dark:border-slate-700 dark:text-yellow-500 bg-gray-100 md:bg-transparent justify-center border py-4 md:py-1 md:border-0 w-full md:w-auto my-4 md:my-0   md:mx-2   transition-all duration-300  gap-2  hover:bg-gray-900 hover:text-white text--500 "} >
        <FaCartPlus className='h-4 w-4' /> <span className=" ">Ajouter au panier</span>
    </Button>
}
function AddFavorisBtn({ id, nom, photo, prix }) {
    const { dispatch } = useCart();

    const handleAddToCart = (product) => {
        handleOpenCart();
        dispatch({ action: 'ADD_TO_CART', payload: product, cat: "Achat" });
    };
    return <Button variant='text'
        onClick={() => handleAddToCart({ id: id, name: nom, photo: photo, prix: prix })}
        method="post" className="w-fulls px-0  bg-white_  shado mx-2   py-2  md:px-0 flex transition-all duration-300  gap-2 hover:px-4 hover:bg-gray-900 hover:text-white
     text--500 " >
        <FaHeart className='' /> <span className=" ">Ajouter aux favoris</span>
    </Button>
}


export {
    Cart, CartCounter, AddCartBtn, AddFavorisBtn
};
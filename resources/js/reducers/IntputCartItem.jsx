import React from 'react'
import { useCart } from './CartContext';
import { useEffect } from 'react';
import { useState } from 'react';

export default function IntputCartItem() {
    const { cartState } = useCart();
const [allItem,setAllItems]=useState([]);
useEffect(()=>{
    let t=[];
    if(cartState?.cartItems?.length > 0 ){
        cartState?.cartItems?.map(({ id }) => {
            t.push(id);
        });
    }
},[])
  return (
    <div>
      All items
    </div>
  )
}

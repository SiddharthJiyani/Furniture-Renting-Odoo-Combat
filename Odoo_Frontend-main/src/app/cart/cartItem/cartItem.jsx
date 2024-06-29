'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import "./cartItem.css"
import { CircleMinusIcon, CirclePlus } from 'lucide-react'

const CartItem = ({ product, title, metaImage, qty, addItemToCart , setGrandTotal , setItemTotal }) => {
  const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)


  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setItemTotal(prev => prev + updatedQty - quantity)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1
    setItemTotal(prev => prev + updatedQty - quantity)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

 useEffect(()=>{

    const total = quantity * product.rentalPrice
    const lastPrice = price;
    
    setPrice(total)
    setGrandTotal(prev => prev + total -lastPrice)

 },[

    quantity
 ])




  return (
    <li className="item" key={title}>
      <Link href={`/products/${product._id}`} className="mediaWrapper">
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className="media" imgClassName="image"  fill />
        )}
      </Link>

      <div className="itemDetails ">
          <h6>{product.name}</h6>
            <div className=' flex -inset-0'>

          <button onClick={decrementQty}>

                 <CircleMinusIcon  />
                </button>
          <button onClick={incrementQty}>

          <CirclePlus  />
          </button>
            </div>
          
          </div>
        <div>

        <p> Quantity : {quantity}</p>
        <p> Price : {price}</p>
        </div>
        

     
    </li>
  )
}

export default CartItem
'use client'

import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

// import { Page, Settings } from '../../../../payload/payload-types'
// import { Button } from '../../../_components/Button'
// import { HR } from '../../../_components/HR'
// import { LoadingShimmer } from '../../../_components/LoadingShimmer'
// import { Media } from '../../../_components/Media'
// import { Price } from '../../../_components/Price'
// import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
// import { useAuth } from '../../../_providers/Auth'
// import { useCart } from '../../../_providers/Cart'
// import CartItem from '../CartItem'

import "./cart.css"
import { Button } from '@/components/ui/button'
import CartItem from './cartItem/cartItem'
const CartPage  = (props) => {

  const { isLoggedIn } = useAuth()
  const [ emptyCart, setEmptyCart ] = useState(true)
  const [cart , setCart] = useState({ items : [{
    "_id": "60dc0fabbcc587001b8b46c6",
    "name": "Modern Desk",
    "description": "A sleek and minimalistic desk for your workspace.",
    "categoryId": "60dbf34abbcc587001b8b46c5", // ObjectId of a category in your database
    "rentalPrice": 75,
    "availabilityStatus": true,
    "location": "Office",
    "imageUrl": "https://example.com/desk.jpg",
    "createdAt": "2023-06-30T08:00:00.000Z",
    "updatedAt": "2023-06-30T08:00:00.000Z"
  },{
    "_id": "60dc0fabbcc5871b8b46c6",
    "name": "Mode Desk",
    "description": "A sleek and minimalistic desk for your workspace.",
    "categoryId": "60dbf34abcc587001b8b46c5", // ObjectId of a category in your database
    "rentalPrice": 75,
    "availabilityStatus": true,
    "location": "Office",
    "imageUrl": "https://example.com/desk.jpg",
    "createdAt": "2023-06-30T08:00:00.000Z",
    "updatedAt": "2023-06-30T08:00:00.000Z"
  }]})

const [user , setUser] = useState({})
const [itemTotal , setItemTotal] = useState(0)
const [grandTotal , setGrandTotal] = useState(0)  
const addItemToCart = ()=>{}
//   const { cart, emptyCart, addItemToCart,"" hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      
        <Fragment>
          {emptyCart ? (
            <div  className='flex text-3xl text-center font-bold flex-col justify-center align-middle gap-5 '>
           { isLoggedIn && <p className=''> Your cart is empty.</p>}
              
              {!isLoggedIn && (
                <>
                                <p className=' text-5xl'>Login to save your Cart</p>

                  <Button  label="Continue shopping" appearance="primary" className=" w-fit self-center rounded-xl text-2xl" >
                  <Link href={`/signin`}>Log in</Link>
                  </Button>
                
                </>
                  
              )}
            </div>
          ) : (
            <div className="grid grid-cols-[65%_1fr] gap-[60px] grid-cols-[1fr]">
              <div>
                <div className=" grid grid-cols-[100px_2fr_1fr] gap-6 hidden mb-2">
                  <p>Products</p>
                  <div className="">
                    <p></p>
                    <p></p>
                    <p>Quantity</p>
                  </div>
                  <p className=" ">Subtotal</p>
                </div>
                
                <ul className="border-t-[color:var(--color-dark-50)] border-t border-solid;">
                  {cart?.items?.map((item, index) => {
                    // setItemTotal(prev => prev + 1)
                      const {
                        quantity,
                        product,
                       id:_id,
                        title,
                        meta
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          product={item}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                          setGrandTotal={setGrandTotal}
                          setItemTotal={setItemTotal}
                          
                        />
                      )
                    })
                  }
                </ul>
              </div>

              <div className=" flex flex-col gap-4 border border-[color:var(--color-dark-50)] px-6 py-[30px] border-solid">
                


                <div className=" ">
                  <h1>Summary</h1>
                  <p className=""> Grand Total : {grandTotal}</p>
                  <p className=""></p>
                </div>

                <Button
                  className=" "
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Checkout' : 'Login to checkout'}
                  appearance="primary"
                > Checkout</Button>
              </div>
            </div>
          )}
        </Fragment>
 
    </Fragment>
  )
}

export default CartPage;
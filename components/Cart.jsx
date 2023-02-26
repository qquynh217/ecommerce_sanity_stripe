import React, { useRef } from 'react'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from "react-icons/ti"
import { toast } from 'react-hot-toast';
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/library/client';
import getStripe from '@/library/getStripe';

function Cart() {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCardItemQuantity, onRemove } = useStateContext()
    const handleCheckout = async () => {
        const stripe = await getStripe();

        console.log(cartItems);

        const response = await fetch('/api/stripe', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(cartItems)
        })
        if (response.statusCode == 500) return;

        const data = await response.json()

        console.log('data', data);

        toast.loading("Redirecting")

        stripe.redirectToCheckout({ sessionId: data.id })
    }
    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button
                    className='cart-heading'
                    onClick={() => { setShowCart(false) }}
                >
                    <AiOutlineLeft />
                    <span>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantities} items)</span>
                </button>
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button className='btn' onClick={() => { setShowCart(false) }}>
                                Continues Shopping
                            </button>
                        </Link>
                    </div>
                )}
                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className='product' key={item._id}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h5>${item.price}</h5>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className='quantity-desc'>
                                            <span className='minus' onClick={() => { toggleCardItemQuantity(item._id, 'dec') }}><AiOutlineMinus /></span>
                                            <span className='num' >{item.quantity}</span>
                                            <span className='plus' onClick={() => { toggleCardItemQuantity(item._id, 'inc') }}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button className='remove-item' onClick={() => { onRemove(item) }}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button className='btn' onClick={handleCheckout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
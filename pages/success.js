import React, { useEffect, useState } from 'react';
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useStateContext } from "../context/StateContext.js"
import Link from 'next/link'
import { runFireworks } from "../library/utils"

function Success() {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        // localStorage.clear();
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireworks()
    }, [])
    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className='email-msg'>Check your email inbox for the receipt.</p>
                <p className='description'>If you have any questions, please email</p>
                <a className='email' href='mailto:order@example.com'>
                    order@example.com
                </a>
                <Link href="/">
                    <button width="300px" className='btn'>
                        Coninue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Success;
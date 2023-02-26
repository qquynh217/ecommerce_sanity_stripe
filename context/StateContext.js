import product from "@/sanityecommerce/schemas/product";
import React, { createContext, useContext, useState } from "react"
import { toast } from "react-hot-toast"

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    let foundProduct
    let index

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalQuantities(prev => prev + quantity)
        setTotalPrice((prev) => prev + product.price * quantity)
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
        } else {
            // product.quantity = quantity
            setCartItems([...cartItems, { ...product, quantity: quantity }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id)
        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prev => prev - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCardItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === "inc") {
            newCartItems.splice(index, 0, {
                ...foundProduct,
                quantity: foundProduct.quantity + 1
            })
            setCartItems([...newCartItems])
            setTotalPrice(prev => prev + foundProduct.price)
            setTotalQuantities(prev => prev + 1)
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                newCartItems.splice(index, 0, {
                    ...foundProduct,
                    quantity: foundProduct.quantity - 1
                })
                setCartItems([...newCartItems])
                setTotalPrice(prev => prev - foundProduct.price)
                setTotalQuantities(prev => prev - 1)
            }
        }
    }

    const incQty = () => {
        setQty(prev => prev + 1)
    }
    const decQty = () => {
        setQty(prev => {
            if (prev - 1 < 1) return 1;
            return prev - 1
        })
    }
    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            setShowCart,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            incQty,
            decQty,
            onAdd,
            toggleCardItemQuantity,
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
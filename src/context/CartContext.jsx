import { useState, useEffect, createContext, useContext } from 'react'

const cartContext = createContext();

export const { Provider } = cartContext;

export const useCartContext = () => {
    return useContext(cartContext)
}

const CartContextProvider = ({children}) => {
    const [qtyItems, setQtyItems] = useState(0)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(()=> {
        const localCart = JSON.parse(localStorage.getItem('cart'))
        const localTotal = JSON.parse(localStorage.getItem('total'))
        const localQty = JSON.parse(localStorage.getItem('qty'))

        if (localCart && localTotal && localQty) {
        setCart(localCart)
        setTotal(localTotal)
        setQtyItems(localQty)
    }
},[])
    const isInCart = (id) => {
        return cart.find((elem) => elem.id === id)
    }


    const addToCart = (item, qty) => {
        setQtyItems(qtyItems + qty)
        setTotal(total + item.price * qty)
        let newCart = []

        if (isInCart(item.id)) {
            newCart = cart.map((elem) => {
                if(elem.id === item.id) {
                    return {...elem, qty: elem.qty + qty}
                } else {
                    return elem
                }
                })
        } else {
            newCart = [...cart, {...item, qty}]
        }
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
        localStorage.setItem('total', JSON.stringify(total))
        localStorage.setItem('qty', JSON.stringify(qty))
    }
    

    const contextValue = {
        titulo: 'Aca va un titulo',
        qtyItems,
        addToCart
    }

    return (
        <Provider value={contextValue}>
        {children}
        </Provider>
    )
}


export default CartContextProvider;










// export const CartContext = createContext({
//     cart: []
// })

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([])
//     console.log(cart)

//     const addItem = (item, quantity) => {
//         if(!isInCart(item.id)) {
//             setCart(prev => [...prev, {...item, quantity}])
//         } else {
//             console.error('El producto ya fue agregado')
//         }
//     }

//     const removeItem = (itemId) => {
//         const cartUpdated = cart.filter(prod => prod.id !== itemId)
//         setCart(cartUpdated)
//     }

//     const clearCart = () => {
//         setCart([])
//     }

//     const isInCart = (itemId) => {
//         return cart.some(prod => prod.id === itemId)
//     }

//     return (
//         <CartContext.Provider value={{cart, addItem, removeItem, clearCart}}>  
//             { children }
//         </CartContext.Provider>
//     )
// }
import './Cart.css'
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase/dbConnection"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
    const { cart, total, removeItem, clearCart } = useCartContext();
    const [formData, setFormData] = useState({name:"", tel:"", email:""});

    const handleRemoveItem = (id, price, qty) => {
        removeItem(id, price, qty);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSaveCart = () => {     
        const ordersCollection = collection(db, "orders")
        const newOrder = {
            buyer: formData,
            items: cart,
            date: new Date(),
            total: total
        }

        addDoc(ordersCollection, newOrder)
        .then((doc)=>{
            Swal.fire({
                title: "¿Quieres continuar con la compra?",
                text: "No se puede volver atras",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Comprar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Compra realizada",
                        text: "Tu compra se ha realizado correctamente",
                        icon: "success"
                    });
                }
            });
            clearCart();
            setFormData({name:"", tel:"", email:""})
        })
        .catch((error)=>{
            console.error("Error adding document: ", error)
        })
    }

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>Explora nuestra colección y encuentra tu camiseta favorita</p>
                <Link to="/">
                    <button className="btn-primary">Ver productos</button>
                </Link>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h2>Tu Carrito</h2>
                {cart.map(({ id, name, price, qty, image }) => (
                    <div key={id} className="cart-item">
                        <div className="item-image">
                            <img src={image} alt={name} />
                        </div>
                        <div className="item-details">
                            <h3>{name}</h3>
                            <p className="price">€{price}</p>
                            <div className="quantity-controls">
                                <span>Cantidad: {qty}</span>
                                <button onClick={() => handleRemoveItem(id, price, qty)} className="remove-btn">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="cart-actions">
                    <button onClick={handleClearCart} className="btn-secondary">Vaciar carrito</button>
                    <Link to="/" className="btn-primary">Seguir comprando</Link>
                </div>
            </div>

            <div className="checkout-section">
                <h3>Resumen del pedido</h3>
                <div className="order-summary">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>€{total}</span>
                    </div>
                    <div className="summary-row">
                        <span>Envío</span>
                        <span>Gratis</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>€{total}</span>
                    </div>
                </div>

                <div className="checkout-form">
                    <h3>Información de contacto</h3>
                    <div className="form-group">
                        <label htmlFor="name">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tel">Teléfono</label>
                        <input
                            type="tel"
                            id="tel"
                            name="tel"
                            value={formData.tel}
                            onChange={handleOnChange}
                            placeholder="Tu teléfono"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>
                    <button onClick={handleSaveCart} className="btn-primary checkout-btn">
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart 
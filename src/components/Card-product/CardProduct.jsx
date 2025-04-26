import './CardProduct.css';
import { Link } from 'react-router-dom';

const CardProduct = ({ id, name, price, stock, image }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={name} />
                <div className="product-overlay">
                    <Link to={`/product/${id}`} className="view-details-btn">
                        Ver detalles
                    </Link>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <div className="product-price">
                    <span className="current-price">€{price}</span>
                    <span className="original-price">€100</span>
                </div>
                <div className="product-stock">
                    <span className="stock-label">Disponibles:</span>
                    <span className="stock-value">{stock}</span>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;



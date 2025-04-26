// IMPORTS
import './Slogan.css';

// COMPONENTE
const Banner = ({ slogan }) => {
    return (
        <div className="banner">
            <div className="banner-content">
                <h1 className="banner-title">{slogan}</h1>
                <p className="banner-subtitle">Descubre nuestra colección exclusiva de camisetas de fútbol</p>
            </div>
        </div>
    );
};

// EXPORTS
export default Banner;
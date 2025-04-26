// IMPORTS
import CartWidget from "../CartWidget/CartWidget";
import FutbolSolid from "./Logo/FutbolSolid";
import LogoUser from "../CartWidget/LogoUser";
import "./NavBar.css";
import { NavLink, Link } from 'react-router-dom'


// COMPONENTE
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div className="navbar-brand-container">
                    <Link to='/' className="navbar-brand">
                        <FutbolSolid />
                        <span>JSport</span>
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/camisetas/america' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>América</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/camisetas/europa' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Europa</NavLink>
                        </li>
                    </ul>
                    <div className="navbar-icons">
                        <LogoUser />
                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav>
    )
}


// EXPORTS
export default NavBar

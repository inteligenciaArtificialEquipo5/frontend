import { NavLink } from "react-router-dom"

import letters from "../assets/images/SpaceshipTitanicLetters.png"

import styles from "../styles/styles-headercomponent.module.scss"

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-xl bg-custom" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <NavLink className="navbar-brand" to="/">
                        <img className={`img-fluid ${styles.imagenLogoHeader}`} src={letters} alt="SPACESHIP TITANIC" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={`navbar-toggler-icon ${styles.iconNavBar}`} />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className={`nav-item mx-lg-5 my-2 my-lg-0`}>
                                <NavLink className={`nav-link text-white text-end ${styles.navLink}`} to="/">Predicción</NavLink>
                            </li>
                            <li className="nav-item mx-lg-5 my-2 my-lg-0">
                                <NavLink className={`nav-link text-white text-end ${styles.navLink}`} to="/modelo">Modelo</NavLink>
                            </li>
                            <li className="nav-item mx-lg-5 my-2 my-lg-0">
                                <NavLink className={`nav-link text-white text-end ${styles.navLink}`} to="/eda">Dashboard</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent

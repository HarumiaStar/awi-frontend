import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './LayoutMobile.module.css';
import { CgMenuLeft } from 'react-icons/cg';
import { MdMenuOpen } from 'react-icons/md';
import { IoPersonCircle } from 'react-icons/io5';
import { useEffect } from 'react';

export default function LayoutMobile() {
    const routeLinkClicked = (e: any) => {
        const subLink = e.target.querySelector(`a`);
        if (subLink) {
            subLink.click();
        }
    }

    const navBarOpen = () => {
        const navBar = document.querySelector(`.${styles.navbar}`);
        if (navBar) {
            navBar.classList.add(`${styles.active}`);
        }
        // remove scroll of content
        const content = document.querySelector(`.${styles.content}`);
        if (content) {
            content.classList.add(`${styles.disabledScroll}`);
        }
    }

    const navBarClose = () => {
        const navBar = document.querySelector(`.${styles.navbar}`);
        if (navBar) {
            navBar.classList.remove(`${styles.active}`);
        }
        // remove scroll of content
        const content = document.querySelector(`.${styles.content}`);
        if (content) {
            content.classList.remove(`${styles.disabledScroll}`);
        }
    }

    const navigate = useNavigate();

    const profileClicked = () => {
        navigate("/settings");
    }

    useEffect(() => {
        // get all a in navbar
        const links = document.querySelectorAll(`.${styles.routeLinks} a`);
        links.forEach(link => {
            link.addEventListener("click", navBarClose);
        });
    });

    return (
        <div className={styles.mainContent}>
            <div className={styles.header}>
                <div className={styles.burgerMenu}>
                    <CgMenuLeft id="burgerMenuOpen" onClick={navBarOpen} size={"4rem"} />
                    <nav className={styles.navbar}>
                        <div className={styles.burgerContent}>
                            <div className={styles.burgerHeader}>
                                <MdMenuOpen id="burgerMenuClose" onClick={navBarClose} size={"4rem"} />
                            </div>
                            <div className={styles.burgerLinks} >
                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/">Home</Link>
                                </div>
                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/login">Se connecter</Link>
                                </div>
                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/logout">Se déconnecter</Link>
                                </div>
                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/agenda">Agenda</Link>
                                </div>
                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/register">S'inscrire</Link>
                                </div>
                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/settings">Paramètres</Link>
                                </div>

                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/CreerFestival">Créer un festival</Link>
                                </div>

                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/ListeFestivals">Liste des festivals</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className={styles.settings}>
                    <IoPersonCircle size={"4rem"} onClick={profileClicked} />
                </div>
            </div>
            {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}
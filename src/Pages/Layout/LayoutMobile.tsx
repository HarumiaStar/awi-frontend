import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './LayoutMobile.module.css';
import { CgMenuLeft } from 'react-icons/cg';
import { IoPersonCircle } from 'react-icons/io5';
import { useEffect, useReducer } from 'react';
import { setReloadLayout } from '../../Utils/Types/Database/Auth';

export default function LayoutMobile() {
    const [, forceUpdate] = useReducer(x => {
        return x + 1;
    },0);

    setReloadLayout(forceUpdate);

    const routeLinkClicked = (e: any) => {
        const subLink = e.target.querySelector(`a`);
        if (subLink) {
            subLink.click();
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

    const navBarToggle = () => {
        const navBar = document.querySelector(`.${styles.navbar}`);
        const content = document.querySelector(`.${styles.content}`);
        if (navBar && navBar.classList.contains(`${styles.active}`)){
            navBar.classList.remove(`${styles.active}`);
            content?.classList.remove(`${styles.disabledScroll}`);
        }else {
            navBar?.classList.add(`${styles.active}`)
            content?.classList.add(`${styles.disabledScroll}`);
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
        <div className='bg-bleu-fonce flex flex-col items-center w-full pt-12 pb-12 h-full'>
            <div className='flex flex-row items-center justify-between w-10/12 mb-5'>
                <div className={styles.burgerMenu}>
                    <CgMenuLeft id="burgerMenuOpen" onClick={navBarToggle} size={"4rem"} />
                    <nav className={styles.navbar}>
                        <div className={styles.burgerContent}>
                            {/* <div className={styles.burgerHeader}>
                            <MdMenuOpen id="burgerMenuClose" onClick={navBarClose} size={"4rem"} className='bg-vert-moyen rounded-lg'/>
                            </div> */}
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

                                <div className={styles.routeLinks} onClick={routeLinkClicked}>
                                    <Link to="/ListeJeuxFestivals">Liste des jeux</Link>
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
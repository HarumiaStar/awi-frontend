import { Link, Outlet } from "react-router-dom";
import style from "./LayoutDesktop.module.css";

export default function LayoutDesktop() {
  const routeLinkClicked = (e: any) => {
    const subLink = e.target.querySelector(`a`);
    if (subLink) {
      subLink.click();
    }
  }

  return (
    <div className={style.mainContent}>
      {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
      <nav className={style.navbar}>
        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/">Home</Link>
        </div>
        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/login">Se connecter</Link>
        </div>
        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/logout">Se déconnecter</Link>
        </div>
        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/agenda">Agenda</Link>
        </div>
        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/register">S'inscrire</Link>
        </div>
        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/settings">Paramètres</Link>
        </div>

        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/CreerFestival">Créer un festival</Link>
        </div>

        <div className={style.routeLinks} onClick={routeLinkClicked}>
          <Link to="/ListeFestivals">Liste des festivals</Link>
        </div>
      </nav>


      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
}
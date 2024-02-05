import { Link, Outlet } from "react-router-dom";
import { Api } from "../../Utils/Types";
import { useEffect, useReducer, useState } from "react";
import { setReloadLayout } from "../../Utils/Types/Database/Auth";

export default function LayoutDesktop() {
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

  const navBarItem = (link: string, text: string) => {
    return (
      <div
        className='flex flex-row items-center justify-center h-full cursor-pointer hover:bg-gray-700 p-4 rounded-md'
        onClick={routeLinkClicked}
      >
        <Link to={link}>{text}</Link>
      </div>
    );
  }

  const isConnected = Api.getInstance().getToken() !== null;

  return (
    <div className='flex flex-col items-center w-full h-full bg-bleu-fonce'>
      {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
      <nav className='flex flex-row justify-between w-full h-16 p-2'>
        {navBarItem('/', 'Home')}
        {navBarItem('/ListeFestivals', 'Liste des festivals')}
        {isConnected ?(
              <>
                {navBarItem('/logout', 'Se déconnecter')}
                {navBarItem('/agenda', 'Agenda')}
                {navBarItem('/settings', 'Paramètres')}
                {navBarItem('/CreerFestival', 'Créer un festival')}
              </>
            ):(
              <>
                {navBarItem('/login', 'Se connecter')}
                {navBarItem('/register', "S'inscrire")}
              </>
            )
        }
      </nav>


      {/* An <Outlet> renders whatever child route is currently active,
            the child routes we defined above. */}
      <div className='flex flex-col items-center w-full h-full p-10 snap-y overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}
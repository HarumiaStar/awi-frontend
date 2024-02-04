import { useLocation, useNavigate } from "react-router-dom";
import { Api } from "../../Utils/Types";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { dummyJeux } from "../ListeJeuxFestival/dommyJeux";
import { APIFestival as Festival, APIJeu as Jeu } from "../../Utils/Types";


export default function DetailFestival() {

    /* ---------------------------------- DATA ---------------------------------- */
    const [festival, setFestival] = useState<Festival | null>(null);
    const [jeux, setJeux] = useState<Jeu[] | null>(null);


    /* ------------------------------ RENDER STATES ----------------------------- */
    const [jeuxOpen, setJeuxOpen] = useState<boolean>(false);


    /* -------------------------------- VARIABLES ------------------------------- */
    const location = useLocation();
    const navigator = useNavigate();
    const id = location.pathname.split('/').pop();



    /* -------------------------------------------------------------------------- */
    /*                               DATA RETRIEVING                              */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        const festivalData = Api.getInstance().getApi(`/festivals/${id}`);

        festivalData.then(async (response) => {
            if (!response.body) {
                alert('No festival found');
                return;
            }
            const festival = (await response.json()) as Festival;
            setFestival(festival);
        });

        const jeux = dummyJeux.map((jeu) => {
            return {
                id: randomId(),
                name: jeu.name,
                author: jeu.author || "Auteur inconnu",
                editor: jeu.editor || "Editeur inconnu",
                maxPlayers: Math.floor(Math.random() * 10),
                minPlayers: Math.floor(Math.random() * 10),
                minAge: jeu.minAge,
                duration: jeu.duration,
                toAnimate: jeu.toAnimate,
                recieved: jeu.recieved,
                type: jeu.type,
                mechanics: jeu.mechanics,
                theme: jeu.theme,
                tags: jeu.tags,
                description: jeu.description,
                image: jeu.image,
                logo: jeu.logo,
                video: jeu.video,
                manual: jeu.manual
            } as Jeu;
        });

        setJeux(jeux);
        // const jeuxPromises = Api.getInstance().getApi(`/games/festival/${festivalId}`);

        // jeuxPromises.then(async (response) => {
        //     if (!response.body) {
        //         alert('No jeux found');
        //         return;
        //     }
        //     const jeux = (await response.json()) as Festival;
        //     console.log(jeux);
        // setJeux(jeux);
        // });
    }, [id]);


    const randomId = () => {
        return Math.random().toString(36).substr(2, 9);
    }




    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */



    const handleJeuxClick = () => {
        setJeuxOpen(!jeuxOpen);
    }


    const handleJeuClick = (id: string) => {
        navigator(`/detail-jeu/${id}`);
    }

    const inscriptionHandler = () => {
        navigator(`/inscription/${id}`);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */

    const createFestival = () => {
        if (!festival) return <p>Chargement...</p>
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-center border-2 p-3 rounded-lg gap-3  w-full">
                    <img src={festival.posterPath} alt={festival.title} />
                </div>
                <div className="flex flex-row justify-center">
                    <h2 className="font-bold text-2xl">
                        {festival.title}
                    </h2>
                </div>
                <div className="flex flex-row justify-center">
                    <p className="font-bold text-xl">
                        {festival.startDate} - {festival.endDate}
                    </p>
                </div>
                <p className="text-justify text-lg text-gray-200">
                    <strong>Description : </strong>{festival.description}
                </p>
                <div className="flex flex-row items-center text-xl">
                    <CiLocationOn />
                    <p>{festival.address}</p>
                </div>

                {createJeux()}

                {createInscription()}
            </div>
        )
    }

    const displayJeu = (jeu: Jeu) => {
        return (
            <div className="flex flex-row border-2 p-3 rounded-lg gap-3 max-w-96 bg-bleu-moyen">
                <div className="flex flex-col gap-4 ">
                    <h2 className="font-bold text-2xl">
                        {jeu.name}
                    </h2>
                    <div className="flex flex-row items-center text-xl">
                        <p>Editeur : {jeu.editor}</p>
                    </div>
                    <div className="flex flex-row items-center text-xl">
                        <p>Age minimum : {jeu.minAge}</p>
                    </div>
                    <p className="flex flex-row items-center text-xl">
                        <p>Durée : {jeu.duration}</p>
                    </p>
                    <p className="text-xl overflow-y-hidden w-60  truncate text-ellipsis">
                        Thème : {jeu.theme}
                    </p>
                    <p className="text-xl overflow-y-hidden w-60 truncate text-ellipsis">
                        Mécanique : {jeu.mechanics}
                    </p>
                    <p className="text-xl overflow-y-hidden w-60 truncate text-ellipsis">
                        Type : {jeu.type}
                    </p>
                    <p className="text-xl overflow-y-hidden w-60 truncate text-ellipsis">
                        Tags : {jeu.tags}
                    </p>
                </div>
                <IoIosLink  onClick={() => handleJeuClick(jeu.id)} size={40} />
            </div>
        )
    }

    const createJeux = () => {
        let jeuxAffichage = (<div className="flex flex-row items-center text-xl"> Chargement...</div>);

        if (jeux !== null && jeux.length === 0) {
            jeuxAffichage = (
                <div className="flex flex-row items-center text-xl">
                    <p>Aucuns jeux présent</p>
                </div>
            )
        }
        else if (jeux !== null && jeux.length > 0) {
            jeuxAffichage = (<>{jeux.map((jeu) => displayJeu(jeu))}</>)
        }


        return (
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-2xl" onClick={handleJeuxClick}>
                    Liste des jeux {" " + (jeuxOpen ? "▲" : "▼")}
                </h2>
                <div className={"flex-row border-2 p-3 rounded-lg gap-3 w-full overflow-y-auto " + (jeuxOpen ? "flex" : "hidden")} >
                    {jeuxAffichage}
                </div>
            </div>
        )
    }

    const createInscription = () => {
        return (
            <div className="flex flex-col gap-4">
                <button className="bg-vert-moyen hover:bg-vert-fonce text-white font-bold py-2 px-4 rounded text-xl" onClick={inscriptionHandler}>
                    Inscription
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full">
            {createFestival()}
        </div >
    )
}
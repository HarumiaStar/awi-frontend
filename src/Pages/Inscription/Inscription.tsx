import { useEffect, useState } from "react"
import { Api, APIFestival as Festival, APIJeu as Jeu, fillDateArray } from "../../Utils/Types";
import { useLocation, useNavigate } from "react-router-dom";
import { dummyCreneau } from "./dummyData";
import Postes from "./Postes/Postes";
import { APIPoste as poste, APIZoneAnimation as zoneAnimation, APICreneau as creneau } from "../../Utils/Types";
import Animations from "./Animation/Animations";



export default function Inscription() {


    /* ---------------------------------- DATA ---------------------------------- */

    const [creneaux, setCreneaux] = useState<creneau[]>([]);
    const [jours, setJours] = useState<Date[]>([]);


    /* --------------------------------- STATES --------------------------------- */

    const [poste_animations, setPoste_animations] = useState<"poste" | "animations">("poste");
    const [creneau_zone, setCrenau_zone] = useState<"creneau" | "zone">("creneau");
    const [jourActif, setJourActif] = useState<number>(0);

    /* -------------------------------- VARIABLES ------------------------------- */

    const location = useLocation();
    const navigator = useNavigate();

    const festivalId = location.pathname.split('/').pop();

    /* -------------------------------------------------------------------------- */
    /*                                  GET DATA                                  */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {

        const festivalData = Api.getInstance().getApi(`/festivals/${festivalId}`);

        festivalData.then(async (response) => {
            if (!response.body) {
                alert('No festival found');
                return;
            }
            const festival = (await response.json());
            // format : 11/02/2022
            
            const startData = festival.startDate.split('/'); // [11, 02, 2022] 
            const startDate = new Date(parseInt(startData[2]), parseInt(startData[1]) - 1, parseInt(startData[0])); // 11/02/2022

            const endData = festival.endDate.split('/'); // [11, 02, 2022]
            const endDate = new Date(parseInt(endData[2]), parseInt(endData[1]) - 1, parseInt(endData[0])); // 11/02/2022

            const jours = fillDateArray(startDate, endDate);
            setJours(jours);
        });



        // const creneauxData = Api.getInstance().getApi(`/creneaux`);

        // creneauxData.then(async (response) => {
        //     if (!response.body) {
        //         alert('No creneaux found');
        //         return;
        //     }
        //     const creneaux = (await response.json()) as creneau[];
        //     setCreneaux(creneaux);
        // }); 

        setCreneaux(dummyCreneau); // TODO : Remove this line and uncomment the previous one

    }, []);



    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */



    // const renderAnimation = (zone: zoneAnimation) => {
    //     return (
    //         <div className="flex flex-row justify-between">
    //             <h1>{zone.title}</h1>
    //             <p>{zone.capacity} / {zone.maxCapacity}</p>
    //         </div>
    //     )
    // }

    // const renderAnimations = () => {
    //     return (
    //         <div className="flex flex-col items-center gap-4">
    //             {zonesAnimations.map(renderAnimation)}
    //         </div>
    //     )
    // }

    const displayJour = (jour: Date, index: number) => {
        return (
            <button
                className={`border-2 p-2 rounded-md text-2xl ${jourActif === index ? "bg-vert-fonce" : "bg-vert-moyen"}`}
                onClick={() => setJourActif(index)}>
                {jour.toDateString()}
            </button>
        )
    }

    const renderJours = () => {
        return (
            <div className="flex flex-row gap-4">
                {jours.map((jour, index) => displayJour(jour, index))}
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center gap-4 p-5 w-full">

            {renderJours()}

            <div className="flex flex-row justify-around gap-12 w-full">
                <button
                    className={"border-2 p-2 rounded-m text-2xl " + (poste_animations === "poste" ? "bg-vert-fonce" : "bg-vert-moyen")}
                    onClick={() => setPoste_animations("poste")}
                >
                    Postes</button>
                <button
                    className={"border-2 p-2 rounded-m text-2xl " + (poste_animations === "animations" ? "bg-vert-fonce" : "bg-vert-moyen")}
                    onClick={() => setPoste_animations("animations")}
                >
                    Animations
                </button>
            </div>

            {
                poste_animations === "poste" ?
                    <Postes creneaux={creneaux} />
                    :
                    <Animations creneaux={creneaux} />
            }

        </div>
    )
}

function randomId() {
    return Math.random().toString(36).substring(7);
}
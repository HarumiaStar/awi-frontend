import { useEffect, useState } from "react"
import { Api, APIFestival as Festival, APIJeu as Jeu, fillDateArray } from "../../Utils/Types";
import { useLocation, useNavigate } from "react-router-dom";
import Postes from "./Postes/Postes";
import { APIPoste as poste, APIZoneAnimation as zoneAnimation, APICreneau as creneau } from "../../Utils/Types";
import Animations from "./Animation/Animations";
import { v4 } from "uuid";

type creneauData = {
    id: string,
    startTime: string, // format : 11/02/2022 10:00
    endTime: string, // format : 11/02/2022 10:00
}

const isCreneauInFestival = (creneau: creneauData, startDate: Date, endDate: Date) => {
    const creneauData = creneau.startTime.split(' ')[0];
    const startData = creneauData.split('/'); // [11, 02, 2022]
    const creneauDate = new Date(parseInt(startData[2]), parseInt(startData[1]) - 1, parseInt(startData[0])); // 11/02/2022
    return creneauDate >= startDate && creneauDate <= endDate;
}

const getIndex = (dates: Date[], date: Date) => {
    return dates.findIndex(d => {
        return d.getDay() === date.getDay() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    });
}

export default function Inscription() {


    /* ---------------------------------- DATA ---------------------------------- */

    const [creneaux, setCreneaux] = useState<creneau[][]>([[]]);
    const [jours, setJours] = useState<Date[]>([]);


    /* --------------------------------- STATES --------------------------------- */

    const [poste_animations, setPoste_animations] = useState<"poste" | "animations">("poste");
    const [jourActif, setJourActif] = useState<number>(0);

    /* -------------------------------- VARIABLES ------------------------------- */

    const location = useLocation();
    const navigator = useNavigate();

    const festivalId = location.pathname.split('/').pop();

    /* -------------------------------------------------------------------------- */
    /*                                  GET DATA                                  */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {

        let response = await Api.getInstance().getApi(`/festivals/${festivalId}`);

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



        response = await Api.getInstance().getApi(`/slots`);

        if (!response.body) {
            alert('No creneaux found');
            return;
        }
        const creneaux = (await response.json()) as creneauData[];

        // Split creneaux by day
        const creneauxByDay: creneau[][] = [];
        const creneauxInFestival = creneaux.filter(creneau => isCreneauInFestival(creneau, startDate, endDate));
        console.log(jours)
        jours.forEach((jour, index) => {
            creneauxByDay[index] = [];
        });

        console.log("creneauxByDay : ", creneauxByDay)
        creneauxInFestival.forEach(creneau => {
            const creneauParsed = creneau.startTime.split(' ')[0];
            const startData = creneauParsed.split('/'); 
            console.log(startData);
            const creneauDate = new Date(parseInt(startData[2]), parseInt(startData[1]) - 1, parseInt(startData[0])); 
            const index = getIndex(jours, creneauDate);

            const start = creneau.startTime.split(' ')[1];
            const end = creneau.endTime.split(' ')[1];
            creneauxByDay[index].push({
                id: creneau.id,
                start: start,
                end: end,
                date: creneauDate
            });
        });

        console.log("creneauxByDay : ", creneauxByDay)
        console.log("jours : ", jours)


        setCreneaux(creneauxByDay);
        setJours(jours);

    }


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
                onClick={() => setJourActif(index)} key={v4()}>
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
                    <Postes creneaux={creneaux[jourActif]} />
                    :
                    <Animations creneaux={creneaux[jourActif]} />
            }

        </div>
    )
}

function randomId() {
    return Math.random().toString(36).substring(7);
}
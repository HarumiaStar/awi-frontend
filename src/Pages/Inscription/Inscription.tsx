import { useEffect, useState } from "react"
import { Api, APIFestival as Festival, APIJeu as Jeu } from "../../Utils/Types";
import { useLocation, useNavigate } from "react-router-dom";

type poste = {
    id: string;
    title: string;
    description: string;
    capacity: number;
    maxCapacity: number;
    animation: boolean;
}

type zoneAnimation = {
    id: string;
    title: string;
    description: string;
    capacity: number;
    maxCapacity: number;
}

type creneau = {
    id: string;
    start: string;
    end: string;
}


export default function Inscription() {


    /* ---------------------------------- DATA ---------------------------------- */

    const [postes, setPostes] = useState<poste[]>([]);
    const [zonesAnimations, setZonesAnimations] = useState<zoneAnimation[]>([]);
    const [jeux, setJeux] = useState<Jeu[]>([]);
    const [creneaux, setCreneaux] = useState<creneau[]>([]);


    /* --------------------------------- STATES --------------------------------- */

    const [poste_animations, setPoste_animations] = useState<"poste" | "animations">("poste");
    const [crenaau_zone, setCrenau_zone] = useState<"creneau" | "zone">("creneau");

    /* -------------------------------- VARIABLES ------------------------------- */

    const location = useLocation();
    const navigator = useNavigate();

    const festivalId = location.pathname.split('/').pop();

    /* -------------------------------------------------------------------------- */
    /*                                  GET DATA                                  */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        const creneauxData = Api.getInstance().getApi(`/creneaux`);

        creneauxData.then(async (response) => {
            if (!response.body) {
                alert('No creneaux found');
                return;
            }
            const creneaux = (await response.json()) as creneau[];
            setCreneaux(creneaux);
        });

        const postesData = Api.getInstance().getApi(`/zones`);

        postesData.then(async (response) => {
            if (!response.body) {
                alert('No zones found');
                return;
            }
            const allZones = (await response.json()) as poste[];

            // if animation is true, then it's a zone animation else it's a poste

            const zones = allZones.filter(zone => zone.animation);
            const postes = allZones.filter(zone => !zone.animation);

            setZonesAnimations(zones);
            setPostes(postes);
        });


        const jeuxData = Api.getInstance().getApi(`/jeux`);

        jeuxData.then(async (response) => {
            if (!response.body) {
                alert('No jeux found');
                return;
            }
            const jeux = (await response.json()) as Jeu[];
            setJeux(jeux);
        });

    }, []);



    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */

    const renderPoste = (poste: poste) => {
        return (
            <div>
                <h1>{poste.title}</h1>
                <p>{poste.description}</p>
                <p>{poste.capacity} / {poste.maxCapacity}</p>
            </div>
        )
    }


    const renderPostes = () => {
        return (
            <div className="flex flex-col items-center gap-4">
                {postes.map(renderPoste)}
            </div>
        )
    }


    const renderAnimation = (zone: zoneAnimation) => {
        return (
            <div>
                <h1>{zone.title}</h1>
                <p>{zone.description}</p>
                <p>{zone.capacity} / {zone.maxCapacity}</p>
            </div>
        )
    }

    const renderAnimations = () => {
        return (
            <div className="flex flex-col items-center gap-4">
                {zonesAnimations.map(renderAnimation)}
            </div>
        )
    }

    /**
     * General display : 
     * 
     * <button>Postes</button> <button>Animations</button>
     * <button>Creneaux</button> <button>Zones | animation</button> // Depending on post or animation
     * - creneaux
     * -- zones | animations
     * -- zones | animations
     * -- zones | animations
     * 
     * - creneaux
     * -- zones | animations
     * -- zones | animations
     */

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-row justify-between">
                <button onClick={() => setPoste_animations("poste")}>Postes</button>
                <button onClick={() => setPoste_animations("animations")}>Animations</button>
            </div>

            <div className="flex flex-row justify-between">
                <button onClick={() => setCrenau_zone("creneau")}>Creneaux</button>
                <button onClick={() => setCrenau_zone("zone")}>Zones | animations</button>
            </div>

            {poste_animations === "poste" ? renderPostes() : renderAnimations()}

        </div>
    )
}
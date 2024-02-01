import { useState } from "react";
import { DonneesFestival } from "../DonneesFestival";
import { creneauToString, dateToStringFr } from "../../../Utils/Types";

export type RecapitulatifProps = {
    donneesFestival: DonneesFestival;
}


export default function Recapitulatif({ donneesFestival }: RecapitulatifProps) {

    // State
    const [activiteOpen, setActiviteOpen] = useState(false);
    const [creneauOpen, setCreneauOpen] = useState(false);
    const [jeuOpen, setJeuOpen] = useState(false);
    const [zoneOpen, setZoneOpen] = useState(false);

    // Variables
    const nomFestival = donneesFestival.nomFestival;
    const dateDebut = donneesFestival.dateDebut;
    const dateFin = donneesFestival.dateFin;
    const lieuFestival = donneesFestival.lieuFestival
    const description = donneesFestival.description;
    const activites = donneesFestival.activites;
    const creneaux = donneesFestival.joursCreneaux;
    const jeux = donneesFestival.jeux;
    const zones = donneesFestival.zones;




    return (
        <div className='flex flex-col w-full h-full border-2 border-gray-400 rounded-lg px-6 my-5'>
            <h1 className='text-4xl font-bold text-center'>
                Recapitulatif
            </h1>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-row'>
                    <h2 className='text-2xl font-bold'>
                        Nom du festival :
                    </h2>
                    <p className='text-xl ml-2'>
                        {nomFestival}
                    </p>
                </div>
                <div className='flex flex-row'>
                    <h2 className='text-2xl font-bold'>
                        Date du festival :
                    </h2>
                    <p className='text-xl ml-2'>
                        {dateToStringFr(dateDebut)} - {dateToStringFr(dateFin)}
                    </p>
                </div>
                <div className='flex flex-row'>
                    <h2 className='text-2xl font-bold'>
                        Lieu du festival :
                    </h2>
                    <p className='text-xl ml-2'>
                        {lieuFestival}
                    </p>
                </div>
                <div className='flex flex-row'>
                    <h2 className='text-2xl font-bold'>
                        Description :
                    </h2>
                    <p className='text-xl ml-2'>
                        {description}
                    </p>
                </div>
                <div className='flex flex-col' >
                    <h2 className='text-xl font-bold cursor-pointer' onClick={() => setActiviteOpen(!activiteOpen)}>
                        Activités :
                    </h2>
                    <div className={`${activiteOpen ? 'block' : 'hidden'}`} >
                        {activites.map((activite, index) => (
                            <p key={index} className='text-xl ml-2'>
                                {activite}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-xl font-bold cursor-pointer' onClick={() => setCreneauOpen(!creneauOpen)}>
                        Créneaux :
                    </h2>
                    <div
                        className={`${creneauOpen ? 'flex flex-col' : 'hidden'}`}

                    >
                        {creneaux.map((creneau, index) => (
                            <div key={index} className='flex flex-row'>
                                <p className='text-xl ml-2'>
                                    {creneau.getDateString()}
                                </p>
                                <div className="flex flex-col">
                                    {creneau.getCreneaux().map((creneau, index) => (
                                        <div key={index} className='flex flex-row'>
                                            <p className='text-xl ml-2'>
                                                {creneauToString(creneau)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-xl font-bold cursor-pointer' onClick={() => setJeuOpen(!jeuOpen)}>
                        Jeux :
                    </h2>
                    <div className={jeuOpen ? 'flex flex-col' : "hidden"} >
                        <div className='flex flex-row justify-between hover:bg-lighter-200 p-1 rounded-md'>
                            <p className='text-xl ml-2 underline font-bold'>
                                Nom
                            </p>
                            <p className='text-xl ml-2 underline font-bold'>
                                ID
                            </p>
                        </div>
                        {jeux.map((jeu, index) => (
                            <div key={index} className='flex flex-row justify-between hover:bg-lighter-200 p-1 rounded-md'>
                                <p className='text-xl ml-2'>
                                    {jeu.nom}
                                </p>
                                <p className='text-xl ml-2'>
                                    {jeu.idJeu}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-xl font-bold cursor-pointer' onClick={() => setZoneOpen(!zoneOpen)}>
                        Zones :
                    </h2>
                    <div className={zoneOpen ? 'flex flex-col' : "hidden"} >
                        {zones.map((zone, index) => (
                            <div key={index} className='flex flex-col hover:bg-lighter-200 p-1 rounded-md'>
                                <p className='text-xl ml-2 underline font-bold'>
                                    {zone.nom}
                                </p>

                                {zone.zonesBenevoles.map((zoneBenevole, index) => (
                                    <div key={index} className='flex flex-row pl-3'>
                                        <p className='text-xl ml-2'>
                                            -{zoneBenevole}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
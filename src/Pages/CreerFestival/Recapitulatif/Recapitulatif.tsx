import { useState } from "react";
import { DonneesFestival } from "../DonneesFestival";
import { dateToStringFr } from "../../../Utils/Types";

export type RecapitulatifProps = {
    donneesFestival: DonneesFestival;
}


export default function Recapitulatif({ donneesFestival }: RecapitulatifProps) {

    // State
    const [activiteOpen, setActiviteOpen] = useState(false);

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
                <div className='flex flex-col' onClick={() => setActiviteOpen(!activiteOpen)}>
                    <h2 className='text-xl font-bold'>
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
            </div>
        </div>
    )
}
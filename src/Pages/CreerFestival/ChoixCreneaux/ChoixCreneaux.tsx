import React, {  useReducer } from 'react';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 } from 'uuid';
import { DonneesFestival } from '../DonneesFestival';
import { Creneau } from '../../../Utils/Types';


export type ChoixCreneauxProps = {
    donneesFestival: DonneesFestival;
}

export type ChoixCreneauxRef = {
    update(): void;
}

const ChoixCreneaux = React.forwardRef(({ donneesFestival }: ChoixCreneauxProps, ref: React.Ref<ChoixCreneauxRef>) => {
    const [indexJourActif, setIndexJourActif] = useState(0);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const creneauxActifs = donneesFestival.joursCreneaux[indexJourActif].getCreneaux();


    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */

    const choixJourHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const index = parseInt(event.currentTarget.dataset.index as string);

        if (index !== indexJourActif) {
            setIndexJourActif(index);
        }
    }

    const ajouterCreneauHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const heureDebut = (document.getElementById('heureDebut') as HTMLInputElement).value;
        const heureFin = (document.getElementById('heureFin') as HTMLInputElement).value;

        if (heureDebut === '' || heureFin === '') {
            alert('Veuillez remplir tous les champs');
            return;
        }

        if (heureDebut > heureFin) {
            alert('L\'heure de début doit être avant l\'heure de fin : ' + heureDebut + ' - ' + heureFin);
            return;
        }

        const heureDebutSplit = heureDebut.split(':');
        const heureFinSplit = heureFin.split(':');

        const heureDebutInt = parseInt(heureDebutSplit[0]);
        const minuteDebutInt = parseInt(heureDebutSplit[1]);
        const heureFinInt = parseInt(heureFinSplit[0]);
        const minuteFinInt = parseInt(heureFinSplit[1]);

        donneesFestival.ajouterCreneau(indexJourActif, heureDebutInt, minuteDebutInt, heureFinInt, minuteFinInt); 
        forceUpdate(); 
    }

    const handleSuppressionCreneau = (creneau: Creneau) => {
        donneesFestival.supprimerCreneau(indexJourActif, creneau);
        forceUpdate(); 
    }

    React.useImperativeHandle(ref, () => ({
        update() {
            forceUpdate();
        }
    }));

    /* -------------------------------------------------------------------------- */
    /*                                FIN HANDLERS                                */
    /* -------------------------------------------------------------------------- */


    /* -------------------------------------------------------------------------- */
    /*                            CONSTRUCTION RESULTAT                           */
    /* -------------------------------------------------------------------------- */

    const createButtonJour = (label: string, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, index: number) => {
        return (
            <button
                className={'px-3 py-1.5 text-sm  duration-150 rounded-lg hover:bg-indigo-100 active:bg-indigo-200' + (index === indexJourActif ? ' bg-indigo-400 text-black' : ' bg-indigo-50 text-indigo-600')}
                onClick={onClick}
                key={v4()}
                data-index={index}
            >
                {label}
            </button>
        )
    }


    const createCreneau = (creneau: Creneau) => {
        const minutesDebut = creneau.heureDebut.getMinutes().toString().padStart(2, '0');
        const minutesFin = creneau.heureFin.getMinutes().toString().padStart(2, '0');
        return (
            <div className='flex gap-5 justify-center items-center flex-row' key={v4()} >
                <div className='flex gap-5 justify-center items-center flex-row'>
                    {creneau.heureDebut.getHours()}h{minutesDebut} - {creneau.heureFin.getHours()}h{minutesFin}
                </div>
                <button
                    onClick={() => handleSuppressionCreneau(creneau)}
                    className='px-3 py-1.5 text-sm text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200'
                >
                    <FaTrashAlt />
                </button>
            </div>
        )
    }

    /* -------------------------------------------------------------------------- */
    /*                          FIN CONSTRUCTION RESULTAT                         */
    /* -------------------------------------------------------------------------- */

    return (
        <>
            <h2 className='font-extrabold text-2xl'>Gestion des créneaux</h2>
            <div className='flex flex-col gap-5 justify-center items-center mt-10'>
                <div className='flex gap-5 items-center max-w-96 overflow-y-auto p-3'>
                    {donneesFestival.joursCreneaux.map((jour, index) => (createButtonJour(jour.getDateString(), choixJourHandler, index)))}
                </div>
                <h3 className='font-bold text-xl'>
                    Créneaux du {donneesFestival.joursCreneaux[indexJourActif].getDateString()}
                </h3>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    {creneauxActifs.map((creneau) => (createCreneau(creneau)))}
                </div>
                <h3>Création des créneaux</h3>
                <div className='flex gap-5 justify-center items-center'>
                    <input type="time" name='heureDebut' id='heureDebut' />
                    -
                    <input type="time" name='heureFin' id='heureFin' />
                    <button onClick={ajouterCreneauHandler} className='px-3 py-1.5 text-sm text-green-600 duration-150 bg-green-50 rounded-lg hover:bg-green-100 active:bg-green-200'>
                        Ajouter
                    </button>
                </div>

            </div>
        </>
    )
});

export default ChoixCreneaux;
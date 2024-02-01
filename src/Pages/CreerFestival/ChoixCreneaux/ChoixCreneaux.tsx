import React from 'react';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 } from 'uuid';
// import styles from './ChoixCreneaux.module.css';

export type creneau = {
    heureDebut: Date,
    heureFin: Date,
}
function creneauxChevauchement(slot1: creneau, slot2: creneau): boolean {
    // renvoi true si les créneaux se chevauchent sans prendre en compte si la fin du créneau 1 est égale au début du créneau 2 et vice versa
    // si début créneau 1 est entre début et fin créneau 2
    if (slot1.heureDebut >= slot2.heureDebut && slot1.heureDebut < slot2.heureFin) {
        return true;
    }

    // si fin créneau 1 est entre début et fin créneau 2
    if (slot1.heureFin > slot2.heureDebut && slot1.heureFin <= slot2.heureFin) {
        return true;
    }

    // si début créneau 2 est entre début et fin créneau 1
    if (slot2.heureDebut >= slot1.heureDebut && slot2.heureDebut < slot1.heureFin) {
        return true;
    }

    // si fin créneau 2 est entre début et fin créneau 1
    if (slot2.heureFin > slot1.heureDebut && slot2.heureFin <= slot1.heureFin) {
        return true;
    }

    return false;
  }

export class Jour {
    date: Date;
    creneaux: creneau[];

    constructor(date: Date, creneaux: creneau[]) {
        this.date = date;
        this.creneaux = creneaux;
    }

    ajouterCreneauHeureMinute(heureDebut: number, minuteDebut: number, heureFin: number, minuteFin: number) {
        const creneau = {
            heureDebut: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), heureDebut, minuteDebut),
            heureFin: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), heureFin, minuteFin)
        }

        // Faire une vérification si le créneau est déjà présent ou s'il y a un chevauchement
        for (let i = 0; i < this.creneaux.length; i++) {
            const creneauActuel = this.creneaux[i];
            if (creneauxChevauchement(creneauActuel, creneau)) {
                alert('Le créneau se chevauche avec un créneau existant');
                return;
            }
        }

        this.creneaux.push(creneau);
    }

    ajouterCreneau(creneau: creneau) {
        this.creneaux.push(creneau);
    }

    supprimerCreneau(creneau: creneau) {
        this.creneaux = this.creneaux.filter((c) => c !== creneau);
    }

    getCreneaux() {
        return this.creneaux;
    }

    getDateString() {
        const format = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });

        return format.format(this.date);
    }
}


export type CreaneauRefType = {
	getData: () => Jour[];
};

export const ChoixCreneaux = React.forwardRef((_,ref : React.Ref<CreaneauRefType>) => {


    // remplir les créneaux par jour par les jours 



    const creneauxParDefaut = [
        {
            heureDebut: "10:00",
            heureFin: "11:40"
        },
        {
            heureDebut: "11:40",
            heureFin: "16:00"
        },
        {
            heureDebut: "18:00",
            heureFin: "20:00"
        },
    ];

    const joursBase = [ // TODO : remplacer par les jours du festival
        new Jour(new Date(2021, 5, 1), []),
        new Jour(new Date(2021, 5, 2), []),
        new Jour(new Date(2021, 5, 3), []),
    ];

    joursBase.forEach(jour => {
        creneauxParDefaut.forEach(creneau => {
            const heureDebut = parseInt(creneau.heureDebut.split(':')[0]);
            const minuteDebut = parseInt(creneau.heureDebut.split(':')[1]);
            const heureFin = parseInt(creneau.heureFin.split(':')[0]);
            const minuteFin = parseInt(creneau.heureFin.split(':')[1]);
            jour.ajouterCreneauHeureMinute(heureDebut, minuteDebut, heureFin, minuteFin);
        });
    });

    const [jours] = useState<Jour[]>(joursBase);
    const [indexJourActif, setIndexJourActif] = useState(0);
    const [creneauxActifs, setCreneauxActifs] = useState<creneau[]>(jours[indexJourActif].getCreneaux());

    const choixJourHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const index = parseInt(event.currentTarget.dataset.index as string);

        if (index !== indexJourActif) {
            setIndexJourActif(index);
            setCreneauxActifs(jours[index].getCreneaux());
        }
    }

    const supprimerCreneauHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log("Supprimer créneau");
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
            alert('L\'heure de début doit être avant l\'heure de fin');
            return;
        }

        const heureDebutSplit = heureDebut.split(':');
        const heureFinSplit = heureFin.split(':');

        const heureDebutInt = parseInt(heureDebutSplit[0]);
        const minuteDebutInt = parseInt(heureDebutSplit[1]);
        const heureFinInt = parseInt(heureFinSplit[0]);
        const minuteFinInt = parseInt(heureFinSplit[1]);

        const jourActif = jours[indexJourActif];

        jourActif.ajouterCreneauHeureMinute(heureDebutInt, minuteDebutInt, heureFinInt, minuteFinInt);

        setCreneauxActifs([...jourActif.getCreneaux()]);
    }

    const createButtonJour = (label: string, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, index: number) => {
        return (
            <button
                className='px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200'
                onClick={onClick}
                key={v4()}
                data-index={index}
            >
                {label}
            </button>
        )
    }


    const createCreneau = (creneau: creneau) => {
        const minutesDebut = creneau.heureDebut.getMinutes().toString().padStart(2, '0');
        const minutesFin = creneau.heureFin.getMinutes().toString().padStart(2, '0');
        return (
            <div className='flex gap-5 justify-center items-center flex-row' key={v4()} >
                <div className='flex gap-5 justify-center items-center flex-row'>
                    {creneau.heureDebut.getHours()}h{minutesDebut} - {creneau.heureFin.getHours()}h{minutesFin}
                </div>
                <button onClick={supprimerCreneauHandler} className='px-3 py-1.5 text-sm text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200'>
                    <FaTrashAlt />
                </button>
            </div>
        )
    }

    const getData = () => {
        return jours
    }

    React.useImperativeHandle(ref, () => ({
        getData: getData
    }));


    return (
        <>
            <h2 className='font-extrabold text-2xl'>Gestion des créneaux</h2>
            <div className='flex flex-col gap-5 justify-center items-center mt-10'>
                <div className='flex gap-5 justify-center items-center'>
                    {jours.map((jour, index) => (createButtonJour(jour.getDateString(), choixJourHandler, index)))}
                </div>
                <h3 className='font-bold text-xl'>
                    Créneaux du {jours[indexJourActif].getDateString()}
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


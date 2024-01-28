import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
// import styles from './ChoixCreneaux.module.css';

type creneau = {
    heureDebut: Date,
    heureFin: Date,
}

class Jour {
    date: Date;
    creneaux: creneau[];

    constructor(date: Date, creneaux: creneau[]) {
        this.date = date;
        this.creneaux = creneaux;
    }

    ajouterCreneauHeureMinute(heureDebut: number, minuteDebut: number, heureFin: number, minuteFin: number) {
        let creneau = {
            heureDebut: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), heureDebut, minuteDebut),
            heureFin: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), heureFin, minuteFin)
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
export default function ChoixCreneaux() {

    const joursBase = [
        new Jour(new Date(2021, 5, 1), []),
        new Jour(new Date(2021, 5, 2), []),
        new Jour(new Date(2021, 5, 3), []),
    ];

    const [jours, setJours] = useState<Jour[]>(joursBase);

    const choixJourHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Choix jour");
    }

    const supprimerCreneauHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Supprimer créneau");
    }

    const ajouterCreneauHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const heureDebut = (document.getElementById('heureDebut') as HTMLInputElement).value;
        const heureFin = (document.getElementById('heureFin') as HTMLInputElement).value;

        if (heureDebut === '' || heureFin === '') {
            alert('Veuillez remplir tous les champs');
        }

        if (heureDebut > heureFin) {
            alert('L\'heure de début doit être avant l\'heure de fin');
        }
    }

    const createButtonJour = (label: string, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => {
        return (
            <button className='px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200' onClick={onClick}>{label}</button>
        )
    }

    const createCreneau = (creneau: creneau) => {
        const minutesDebut = creneau.heureDebut.getMinutes().toString().padStart(2, '0');
        const minutesFin = creneau.heureFin.getMinutes().toString().padStart(2, '0');
        return (
            <div className='flex gap-5 justify-center items-center flex-row'>
                <div className='flex gap-5 justify-center items-center flex-row'>
                    {creneau.heureDebut.getHours()}h{minutesDebut} - {creneau.heureFin.getHours()}h{minutesFin}
                </div>
                <button onClick={supprimerCreneauHandler} className='px-3 py-1.5 text-sm text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200'>
                    <FaTrashAlt />
                </button>
            </div>
        )
    }



    return (
        <>
            <h2 className='font-extrabold text-2xl'>Gestion des créneaux</h2>
            <div className='flex flex-col gap-5 justify-center items-center mt-10'>
                <div className='flex gap-5 justify-center items-center'>
                    {jours.map((jour, index) => (createButtonJour(jour.getDateString(), choixJourHandler)))}
                </div>
                <h3 className='font-bold text-xl'>
                    Affichage des créneaux
                </h3>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    {createCreneau({ heureDebut: new Date(2021, 5, 1, 10, 0), heureFin: new Date(2021, 5, 1, 12, 0) })}
                    {createCreneau({ heureDebut: new Date(2021, 5, 1, 14, 0), heureFin: new Date(2021, 5, 1, 16, 0) })}
                    {createCreneau({ heureDebut: new Date(2021, 5, 1, 16, 0), heureFin: new Date(2021, 5, 1, 18, 0) })}
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
}
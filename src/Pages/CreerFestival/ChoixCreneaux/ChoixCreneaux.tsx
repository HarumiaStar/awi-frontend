import { FaTrashAlt } from 'react-icons/fa';
import styles from './ChoixCreneaux.module.css';

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
}

export default function ChoixCreneaux() {

    const choixJourHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Choix jour");
    }

    const supprimerCreneauHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Supprimer créneau");
    }

    const ajouterCreneauHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Ajouter créneau");
    }

    
    return (
        <div className={styles.container}>
            <h2>Gestion des créneaux</h2>
            <div className={styles.creneauxContainer}>
                <div className={styles.choixJours}>
                    <button>Lundi</button>
                    <button>Mardi</button>
                    <button>Mercredi</button>
                    {/* TODO Ajouter la gestion des jours */}
                </div>
                <h3>Affichage des créneaux</h3>
                <div className={styles.affichageCreneaux}>
                    <div className={styles.creneau}>
                        <div className={styles.creneauHeure}>10h00 - 12h00</div>
                        <FaTrashAlt />
                    </div>
                    <div className={styles.creneau}>
                        <div className={styles.creneauHeure}>10h00 - 12h00</div>
                        <FaTrashAlt />
                    </div>
                    <div className={styles.creneau}>
                        <div className={styles.creneauHeure}>10h00 - 12h00</div>
                        <FaTrashAlt />
                    </div>

                    {/* TODO Ajouter la gestion des créneaux */}
                </div>
                <h3>Création des créneaux</h3>
                <div className={styles.creationCreneaux}>
                    <input type="time" name='heureDebut' id='heureDebut' />
                     -
                    <input type="time" name='heureFin' id='heureFin' />
                    <button>Ajouter</button>
                    {/* TODO Ajouter la gestion des créneaux */}
                </div>

            </div>
        </div>
    )
}
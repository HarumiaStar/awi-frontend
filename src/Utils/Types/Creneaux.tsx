export enum DefaultCreneaux {
    MATIN = "MATIN",
    MIDI = "MIDI",
    APRES_MIDI = "APRES-MIDI",
    SOIREE = "SOIREE",
    DEPART = "DEPART"
}

export const DefaultCreneauxList = [
    DefaultCreneaux.MATIN,
    DefaultCreneaux.MIDI,
    DefaultCreneaux.APRES_MIDI,
    DefaultCreneaux.SOIREE,
    DefaultCreneaux.DEPART
]

export type Creneau = {
    heureDebut: Date,
    heureFin: Date,
}

export function prepareCreneauExport(heure: Date): string {
    // Format : dd/MM/yyyy HH:mm 
    const format = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return format.format(heure);
}

export class Jour {
    date: Date;
    creneaux: Creneau[];

    constructor(date: Date, creneaux: Creneau[]) {
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
                alert(
                    'Un créneau actuel : ' +
                    creneauActuel.heureDebut.getHours() + ':' + creneauActuel.heureDebut.getMinutes() +
                    ' - ' +
                    creneauActuel.heureFin.getHours() + ':' + creneauActuel.heureFin.getMinutes() +
                    ' se chevauche avec le créneau souhaité : ' +
                    creneau.heureDebut.getHours() + ':' + creneau.heureDebut.getMinutes() +
                    ' - ' +
                    creneau.heureFin.getHours() + ':' + creneau.heureFin.getMinutes()
                );
                return;
            }
        }

        this.creneaux.push(creneau);
    }

    ajouterCreneau(creneau: Creneau) {
        this.creneaux.push(creneau);
    }

    supprimerCreneau(creneau: Creneau) {
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



export function creneauxChevauchement(slot1: Creneau, slot2: Creneau): boolean {
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

export function creneauToString(creneau: Creneau): string {
    return creneau.heureDebut.getHours() + ':' + creneau.heureDebut.getMinutes() + ' - ' + creneau.heureFin.getHours() + ':' + creneau.heureFin.getMinutes();
}
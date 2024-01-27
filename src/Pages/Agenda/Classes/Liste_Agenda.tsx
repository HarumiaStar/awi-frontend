import { Creneaux } from "../../../Utils/Types/Creneaux";
import SmallDate from "../../../Utils/Types/SmallDate";
import { ThreeDMap, TwoDMap } from "../../../Utils/Types/ThreeDMap";
import { Activite_Agenda } from "./Activite_Agenda";



export class Liste_agenda {
    private _liste: ThreeDMap<string, SmallDate, Creneaux, number> = new ThreeDMap();

    constructor() {}

    // liste des activités pour une date donnée
    public getListe(date_targeted : SmallDate): Activite_Agenda[] {
        const liste: Activite_Agenda[] = [];
        this.getByDate(date_targeted)?.getMapWithFirstDimension().forEach((value, key) => {
            liste.push(new Activite_Agenda(key, value, date_targeted));
        });
        return liste;
    }

    public getActivite(nom: string, date_targeted : SmallDate): Activite_Agenda | undefined {
        const activite = this._liste.get2DByA().get(nom);
        if (activite) {
            const creneaux = activite.getMapWithFirstDimension().get(date_targeted);
            if (creneaux) {
                return new Activite_Agenda(nom, creneaux, date_targeted);
            }
        }
        return undefined;
    }

    public addActivite(activite: Activite_Agenda): void {
        this._liste.set(activite.nom, activite.date, Creneaux.MATIN, activite.getCreneau(Creneaux.MATIN));
        this._liste.set(activite.nom, activite.date, Creneaux.MIDI, activite.getCreneau(Creneaux.MIDI));
        this._liste.set(activite.nom, activite.date, Creneaux.APRES_MIDI, activite.getCreneau(Creneaux.APRES_MIDI));
        this._liste.set(activite.nom, activite.date, Creneaux.SOIREE, activite.getCreneau(Creneaux.SOIREE));
        this._liste.set(activite.nom, activite.date, Creneaux.DEPART, activite.getCreneau(Creneaux.DEPART));
    }

    public addActiviteMap(nom: string, creneaux: Map<Creneaux, number>): void {
        this._liste.set(nom, new SmallDate(10,10,2010), Creneaux.MATIN, creneaux.get(Creneaux.MATIN) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), Creneaux.MIDI, creneaux.get(Creneaux.MIDI) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), Creneaux.APRES_MIDI, creneaux.get(Creneaux.APRES_MIDI) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), Creneaux.SOIREE, creneaux.get(Creneaux.SOIREE) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), Creneaux.DEPART, creneaux.get(Creneaux.DEPART) || 0);
    }

    public removeActivite(nom: string): void {
        this._liste.get2DByA().delete(nom);
    }

    public mapDate<U>(date_targeted: SmallDate, callbackfn: (value: [string, Map<Creneaux, number>], index: number, array: [string, Map<Creneaux, number>][]) => U, thisArg?: any): U[] {
        const liste: [string, Map<Creneaux, number>][] = [];
        this.getByDate(date_targeted)?.getMapWithFirstDimension().forEach((value, key) => {
            liste.push([key, value]);
        });
        return liste.map(callbackfn, thisArg);
    }

    private getByDate(date_targeted: SmallDate): TwoDMap<string, Creneaux, number> | undefined {
        const listesByDates = this._liste.get2DByB();
        listesByDates.forEach((value, current_date) => {
            if (current_date.equals(date_targeted)) {
                return value;
            }
        });
        return undefined;
    }

    public get allDates(): SmallDate[] {
        const liste: SmallDate[] = [];
        this._liste.get2DByB().forEach((_, key) => {
            liste.push(key);
        });
        return liste;
    }

    public get liste(): ThreeDMap<string, SmallDate, Creneaux, number> {
        return this._liste;
    }

    

}
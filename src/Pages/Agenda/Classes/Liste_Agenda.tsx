import { DefaultCreneaux } from "../../../Utils/Types";
import SmallDate from "../../../Utils/Types/SmallDate";
import { ThreeDMap, TwoDMap } from "../../../Utils/Types/ThreeDMap";
import { Activite_Agenda } from "./Activite_Agenda";



export class Liste_agenda {
    private _liste: ThreeDMap<string, SmallDate, DefaultCreneaux, number> = new ThreeDMap();

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
        this._liste.set(activite.nom, activite.date, DefaultCreneaux.MATIN, activite.getCreneau(DefaultCreneaux.MATIN));
        this._liste.set(activite.nom, activite.date, DefaultCreneaux.MIDI, activite.getCreneau(DefaultCreneaux.MIDI));
        this._liste.set(activite.nom, activite.date, DefaultCreneaux.APRES_MIDI, activite.getCreneau(DefaultCreneaux.APRES_MIDI));
        this._liste.set(activite.nom, activite.date, DefaultCreneaux.SOIREE, activite.getCreneau(DefaultCreneaux.SOIREE));
        this._liste.set(activite.nom, activite.date, DefaultCreneaux.DEPART, activite.getCreneau(DefaultCreneaux.DEPART));
    }

    public addActiviteMap(nom: string, creneaux: Map<DefaultCreneaux, number>): void {
        this._liste.set(nom, new SmallDate(10,10,2010), DefaultCreneaux.MATIN, creneaux.get(DefaultCreneaux.MATIN) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), DefaultCreneaux.MIDI, creneaux.get(DefaultCreneaux.MIDI) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), DefaultCreneaux.APRES_MIDI, creneaux.get(DefaultCreneaux.APRES_MIDI) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), DefaultCreneaux.SOIREE, creneaux.get(DefaultCreneaux.SOIREE) || 0);
        this._liste.set(nom, new SmallDate(10,10,2010), DefaultCreneaux.DEPART, creneaux.get(DefaultCreneaux.DEPART) || 0);
    }

    public removeActivite(nom: string): void {
        this._liste.get2DByA().delete(nom);
    }

    public mapDate<U>(date_targeted: SmallDate, callbackfn: (value: [string, Map<DefaultCreneaux, number>], index: number, array: [string, Map<DefaultCreneaux, number>][]) => U, thisArg?: unknown): U[] {
        const liste: [string, Map<DefaultCreneaux, number>][] = [];
        this.getByDate(date_targeted)?.getMapWithFirstDimension().forEach((value, key) => {
            liste.push([key, value]);
        });
        return liste.map(callbackfn, thisArg);
    }

    private getByDate(date_targeted: SmallDate): TwoDMap<string, DefaultCreneaux, number> | undefined {
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

    public get liste(): ThreeDMap<string, SmallDate, DefaultCreneaux, number> {
        return this._liste;
    }

    

}
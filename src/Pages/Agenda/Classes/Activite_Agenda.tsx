import { Creneaux } from "../../../Utils/Types/Creneaux";
import SmallDate from "../../../Utils/Types/SmallDate";

export class Activite_Agenda {
    private _nom: string;
    private _date: SmallDate;
    private _creneaux: Map<Creneaux, number>;

    constructor(nom: string, creneaux: Map<Creneaux, number>, date: SmallDate) {
        this._nom = nom;
        this._date = date;
        if (creneaux) {
            this._creneaux = creneaux;
        } else {
            this._creneaux = new Map<Creneaux, number>();
            this._creneaux.set(Creneaux.MATIN, 0);
            this._creneaux.set(Creneaux.MIDI, 0);
            this._creneaux.set(Creneaux.APRES_MIDI, 0);
            this._creneaux.set(Creneaux.SOIREE, 0);
            this._creneaux.set(Creneaux.DEPART, 0);
        }
    }

    get nom(): string {
        return this._nom;
    }

    get creneaux(): Map<Creneaux, number> {
        return this._creneaux;
    }

    public getCreneau(creneau: Creneaux): number {
        return this._creneaux.get(creneau) || 0;
    }

    public setCreneau(creneau: Creneaux, value: number): void {
        this._creneaux.set(creneau, value);
    }

    public set nom(value: string) {
        this._nom = value;
    }

    public set creneaux(value: Map<Creneaux, number>) {
        this._creneaux = value;
    }

    public map<U>(callbackfn: (value: [Creneaux, number], index: number, array: [Creneaux, number][]) => U, thisArg?: any): U[]{
        return Array.from(this._creneaux).map(callbackfn, thisArg);
    }

    public clone(): Activite_Agenda {
        const result = new Activite_Agenda(this._nom, this._creneaux, this._date);
        return result;
    }

    public get date(): SmallDate {
        return this._date;
    }

    public set date(value: SmallDate) {
        this._date = value;
    }
}
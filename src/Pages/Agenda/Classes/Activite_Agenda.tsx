import { DefaultCreneaux } from "../../../Utils/Types";
import SmallDate from "../../../Utils/Types/SmallDate";

export class Activite_Agenda {
    private _nom: string;
    private _date: SmallDate;
    private _creneaux: Map<DefaultCreneaux, number>;

    constructor(nom: string, creneaux: Map<DefaultCreneaux, number>, date: SmallDate) {
        this._nom = nom;
        this._date = date;
        if (creneaux) {
            this._creneaux = creneaux;
        } else {
            this._creneaux = new Map<DefaultCreneaux, number>();
            this._creneaux.set(DefaultCreneaux.MATIN, 0);
            this._creneaux.set(DefaultCreneaux.MIDI, 0);
            this._creneaux.set(DefaultCreneaux.APRES_MIDI, 0);
            this._creneaux.set(DefaultCreneaux.SOIREE, 0);
            this._creneaux.set(DefaultCreneaux.DEPART, 0);
        }
    }

    get nom(): string {
        return this._nom;
    }

    get creneaux(): Map<DefaultCreneaux, number> {
        return this._creneaux;
    }

    public getCreneau(creneau: DefaultCreneaux): number {
        return this._creneaux.get(creneau) || 0;
    }

    public setCreneau(creneau: DefaultCreneaux, value: number): void {
        this._creneaux.set(creneau, value);
    }

    public set nom(value: string) {
        this._nom = value;
    }

    public set creneaux(value: Map<DefaultCreneaux, number>) {
        this._creneaux = value;
    }

    public map<U>(callbackfn: (value: [DefaultCreneaux, number], index: number, array: [DefaultCreneaux, number][]) => U, thisArg?: unknown): U[]{
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
import { Creneaux } from "../../../Utils/Creneaux";

export class Activite_Agenda {
    private _nom: string;
    private _creneaux: Map<Creneaux, number>;

    constructor(nom: string, creneaux: Map<Creneaux, number>) {
        this._nom = nom;
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

    set nom(value: string) {
        this._nom = value;
    }

    set creneaux(value: Map<Creneaux, number>) {
        this._creneaux = value;
    }

    public map<U>(callbackfn: (value: [Creneaux, number], index: number, array: [Creneaux, number][]) => U, thisArg?: any): U[]{
        return Array.from(this._creneaux).map(callbackfn, thisArg);
    }
}
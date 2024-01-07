import { Creneaux } from "../../../Utils/Creneaux";
import { Activite_Agenda } from "./Activite_Agenda";


export class Liste_agenda {
    private _liste: Map<string, Activite_Agenda>;

    constructor() {
        this._liste = new Map<string, Activite_Agenda>();
    }

    get liste(): Map<string, Activite_Agenda> {
        return this._liste;
    }

    public getActivite(nom: string): Activite_Agenda | undefined {
        return this._liste.get(nom);
    }

    public addActivite(activite: Activite_Agenda): void {
        this._liste.set(activite.nom, activite);
    }

    public addActiviteMap(nom: string, creneaux: Map<Creneaux, number>): void {
        this._liste.set(nom, new Activite_Agenda(nom, creneaux));
    }

    public removeActivite(nom: string): void {
        this._liste.delete(nom);
    }

    public getCreneau(nom: string, creneau: Creneaux): number {
        return this._liste.get(nom)?.getCreneau(creneau) || 0;
    }

    set liste(value: Map<string, Activite_Agenda>) {
        this._liste = value;
    }

    public map<U>(callbackfn: (value: [string, Activite_Agenda], index: number, array: [string, Activite_Agenda][]) => U, thisArg?: any): U[]{
        return Array.from(this._liste).map(callbackfn, thisArg);
    }

    

}
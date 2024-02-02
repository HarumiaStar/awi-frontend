import React from "react";
import { Creneau, DetailZone, Jeu, Jour } from "../../Utils/Types";

export type RegisterDonneesFestivalRef = {
    update(): void;
}
export type registerTo = "any" | "nomFestival" | "lieuFestival" | "description" | "joursCreneaux" | "activites" | "jeux" | "dates" | "zones" | "lienAffiche";

export class DonneesFestival {
    private _nomFestival: string;
    private _dateDebut: Date;
    private _dateFin: Date;
    private _lieuFestival: string;
    private _description: string;
    private _lienAffiche: string;
    private _joursCreneaux: Jour[];
    private _activites: string[];
    private _jeux: Jeu[];
    private _zones: DetailZone[];

    private registeredComponents: Record<string, React.RefObject<RegisterDonneesFestivalRef>[]> = {};

    constructor() {
        const today = new Date();
        this._nomFestival = "";
        this._dateDebut = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
        this._dateFin = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
        this._lieuFestival = "";
        this._description = "";
        this._lienAffiche = "";
        this._joursCreneaux = [];
        this._activites = [
            "Accueil bénévoles",
            "Accueil public",
            "Vente restauration",
            "Cuisine",
            "Tombola",
            "Forum associations",
        ];
        this._jeux = [];
        this._zones = [];
        this.createDefaultCreneaux();
    }


    private creneauxParDefaut: ReadonlyArray<{ heureDebut: string; heureFin: string; }> = [
        {
            heureDebut: "09:00",
            heureFin: "11:00"
        },
        {
            heureDebut: "11:00",
            heureFin: "14:00"
        },
        {
            heureDebut: "14:00",
            heureFin: "17:00"
        },
        {
            heureDebut: "17:00",
            heureFin: "20:00"
        },
        {
            heureDebut: "20:00",
            heureFin: "22:00"
        },
    ];




    /* -------------------------------------------------------------------------- */
    /*                                GETTER SETTER                               */
    /* -------------------------------------------------------------------------- */

    set nomFestival(nomFestival: string) {
        this._nomFestival = nomFestival;
        this.updateComponents("nomFestival");
    }

    get nomFestival() {
        return this._nomFestival;
    }

    set lienAffiche(lienAffiche: string) {
        this._lienAffiche = lienAffiche;
        this.updateComponents("lienAffiche");
    }

    get lienAffiche() {
        return this._lienAffiche;
    }

    set dateDebut(dateDebut: Date) {
        if (!this.checkDateDebutFin(dateDebut, this.dateFin)) throw new Error('La date de début doit être avant la date de fin : ' + dateDebut + ' - ' + this.dateFin);
        this._dateDebut = dateDebut;
        this.createDefaultCreneaux();
        this.updateComponents("dates");
    }

    get dateDebut() {
        return this._dateDebut;
    }

    set dateFin(dateFin: Date) {
        if (!this.checkDateDebutFin(this.dateDebut, dateFin)) throw new Error('La date de début doit être avant la date de fin : ' + this.dateDebut + ' - ' + dateFin);
        this._dateFin = dateFin;
        this.createDefaultCreneaux();
        this.updateComponents("dates");
    }


    get dateFin() {
        return this._dateFin;
    }

    set lieuFestival(lieuFestival: string) {
        this._lieuFestival = lieuFestival;
        this.updateComponents("lieuFestival");
    }

    get lieuFestival() {
        return this._lieuFestival;
    }

    set description(description: string) {
        this._description = description;
        this.updateComponents("description");
    }

    get description() {
        return this._description;
    }

    set joursCreneaux(joursCreneaux: Jour[]) {
        this._joursCreneaux = joursCreneaux;
        this.updateComponents("joursCreneaux");
    }

    get joursCreneaux() {
        return this._joursCreneaux;
    }

    set activites(activites: string[]) {
        this._activites = activites;
        this.updateComponents("activites");
    }

    get activites() {
        return this._activites;
    }

    set jeux(jeux: Jeu[]) {
        this._jeux = jeux;
        this.updateComponents("jeux");
    }

    get jeux() {
        return this._jeux;
    }

    set zones(zones: DetailZone[]) {
        // ordonner les zones par ordre alphabétique
        zones.sort((a, b) => a.nom.localeCompare(b.nom));
        this._zones = zones;
        this.updateComponents("zones");
    }

    get zones() {
        this._zones.sort((a, b) => a.nom.localeCompare(b.nom));
        return this._zones;
    }


    /* ------------------------- GETTER SETTER SPECIAUX ------------------------- */

    set dateDebutString(dateDebut: string) {
        this.dateDebut = new Date(dateDebut);
    }

    set dateFinString(dateFin: string) {
        this.dateFin = new Date(dateFin);
    }

    get dateDebutString() {
        return this.dateDebut.getFullYear() + '-' + (this.dateDebut.getMonth() + 1).toString().padStart(2, '0') + '-' + this.dateDebut.getDate().toString().padStart(2, '0');
    }

    get dateFinString() {
        return this.dateFin.getFullYear() + '-' + (this.dateFin.getMonth() + 1).toString().padStart(2, '0') + '-' + this.dateFin.getDate().toString().padStart(2, '0');
    }

    /* -------------------------------------------------------------------------- */
    /*                              FIN GETTER SETTER                             */
    /* -------------------------------------------------------------------------- */

    public async createDefaultCreneaux() {
        // Créer les jours
        const dateDebut = new Date(this.dateDebut);
        const dateFin = new Date(this.dateFin);
        const nbJours = this.calculateDaysDifference(dateDebut, dateFin);
        const jours = [];
        for (let i = 0; i < nbJours; i++) {
            const date = new Date(dateDebut);
            date.setDate(dateDebut.getDate() + i);
            jours.push(new Jour(date, []));
        }


        // remplir les créneaux par jour par les jours
        jours.forEach(jour => {
            this.creneauxParDefaut.forEach(creneau => {
                const heureDebut = parseInt(creneau.heureDebut.split(':')[0]);
                const minuteDebut = parseInt(creneau.heureDebut.split(':')[1]);
                const heureFin = parseInt(creneau.heureFin.split(':')[0]);
                const minuteFin = parseInt(creneau.heureFin.split(':')[1]);
                jour.ajouterCreneauHeureMinute(heureDebut, minuteDebut, heureFin, minuteFin);
            });
        });

        this.joursCreneaux = jours;
    }

    public supprimerCreneau(indexJour: number, creneau: Creneau): void {
        this.joursCreneaux[indexJour].supprimerCreneau(creneau);
        this.updateComponents("joursCreneaux");
    }

    public ajouterCreneau(indexJour: number, heureDebut: number, minuteDebut: number, heureFin: number, minuteFin: number): void {
        this.joursCreneaux[indexJour].ajouterCreneauHeureMinute(heureDebut, minuteDebut, heureFin, minuteFin);
        this.updateComponents("joursCreneaux");
    }

    public ajouterActivite(activite: string): void {
        this.activites.push(activite);
        this.activites.sort((a, b) => a.localeCompare(b));
        this.updateComponents("activites");
    }

    public supprimerActivite(activite: string): void {
        this.activites.splice(this.activites.indexOf(activite), 1);
        this.updateComponents("activites");
    }

    public ajouterZone(zone: DetailZone): void {
        this.zones.push(zone);
        this.zones.sort((a, b) => a.nom.localeCompare(b.nom));
        this.updateComponents("zones");
    }

    public supprimerZone(zone: DetailZone): void {
        this.zones.splice(this.zones.indexOf(zone), 1);
        this.updateComponents("zones");
    }

    public ajouterZoneBenevole(zone: DetailZone, zoneBenevole: string): void {
        zone.zonesBenevoles.push(zoneBenevole);
        this.updateComponents("zones");
    }

    public supprimerZoneBenevole(zone: DetailZone, zoneBenevole: string): void {
        zone.zonesBenevoles.splice(zone.zonesBenevoles.indexOf(zoneBenevole), 1);
        this.updateComponents("zones");
    }

    public setdates(dateDebut: Date, dateFin: Date) {
        if (!this.checkDateDebutFin(dateDebut, dateFin)) throw new Error('La date de début doit être avant la date de fin : ' + dateDebut + ' - ' + dateFin);
        this._dateDebut = dateDebut;
        this._dateFin = dateFin;
        this.createDefaultCreneaux();
        this.updateComponents("dates");
    }


    /* -------------------------------------------------------------------------- */
    /*                              INTERNAL METHODS                              */
    /* -------------------------------------------------------------------------- */


    private checkDateDebutFin(dateDebut: Date = this.dateDebut, dateFin: Date = this.dateFin): boolean {
        return dateDebut.getTime() < dateFin.getTime();
    }

    private calculateDaysDifference(startDate: Date, endDate: Date): number {
        // Set the date parts to midnight to ignore the time component
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds
        const timeDifference = Math.abs(end.getTime() - start.getTime());

        // Calculate the number of days
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Add 1 to include both start and end dates
        return daysDifference + 1;
    }


    /* -------------------------------------------------------------------------- */
    /*                           COMPONENT REGISTRATION                           */
    /* -------------------------------------------------------------------------- */

    public registerComponent(component: React.RefObject<RegisterDonneesFestivalRef>, to: registerTo) {
        if (!this.registeredComponents[to]) this.registeredComponents[to] = [];
        this.registeredComponents[to].push(component);
    }

    private updateComponents(to: registerTo) {
        if (!this.registeredComponents["any"]) return;
        this.registeredComponents["any"].forEach(component => {
            component.current?.update();
        });

        if (!this.registeredComponents[to]) return;
        this.registeredComponents[to].forEach(component => {
            component.current?.update();
        });
    }

}
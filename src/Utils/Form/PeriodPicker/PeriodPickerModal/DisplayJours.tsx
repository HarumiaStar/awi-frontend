import React, { useState } from "react"
import { v4 } from "uuid";
import { isBefore, isDateInInterval, isSameDay, isToday } from "../../../Types";
import Jour from "./jour";

export type DisplayJourProps = {
    defaultDateDebut: Date;
    defaultDateFin: Date;
    mois: number;
    annee: number;
    onDateDebutChange: (date: Date | null) => void;
    onDateFinChange: (date: Date | null) => void;
    onDatesChange?: (dates: { dateDebut: Date | null, dateFin: Date | null }) => void;
}

export type DisplayJourRef = {
    getDates: () => { dateDebut: Date | null, dateFin: Date | null };
}

export const DisplayJour = React.forwardRef(({ mois, annee, onDateDebutChange, onDateFinChange, onDatesChange, defaultDateDebut, defaultDateFin }: DisplayJourProps, ref: React.Ref<DisplayJourRef>) => {
    /* --------------------------------- States --------------------------------- */
    const [dateDebut, setDateDebutRaw] = useState<Date | null>(defaultDateDebut);
    const [dateFin, setDateFinRaw] = useState<Date | null>(defaultDateFin);

    /* -------------------------------- Variables ------------------------------- */
    const premierJourDuMois = new Date(annee, mois, 1);
    const premierJourDuMoisNumero = premierJourDuMois.getDay();
    const joursPrecedents = new Date((mois === 0 ? annee - 1 : annee), mois, 0);
    const dernierJourDuMois = new Date(annee, mois + 1, 0);
    const nbJoursDuMois = dernierJourDuMois.getDate();
    const listeJours: Date[] = []

    for (let i = 1; i <= nbJoursDuMois; i++) {
        listeJours.push(new Date(annee, mois, i));
    }
    const nbJoursMoisPrecedent = new Date((mois === 0 ? annee - 1 : annee), mois, 0).getDate();
    // Ajoute des jours vides avant le premier jour du mois
    for (let i = 0; i < premierJourDuMoisNumero - 1; i++) {
        listeJours.unshift(new Date(joursPrecedents.getFullYear(), joursPrecedents.getMonth(), nbJoursMoisPrecedent - i));
    }

    // Finir la dernière semaine
    const nbJoursManquants = 7 - listeJours.length % 7;
    for (let i = 1; i <= nbJoursManquants; i++) {
        listeJours.push(new Date(annee, mois + 1, i));
    }

    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */

    const setDateDebut = (date: Date) => {
        setDateDebutRaw(date);
        onDateDebutChange(date);
        if (onDatesChange) onDatesChange({ dateDebut: date, dateFin: null });
    }

    const setDateFin = (date: Date | null) => {
        setDateFinRaw(date);
        onDateFinChange(date);
        if (onDatesChange) onDatesChange({ dateDebut, dateFin: date });
    }

    const setDates = (dates: { dateDebut: Date | null, dateFin: Date | null }) => {
        setDateDebutRaw(dates.dateDebut);
        setDateFinRaw(dates.dateFin);
        onDateDebutChange(dates.dateDebut);
        onDateFinChange(dates.dateFin);
        if (onDatesChange) onDatesChange(dates);
    }



    const handleClick = (date: Date) => {
        console.log(dateDebut, dateFin, date);
        if (dateDebut === null) {
            setDateDebut(date);
            return;
        }

        if (dateFin !== null) {
            setDates({ dateDebut: date, dateFin: null });
            return;
        }

        if (isBefore(date, dateDebut)) {
            setDates({ dateDebut: date, dateFin: dateDebut });
        }
        else {
            setDateFin(date);
        }

    }

    React.useImperativeHandle(ref, () => ({
        getDates: () => { return { dateDebut, dateFin } }
    }));

    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */
   

    // Affiche les jours du mois sous forme d'une grille
    return (
        <div className="grid grid-cols-7">
            <div className="text-center cursor-default">Lun</div>
            <div className="text-center cursor-default">Mar</div>
            <div className="text-center cursor-default">Mer</div>
            <div className="text-center cursor-default">Jeu</div>
            <div className="text-center cursor-default">Ven</div>
            <div className="text-center cursor-default">Sam</div>
            <div className="text-center cursor-default">Dim</div>
            {listeJours.map((jour) => <Jour key={v4()} date={jour} dateDebut={dateDebut} dateFin={dateFin} handleClick={handleClick} mois={mois} />)}
        </div>
    )

});

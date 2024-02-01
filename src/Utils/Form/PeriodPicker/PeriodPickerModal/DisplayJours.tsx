import React, { useState } from "react"
import { v4 } from "uuid";
import { isBefore, isDateInInterval, isSameDay, isToday } from "../../../Types";

export type DisplayJourProps = {
    mois: number;
    annee: number;
    onDateDebutChange: (date: Date | null) => void;
    onDateFinChange: (date: Date | null) => void;
    onDatesChange?: (dates: { dateDebut: Date | null, dateFin: Date | null }) => void;
}

export type DisplayJourRef = {
    getDates: () => { dateDebut: Date | null, dateFin: Date | null };
}

export const DisplayJour = React.forwardRef(({ mois, annee, onDateDebutChange, onDateFinChange, onDatesChange }: DisplayJourProps, ref: React.Ref<DisplayJourRef>) => {
    /* --------------------------------- States --------------------------------- */
    const [dateDebut, setDateDebutRaw] = useState<Date | null>(null);
    const [dateFin, setDateFinRaw] = useState<Date | null>(null);
    const [dateHover, setDateHover] = useState<Date | null>(null);

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
    const createJour = (date: Date) => {
        let color = "text-gray-900";
        // texte
        let classeJour = `text-center `;
        // stly global
        classeJour += " p-2 cursor-pointer w-10 h-10 flex items-center justify-center my-1 ";




        // Background 
        if (dateDebut !== null && isSameDay(date, dateDebut)) {
            classeJour += " bg-green-400 "
            if (dateHover !== null && dateFin === null) {
                if (isSameDay(dateHover, dateDebut)) {
                    classeJour += " rounded-lg "
                }
                else if (isBefore(dateHover, dateDebut)) {
                    classeJour += " rounded-tr-lg rounded-br-lg "
                }
                else {
                    classeJour += " rounded-tl-lg rounded-bl-lg "
                }
            }
            else {
                if (isSameDay(dateFin, dateDebut)) classeJour += " rounded-lg "
                else classeJour += " rounded-tl-lg rounded-bl-lg "
            }
        }
        else if (dateFin !== null && isSameDay(date, dateFin)) {
            classeJour += " bg-red-400 rounded-tr-lg rounded-br-lg "
        }
        else if (dateFin === null && isDateInInterval(date, dateDebut, dateHover)) {
            classeJour += " bg-gray-300 " + (isSameDay(dateHover, date) ? " rounded-tr-lg rounded-br-lg " : "")
        }
        else if (dateFin === null && isDateInInterval(date, dateHover, dateDebut)) {
            classeJour += " bg-gray-300 " + (isSameDay(dateHover, date) ? " rounded-tl-lg rounded-bl-lg " : "")
        }
        else if (isToday(date)) {
            classeJour += " bg-blue-400 " + (isDateInInterval(date, dateDebut, dateFin) || isDateInInterval(date, dateDebut, dateHover) || isDateInInterval(date, dateHover, dateFin) ? "" : " rounded-lg ")
        }
        else if (isDateInInterval(date, dateDebut, dateFin)) {
            classeJour += " bg-gray-400 "
        }
        else {
            color = (date.getMonth() === mois ? ' text-white ' : ' text-gray-400 ')
        }

        // Affichage
        classeJour += color;

        return (
            <div
                className={classeJour}
                key={v4()}
                onClick={() => handleClick(date)}
                onMouseEnter={() => setDateHover(date)}
                onMouseLeave={() => setDateHover(null)}
            >
                <div
                    className="rounded-full hover:bg-gray-200 hover:text-black w-6 h-6 flex flex-row items-center justify-center"
                >
                    {date.getDate()}
                </div>
            </div>
        )
    }


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
            {listeJours.map((jour) => createJour(jour))}
        </div>
    )

});

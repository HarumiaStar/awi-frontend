import { v4 } from "uuid";
import { isDateInInterval, isSameDay, isToday } from "../../../Types";

export type jourProps = {
    date: Date;
    dateDebut: Date | null;
    dateFin: Date | null;
    handleClick: (date: Date) => void;
    mois: number;
}

export default function Jour({ date, dateDebut, dateFin, handleClick, mois }: jourProps) {
    let color = "text-gray-900";
    // texte
    let classeJour = `text-center `;
    // stly global
    classeJour += " p-2 cursor-pointer w-10 h-10 flex items-center justify-center my-1 ";




    // Background 
    if (dateDebut !== null && isSameDay(date, dateDebut)) {
        classeJour += " bg-green-400 "
        if (isSameDay(dateFin, dateDebut)) classeJour += " rounded-lg "
        else classeJour += " rounded-tl-lg rounded-bl-lg "
    }
    else if (dateFin !== null && isSameDay(date, dateFin)) {
        classeJour += " bg-red-400 rounded-tr-lg rounded-br-lg "
    }
    else if (isToday(date)) {
        classeJour += " bg-blue-400 " + (isDateInInterval(date, dateDebut, dateFin) ? " rounded-lg " : " ")
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
        >
            <div
                className="rounded-full hover:bg-gray-200 hover:text-black w-6 h-6 flex flex-row items-center justify-center"
                onClick={() => handleClick(date)}
            >
                {date.getDate()}
            </div>
        </div>
    )
}
import { Creneaux, CreneauxList } from "../../Utils/Creneaux";
import { Liste_agenda } from "./Classes/Liste_Agenda"
import "./Agenda_desktop.css"
import SmallDate from "../../Utils/SmallDate";
import { TwoDMap } from "../../Utils/ThreeDMap";
import { v4 } from "uuid";
import { JSX } from "react/jsx-runtime";
import { useState } from "react";
import BoxedRadioButton from "../../components/BoxedRadioButton";



export default function Agenda_Desktop({ agenda }: { agenda: Liste_agenda }) {
    const dates = agenda.allDates;

    const [selected_date, setSelected_date] = useState<SmallDate>(dates[0]);


    const creneaux_affichage = CreneauxList.map((value: Creneaux, index: number) => <th key={index}>{value}</th>)
    const nombre_colonnes = creneaux_affichage.length;

    const toutes_activites: JSX.Element[] = []

    agenda.liste.get2DByA().forEach((date_creneau_rempli: TwoDMap<SmallDate, Creneaux, number>, nom_activite: string) => {

        const cellules = [];

        cellules.push(<td key={v4()} className="titre">{nom_activite}</td>)


        // date_creneau_rempli.getMapWithFirstDimension().forEach((creneau_repli: Map<Creneaux, number>) => {
        //     creneau_repli.forEach((valeur: number) => {
        //         cellules.push(<td key={v4()}>{valeur}</td>)
        //     })
        // })

        date_creneau_rempli.selectRow(selected_date)?.forEach((valeur: number) => {
            cellules.push(<td key={v4()}>{valeur}</td>)
        })


        toutes_activites.push(<tr key={v4()}>{cellules}</tr>)
    })

    const buttonsOptions = dates.map((value: SmallDate) => {
        return {
            name: value.frFormat,
            value: value.frFormat,
            checked: selected_date.equals(value),
            onChange: () => setSelected_date(value)
        }
    })


    return <>
        <h2>Agenda sur ordinateur</h2>

        <div className="agenda_date_selector">
            <BoxedRadioButton buttonsOptions={buttonsOptions} />
        </div>

        <div className="agenda_table_container">
            {/* Agenda sous forme d'un tableau */}
            <table className="table_agenda">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th colSpan={nombre_colonnes}>{selected_date.frFormat}</th>
                    </tr>
                    <tr>
                        <th>Activité</th>
                        {creneaux_affichage}
                    </tr>
                </thead>
                <tbody>
                    {toutes_activites}
                </tbody>
            </table>
        </div>
    </>
}
import { Creneaux, CreneauxList } from "../../Utils/Creneaux";
import { Liste_agenda } from "./Classes/Liste_Agenda"
import "./Agenda_desktop.css"
import SmallDate from "../../Utils/SmallDate";


export default function Agenda_Desktop({ agenda }: { agenda: Liste_agenda }) {
    return <>
        <h2>Agenda sur ordinateur</h2>
        <div className="agenda_table_container">
            {/* Agenda sous forme d'un tableau */}
            <table className="table_agenda">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th colSpan={CreneauxList.length}>Jour 1</th>
                    </tr>
                    <tr>
                        <th>Activité</th>
                        {CreneauxList.map((value: Creneaux, index: number) => <th key={index}>{value}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {agenda.mapDate(new SmallDate(10,10,2010), (value: [string, Map<Creneaux, number>], index: number) => {

                        const creneaux = value[1];

                        return <tr key={index}>
                            <td className="titre">{value[0]}</td>
                            {CreneauxList.map((value: Creneaux, index: number) => <td key={index}>{creneaux.get(value)}</td>)}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
}
import { Liste_agenda } from "./Classes/Liste_Agenda"


export default function Agenda_Desktop({ agenda }: { agenda: Liste_agenda }) {


    return <>
        <h2>Agenda sur ordinateur</h2>

        {/* Agenda sous forme d'un tableau */}
        <table>
            <thead>
                <tr>
                    <th>Activité</th>
                    <th>Matin</th>
                    <th>Midi</th>
                    <th>Après-midi</th>
                    <th>Soirée</th>
                    <th>Départ</th>
                </tr>
            </thead>
            <tbody>
                {agenda.map((activite) => {
                    return <tr>
                        <td>{activite[0]}</td>
                        {activite[1].map((creneau) => {
                            return <td>{creneau[1]}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    </>
}
import { Liste_agenda } from "./Classes/Liste_Agenda"
import { Liste_deroulante, Liste_deroulante_element, Liste_deroulante_element_data } from "../../Utils/Liste_deroulante"
import { Creneaux } from "../../Utils/Creneaux";
import SmallDate from "../../Utils/SmallDate";


export default function Agenda_mobile({ agenda }: { agenda: Liste_agenda }) {
    const liste_deroulante: Liste_deroulante_element[] = agenda.mapDate(new SmallDate(10,10,2010), (value: [string, Map<Creneaux, number>]) => {
        const creneaux = value[1];

        const data: Liste_deroulante_element_data[] = [];

        creneaux.forEach((value: number, key: Creneaux) => {
            data.push({ nom: key, valeur: value })
        })

        return new Liste_deroulante_element(value[0], data);

    })

    return <>
        <h2>Agenda sur mobile</h2>

        {/* Liste sous forme d'une première case avec le nom de l'activité, puis une liste dépliante avec chaque créneau */}
        <Liste_deroulante liste_objet={liste_deroulante} />
    </>
}
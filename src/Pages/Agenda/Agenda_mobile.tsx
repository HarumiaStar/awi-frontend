import { Liste_agenda } from "./Classes/Liste_Agenda"
import { Liste_deroulante, Liste_deroulante_element, Liste_deroulante_element_data } from "../../Utils/Liste_deroulante"


export default function Agenda_mobile({ agenda }: { agenda: Liste_agenda }) {

    const liste_deroulante: Liste_deroulante_element[] = agenda.map((activite) => {
        const creneaux = activite[1];

        const data: Liste_deroulante_element_data[] = creneaux.map((creneau) => {
            return new Liste_deroulante_element_data(creneau[0], creneau[1]);
        })

        return new Liste_deroulante_element(activite[0], data);

    })

    return <>
        <h2>Agenda sur mobile</h2>

        {/* Liste sous forme d'une première case avec le nom de l'activité, puis une liste dépliante avec chaque créneau */}
        <Liste_deroulante liste_objet={liste_deroulante} />
    </>
}
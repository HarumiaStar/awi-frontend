import { Liste_agenda } from "./Classes/Liste_Agenda"
import { Liste_deroulante, Liste_deroulante_element, Liste_deroulante_element_data } from "../../Utils/Liste_deroulante"
import { DefaultCreneaux } from "../../Utils/Types";
import SmallDate from "../../Utils/Types/SmallDate";
import { TwoDMap } from "../../Utils/Types/ThreeDMap";
import { v4 } from "uuid";


export default function Agenda_mobile({ agenda }: { agenda: Liste_agenda }) {
    const sections : {nom: string, liste: Liste_deroulante_element[]}[] = []

    agenda.liste.get2DByB().forEach((activite: TwoDMap<string, DefaultCreneaux, number>, date: SmallDate) => {
        const liste_deroulante: Liste_deroulante_element[] = []
        const nom_section = date.frFormat

        activite.getMapWithFirstDimension().forEach((creneau: Map<DefaultCreneaux, number>, nom_activite: string) => {
            const liste_deroulante_element_data: Liste_deroulante_element_data[] = []
            creneau.forEach((valeur: number, creneau: DefaultCreneaux) => {
                liste_deroulante_element_data.push(new Liste_deroulante_element_data(creneau, valeur))
            })
            liste_deroulante.push(new Liste_deroulante_element(nom_activite, liste_deroulante_element_data))
        })

        sections.push({nom: nom_section, liste: liste_deroulante})
    })

    const section_affichage = sections.map((section) => {
        const liste_deroulante = <Liste_deroulante liste_objet={section.liste} />
        return <section key={v4()} className="section_liste_deroulante">
            <h3>{section.nom}</h3>
            {liste_deroulante}
        </section>
    })

    return <>
        <h2>Agenda sur mobile</h2>
        {section_affichage}
    </>
}
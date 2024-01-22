import "./Liste_deroulante.css";
import { Liste_deroulante_element, Deroulant_element } from "./index";
import { v4 } from "uuid";




export default function Liste_deroulante({ liste_objet }: { liste_objet: Liste_deroulante_element[] }) {

    const liste_affichage = liste_objet.map((objet: Liste_deroulante_element) => {
        return <Deroulant_element objet={objet} key={v4()} />
    })

    return <div className="liste">
        {liste_affichage}
    </div>
}
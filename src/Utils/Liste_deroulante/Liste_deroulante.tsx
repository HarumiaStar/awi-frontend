import { useState } from "react";
import "./Liste_deroulante.css";
import { Liste_deroulante_element_data, Liste_deroulante_element } from "./Liste_deroulante_element";




export default function Liste_deroulante({ liste_objet }: { liste_objet: Liste_deroulante_element[] }) {
    const [ouvert, setOuvert] = useState<string>("");



    const liste_affichage = liste_objet.map((objet: Liste_deroulante_element) => {
        const ouvert_ou_ferme = "element_nom " + (ouvert === objet.nom ? "open" : "");
        const deroulantClass = "deroulant" + (ouvert === objet.nom ? "" : " closed");


        return <div className="element">
            <div className={ouvert_ou_ferme} onClick={() => setOuvert(ouvert === objet.nom ? "" : objet.nom)}>{objet.nom}</div>

            <div className={deroulantClass}>
                {objet.data.map((data: Liste_deroulante_element_data) => (
                    <div className="deroulant_element">
                        <div className="deroulant_element_nom">{data.nom}</div>
                        <div className="deroulant_element_valeur">{data.valeur}</div>
                    </div>
                ))}
            </div>
        </div>
    })

    return <div className="liste">
        {liste_affichage}
    </div>
}
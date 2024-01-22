import React from "react";
import { Liste_deroulante_element, Liste_deroulante_element_data } from "./Liste_deroulante_element";
import { v4 } from "uuid";

export default function Deroulant_element({ objet }: { objet: Liste_deroulante_element }) {
    function setOuvert(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const element = event.target as HTMLDivElement;
        const element_nom = element.parentElement?.querySelector(".element_nom") as HTMLDivElement;
        element_nom.classList.toggle("open");

        const deroulant = element.parentElement?.querySelector(".deroulant") as HTMLDivElement;
        deroulant.classList.toggle("open");
    }



    return <div className="element" key={v4()}>
        <div className="element_nom" onClick={setOuvert}>{objet.nom}</div>
        <div className="deroulant">
            {objet.data.map((data: Liste_deroulante_element_data) => (
                <div className="deroulant_element" key={v4()} >
                    <div className="deroulant_element_nom">{data.nom}</div>
                    <div className="deroulant_element_valeur">{data.valeur}</div>
                </div>
            ))}
        </div>
    </div>
}
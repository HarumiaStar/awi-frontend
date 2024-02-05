import { useState } from "react"
import { APIPoste as poste, APICreneau as creneau, APIJeu } from "../../../Utils/Types"
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

export default function SelectParZone({ poste, creneaux, jeux }: { poste: poste, creneaux: creneau[], jeux: APIJeu[] }) {

    const [open, setOpen] = useState<boolean>(false);

    const navigator = useNavigate();


    const onSlotSelected = (creneau: creneau) => {
        navigator(`/inscription/creneau?poste=${poste.id}&creneau=${creneau.id}`);
    }


    return (
        <div className="flex flex-col items-center gap-4 w-full border-2 p-2 rounded-md" key={v4()}>
            <div className="flex flex-row justify-between w-full " onClick={() => setOpen(!open)}>
                <h1>{poste.title}</h1>
            </div>
            {open && (
                <>
                    <div className="flex flex-col items-center w-full">
                        <h1 className="">
                            <strong>Jeux : </strong>
                            {jeux.map((jeu) => (
                                <>
                                    <span className="hover:underline" key={v4()}>
                                        {jeu.name}
                                    </span>
                                    {(jeu !== jeux[jeux.length - 1]) ? "  -  " : ""}
                                </>
                            ))}
                        </h1>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        {creneaux.map((creneau) => <div className="flex flex-row justify-between w-full border-l-2 p-3" onClick={() => onSlotSelected(creneau)}>
                            <h1>{creneau.start} - {creneau.end}</h1>
                            <p>{poste.capacity} / {poste.maxCapacity}</p>
                        </div>)}
                    </div>
                </>
            )}
        </div>
    )
}

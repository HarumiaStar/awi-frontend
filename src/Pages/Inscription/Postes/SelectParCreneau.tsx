import { useState } from "react"
import { APIPoste as poste, APICreneau as creneau } from "../../../Utils/Types"
import { useNavigate } from "react-router-dom";


export default function SelectParCreneau({ creneau, postes }: { creneau: creneau, postes: poste[] }) {

    const [open, setOpen] = useState<boolean>(false);

    const navigator = useNavigate();

    const onSlotSelected = (poste: poste) => {
        navigator(`/inscription/creneau?poste=${poste.id}&creneau=${creneau.id}`);
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full border-2 p-2 rounded-md">
            <div className="flex flex-row justify-between w-full " onClick={() => setOpen(!open)}>
                <h1>{creneau.start} - {creneau.end}</h1>
            </div>
            {open && (
                <div className="flex flex-col items-center w-full">
                    {postes.map((poste) => <div className="flex flex-row justify-between w-full border-l-2 p-3" onClick={() => onSlotSelected(poste)}>
                        <h1>{poste.title}</h1>
                        <p>{poste.capacity} / {poste.maxCapacity}</p>
                    </div>)}
                </div>
            )}
        </div>
    )

}
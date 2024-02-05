import { useEffect, useState } from "react"
import { APIPoste as poste, APICreneau as creneau, Api } from "../../../Utils/Types"
import SelectParPoste from "./SelectParPoste"
import SelectParCreneau from "./SelectParCreneau";


export default function Postes({ creneaux }: { creneaux: creneau[] }) {
    const [postes, setPostes] = useState<poste[]>([]);

    const [filterBy, setFilterBy] = useState<"poste" | "creneau">("poste");

    useEffect(() => {
        const postesData = Api.getInstance().getApi(`/zones`);
        postesData.then(async (response) => {
            if (!response.body) {
                alert('No zones found');
                return;
            }
            let allZones = (await response.json());

            allZones = allZones.filter((zone: any) => zone.animation === false);


            const zones = allZones.map((zone: any) => {
                return {
                    id: zone.id,
                    title: zone.name,
                    capacity: 0,
                    maxCapacity: zone.max_capacity
                }
            });

            setPostes(zones);
        });

    }, []);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-row gap-4 w-full items-center">
                <h1 className="text-3xl">
                    Filter par
                </h1>
                <select value={filterBy} onChange={(e) => setFilterBy(e.target.value as "poste" | "creneau")} className="border-2 p-2 rounded-md">
                    <option value="poste">Poste</option>
                    <option value="creneau">Créneau</option>
                </select>
            </div>


            {
                filterBy === "poste" && postes.map((poste) => {
                    return (
                        <SelectParPoste key={poste.id} poste={poste} creneaux={creneaux} />
                    )
                })
            }
            {
                filterBy === "creneau" && creneaux.map((creneau) => {
                    return (
                        <SelectParCreneau key={creneau.id} creneau={creneau} postes={postes} />
                    )
                })
            }
        </div>
    )
}
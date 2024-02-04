import { useEffect, useState } from "react"
import { APIPoste as poste, APICreneau as creneau, Api } from "../../../Utils/Types"
import SelectParPoste from "../Postes/SelectParPoste"
import SelectParCreneau from "../Postes/SelectParCreneau";


export default function Animations({ creneaux }: { creneaux: creneau[] }) {
    const [zones, setZones] = useState<poste[]>([]);

    const [filterBy, setFilterBy] = useState<"zone" | "creneau">("zone");


    useEffect(() => {
        const zonesData = Api.getInstance().getApi(`/zones`);
        zonesData.then(async (response) => {
            if (!response.body) {
                alert('No zones found');
                return;
            }
            let allZones = (await response.json());

            allZones = allZones.filter((zone: any) => zone.animation === true);


            const zones = allZones.map((zone: any) => {
                return {
                    id: zone.id,
                    title: zone.name,
                    capacity: 0,
                    maxCapacity: zone.max_capacity,
                    animation: zone.animation
                }
            });

            setZones(zones);

        });

    }, []);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-row gap-4 w-full items-center">
                <h1 className="text-3xl">
                    Filter par
                </h1>
                <select value={filterBy} onChange={(e) => setFilterBy(e.target.value as "zone" | "creneau")} className="border-2 p-2 rounded-md">
                    <option value="zone">Zone</option>
                    <option value="jeux">Jeux</option>
                </select>
            </div>


            {
                filterBy === "zone" && zones.map((zone) => {
                    return (
                        <SelectParPoste key={zone.id} poste={zone} creneaux={creneaux} />
                    )
                })
            }
            {
                filterBy === "creneau" && creneaux.map((creneau) => {
                    return (
                        <SelectParCreneau key={creneau.id} creneau={creneau} postes={zones} />
                    )
                })
            }

        </div>
    )
}

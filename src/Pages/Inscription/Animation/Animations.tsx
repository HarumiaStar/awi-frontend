import { useEffect, useState } from "react"
import { APIPoste as poste, APICreneau as creneau, Api, APIJeu } from "../../../Utils/Types"
import SelectParZone from "./SelectParZone"
import { useLocation } from "react-router-dom";


export default function Animations({ creneaux }: { creneaux: creneau[] }) {
    const [zones, setZones] = useState<poste[]>([]);
    const [jeuxParZone, setJeuxParZone] = useState<Record<string, APIJeu[]>>({});

    const location = useLocation();
    const festivalId = location.pathname.split('/').pop();

    useEffect(() => {
        initDatas();
    }, []);

    const initDatas = async () => {
        let response = await Api.getInstance().getApi(`/zones`);
        if (!response.ok) {
            alert('No zones found');
            return;
        }
        let allZones = (await response.json());

        allZones = allZones.filter((zone: any) => zone.festival_id = festivalId);
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

        response = await Api.getInstance().getApi(`/games`);
        if (!response.ok) {
            alert('No jeux found');
            return;
        }
        let allJeux = (await response.json());

        response = await Api.getInstance().getApi(`/game-zones`);
        if (!response.ok) {
            alert('No game-zones found');
            return;
        }
        let allGameZones = (await response.json());

        // GameZones : {gameId: 1, zoneId: 1}
        // Jeux : {id: 1, name: "jeu1", author: "author1", editor: "editor1", maxPlayers: 5, minPlayers: 1, minAge: 5, duration: 30, toAnimate: true, recieved: true, type: "type1", mechanics: "mechanics1", theme: "theme1", tags: "tags1", description: "description1"}
        // Zones : {id: 1, name: "zone1", max_capacity: 10, animation: true, festival_id: 1}

        // On récupère les jeux qui sont dans les zones d'animation
        let jeuxIds: number[] = [];
        allGameZones.forEach((gameZone: any) => {
            zones.forEach((zone: any) => {

                if (gameZone.zoneId === zone.id) {
                    jeuxIds.push(gameZone.gameId);
                }
            });

        });

        // remove duplicates
        jeuxIds = jeuxIds.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        const jeux = allJeux.filter((jeu: any) => jeuxIds.includes(jeu.id));
        console.log(jeux);


        let jeuxParZone : Record<string, APIJeu[]> = {};

        allGameZones.forEach((gameZone: any) => {
            jeuxParZone[gameZone.zoneId] = [];
        });

        allGameZones.forEach((gameZone: any) => {
            jeux.forEach((jeu: any) => {
                if (gameZone.gameId === jeu.id) {
                    jeuxParZone[gameZone.zoneId].push(jeu);
                }
            });
        });


        setJeuxParZone(jeuxParZone);
        setZones(zones);

    }


    return (
        <div className="flex flex-col items-center gap-4 w-full">
                {zones.map((zone) => {
                    return (
                        <SelectParZone key={zone.id} poste={zone} creneaux={creneaux} jeux={jeuxParZone[zone.id]} />
                    )
                })}

        </div>
    )
}

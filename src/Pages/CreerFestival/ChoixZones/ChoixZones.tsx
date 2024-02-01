import { useEffect, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { DetailZone, zoneFromJeuxTriees } from "../../../Utils/Types";
import { DisplayZone } from "./DisplayZone";
import { v4 } from "uuid";
import { DonneesFestival } from "../DonneesFestival";


export type ChoixZonesProps = {
    donneesFestival: DonneesFestival;
};

export default function ChoixZones({ donneesFestival }: ChoixZonesProps) {
    const [zones, setZones] = useState<DetailZone[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null)

    const ajouterZone = (nom: string) => {
        const zone = {
            nom: nom,
            zonesBenevoles: [],
        }
        donneesFestival.ajouterZone(zone);
        setZones([...zones, zone]);
    }

    const handleAjouterZone = () => {
        if (inputRef.current!.value === '') return;
        ajouterZone(inputRef.current!.value);
        inputRef.current!.value = '';
    }

    useEffect(() => {
        setZones(zoneFromJeuxTriees(donneesFestival.jeux, "alphabétique"));
    }, [donneesFestival.jeux]);


    const onChangeZone = (index: number, newName: string) => {
        const zonesCopie = [...zones];
        zonesCopie[index].nom = newName;
        setZones(zonesCopie);
    }

    const onChangeZoneBenevole = (indexZone: number, oldName: string, newName: string) => {
        const zonesCopie = [...zones];
        zonesCopie[indexZone].zonesBenevoles.forEach((zoneBenevole, index) => {
            if (zoneBenevole === oldName) {
                zonesCopie[indexZone].zonesBenevoles[index] = newName;
            }
        });
        setZones(zonesCopie);
    }

    const onDeleteZone = (index: number) => {
        const zonesCopie = [...zones];
        zonesCopie.splice(index, 1);
        setZones(zonesCopie);
    }

    const onDeleteZoneBenevole = (indexZone: number, name: string) => {
        const zonesCopie = [...zones];
        zonesCopie[indexZone].zonesBenevoles = zonesCopie[indexZone].zonesBenevoles.filter(zoneBenevole => zoneBenevole !== name);
        setZones(zonesCopie);
    }

    const onAddZoneBenevole = (indexZone: number, name: string) => {
        const zonesCopie = [...zones];
        zonesCopie[indexZone].zonesBenevoles.push(name);
        setZones(zonesCopie);
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-bold'>
                Zones
            </h2>
            <div className='flex flex-col items-center gap-3 justify-center'>
                <div className='flex flex-row justify-between items-center p-4'>
                    <div className='flex flex-row justify-between items-center'>
                        <input type='text' ref={inputRef} className='border-2 border-gray-400 rounded-lg p-2' />
                        <TiPlus color='green' size={20} onClick={handleAjouterZone} />
                    </div>
                </div>
                {zones.map((zone, index) => (
                    <DisplayZone
                        zone={zone}
                        key={v4()}
                        indexZone={index}
                        zoneHandlers={{
                            handleOnChangerNomZone: onChangeZone,
                            handleSupprimerZone: onDeleteZone,
                        }}
                        zoneBenevoleHandlers={{
                            handleChangeZoneBenevole: onChangeZoneBenevole,
                            handleSupprimerZoneBenevole: onDeleteZoneBenevole,
                            handleAjouterZoneBenevole: onAddZoneBenevole,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
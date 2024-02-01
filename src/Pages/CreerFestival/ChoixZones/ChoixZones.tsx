import React, { useEffect, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { Jeu, DetailZone, zoneFromJeuxTriees } from "../../../Utils/Types";
import { DisplayZone } from "./DisplayZone";
import { v4 } from "uuid";

export type ChoixZonesRefType = {
    getZones: () => string[];
};

export type ChoixZonesProps = {
    jeux: Jeu[];
};

export const ChoixZones = React.forwardRef((props: ChoixZonesProps, ref) => {
    const [zones, setZones] = useState<DetailZone[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null)

    const ajouterZone = (nom: string) => {
        setZones([...zones, { nom: nom, zonesBenevoles: [] }]);
    }

    const handleAjouterZone = () => {
        if (inputRef.current!.value === '') return;
        ajouterZone(inputRef.current!.value);
        inputRef.current!.value = '';
    }

    React.useImperativeHandle(ref, () => ({
        getZones() {
            return zones;
        }
    }));

    useEffect(() => {
        setZones(zoneFromJeuxTriees(props.jeux, "alphabétique"));
    }, [props.jeux]);


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
});
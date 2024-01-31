import React, { useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";
import { v4 } from "uuid";
import { Jeu } from "../../../Utils/Types";

export type ChoixZonesRefType = {
    getZones: () => string[];
};

export type ChoixZonesProps = {
    jeux : Jeu[];
};

export const ChoixZones = React.forwardRef((props: ChoixZonesProps, ref) => {
    const zonesParDefaut = [
        "Accueil Bénévoles",
        "Accueil Public",
        "Accueil VIP",
        "Bar",
    ];

    const [zones, setZones] = useState(zonesParDefaut);
    const inputRef = useRef<HTMLInputElement | null>(null)

    const ajouterZone = (nom: string) => {
        setZones([...zones, nom]);
    }

    const creeZone = (zone: string, index: number) => {
        return (
            <div
                className='flex flex-row justify-between items-center'
                key={v4()}
            >
                <div className='p-2 border-2 border-gray-400 rounded-lg flex flex-row items-center'>
                    <input type='text' defaultValue={zone} className='bg-transparent' />
                    <BiTrash color='red' size={20} onClick={() => handleSupprimerZone(index)} />

                </div>
            </div>
        );
    }

    const handleAjouterZone = () => {
        if (inputRef.current!.value === '') return;
        ajouterZone(inputRef.current!.value);
        inputRef.current!.value = '';
    }

    const handleSupprimerZone = (index: number) => {
        const zonesCopie = [...zones];
        zonesCopie.splice(index, 1);
        setZones(zonesCopie);
    }

    React.useImperativeHandle(ref, () => ({
        getZones() {
            return zones;
        }
    }));

    return (
        <div>
            <h2 className='text-2xl font-bold'>
                Zones
            </h2>
            <div className='flex flex-col items-center gap-3'>
                <div className='flex flex-row justify-between items-center p-4'>
                    <div className='flex flex-row justify-between items-center'>
                        <input type='text' ref={inputRef} className='border-2 border-gray-400 rounded-lg p-2' />
                        <TiPlus color='green' size={20} onClick={handleAjouterZone} />
                    </div>
                </div>
                {zones.map((zone, index) => creeZone(zone, index))}
            </div>
        </div>
    );
});
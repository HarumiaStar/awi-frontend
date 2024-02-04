import React, { useEffect, useReducer, useRef } from "react";
import { TiPlus } from "react-icons/ti";
import { zoneFromJeuxTriees } from "../../../Utils/Types";
import { DisplayZone } from "./DisplayZone";
import { v4 } from "uuid";
import { DonneesFestival, RegisterDonneesFestivalRef } from "../DonneesFestival";


export type ChoixZonesProps = {
    donneesFestival: DonneesFestival;
};

export type ChoixZonesRef = RegisterDonneesFestivalRef & {
    update(): void;
}

export default function ChoixZones({ donneesFestival }: ChoixZonesProps) {

    if (donneesFestival.zones.length === 0) {
        donneesFestival.zones = zoneFromJeuxTriees(donneesFestival.jeux, "alphabétique")
    }

    const zones = donneesFestival.zones;

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const inputRef = useRef<HTMLInputElement | null>(null)

    /* -------------------------------------------------------------------------- */
    /*                                    HOOKS                                   */
    /* -------------------------------------------------------------------------- */
    

    useEffect(() => {
        donneesFestival.registerComponent(selfRef, 'jeux');
    }, [donneesFestival]);

    const selfRef = useRef<ChoixZonesRef>(null);

    React.useImperativeHandle(selfRef, () => ({
        update: () => {forceUpdate();}
    }));



    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */
    const ajouterZone = (nom: string) => {
        const zone = {
            nom: nom,
            zonesBenevoles: [],
        }
        donneesFestival.ajouterZone(zone);
        forceUpdate();
    }

    const handleAjouterZone = () => {
        if (inputRef.current!.value === '') return;
        ajouterZone(inputRef.current!.value);
        inputRef.current!.value = '';
    }

    const onChangeZone = (index: number, newName: string) => {
        const zonesCopie = [...zones];
        zonesCopie[index].nom = newName;
        donneesFestival.zones = zonesCopie;
        forceUpdate();
    }

    const onChangeZoneBenevole = (indexZone: number, oldName: string, newName: string) => {
        const zonesCopie = [...zones];
        zonesCopie[indexZone].zonesBenevoles.forEach((zoneBenevole, index) => {
            if (zoneBenevole === oldName) {
                zonesCopie[indexZone].zonesBenevoles[index] = newName;
            }
        });
        donneesFestival.zones = zonesCopie;
        forceUpdate();
    }

    const onDeleteZone = (index: number) => {
        const zonesCopie = [...zones];
        zonesCopie.splice(index, 1);
        donneesFestival.zones = zonesCopie;
        forceUpdate();
    }

    const onDeleteZoneBenevole = (indexZone: number, name: string) => {
        const zonesCopie = [...zones];
        zonesCopie[indexZone].zonesBenevoles = zonesCopie[indexZone].zonesBenevoles.filter(zoneBenevole => zoneBenevole !== name);
        donneesFestival.zones = zonesCopie;
        forceUpdate();

    }

    const onAddZoneBenevole = (indexZone: number, name: string) => {
        const zonesCopie = [...zones];
        zonesCopie[indexZone].zonesBenevoles.push(name);
        donneesFestival.zones = zonesCopie;
        forceUpdate();
    }


    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */

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
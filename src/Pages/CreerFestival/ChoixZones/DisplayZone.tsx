import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { DetailZone, TimerReset } from "../../../Utils/Types";
import { BiTrash } from "react-icons/bi";
import { v4 } from "uuid";
import { useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";

export type DisplayZoneProps = {
    zone: DetailZone,
    indexZone: number,
    zoneHandlers: {
        handleSupprimerZone: (index: number) => void,
        handleOnChangerNomZone: (index: number, nom: string) => void,
    },
    zoneBenevoleHandlers: {
        handleChangeZoneBenevole: (indexZone: number, oldName: string, newName: string) => void,
        handleSupprimerZoneBenevole: (indexZone: number, name: string) => void,
        handleAjouterZoneBenevole: (indexZone: number, name: string) => void,
    }
}

export const DisplayZone = ({ zone, indexZone, zoneHandlers, zoneBenevoleHandlers }: DisplayZoneProps) => {

    const displayMoreRef = useRef<HTMLDivElement>(null);
    const nouvellZoneBenenvoleRef = useRef<HTMLInputElement>(null);
    const [zoneBenevole, setZoneBenevole] = useState<string[]>(zone.zonesBenevoles);

    function handleDisplayMore() {
        if (displayMoreRef.current?.classList.contains('hidden')) {
            displayMoreRef.current?.classList.remove('hidden');
            displayMoreRef.current?.classList.add('flex');
        } else {
            displayMoreRef.current?.classList.add('hidden');
            displayMoreRef.current?.classList.remove('flex');
        }
    }

    const onChangeZoneBenevole = (index: number, newName: string) => {

        const timer = TimerReset.getInstance();
        timer.setTimer(('zoneBenevole'+index+newName), () => {
            saveChangesZoneBenvole(index, newName);
        }, 1000);
    }

    const onBlurZoneBenevole = (index: number, newName: string) => {
        TimerReset.getInstance().clearTimer('zoneBenevole'+index+newName);

        saveChangesZoneBenvole(index, newName);
    }

    const saveChangesZoneBenvole = (index: number, newName: string) => {
        console.log('save changes');
        const oldName = zoneBenevole[index];
        const zoneBenevoleCopie = [...zoneBenevole];
        zoneBenevoleCopie[index] = newName;
        setZoneBenevole(zoneBenevoleCopie);
        zoneBenevoleHandlers.handleChangeZoneBenevole(indexZone, oldName, newName);
    }

    const handleAjouterZoneBenevole = () => {
        const newName = nouvellZoneBenenvoleRef.current?.value;
        if (!newName) return;
        const zoneBenevoleCopie = [...zoneBenevole];
        zoneBenevoleCopie.push(newName);
        setZoneBenevole(zoneBenevoleCopie);
        zoneBenevoleHandlers.handleAjouterZoneBenevole(indexZone, newName);
    }

    const onChangeZone = async (index: number, newName: string) => {
        TimerReset.getInstance().setTimer('zone'+index, () => {
            saveChangesZone(index, newName);
        }, 1000);
    }

    const onBlurZone = async (index: number, newName: string) => {
        TimerReset.getInstance().clearTimer('zone'+index);

        saveChangesZone(index, newName);
    }

    const saveChangesZone = (index: number, newName: string) => {
        console.log('save changes Zone');
        zoneHandlers.handleOnChangerNomZone(index, newName);
    }



    return (
        <div
            className='flex flex-col justify-between items-center border-2 border-gray-400 p-2 rounded-lg '
            key={v4()}
        >
            <div className='flex flex-row items-center'>
                <MdOutlineSubdirectoryArrowRight size={20} color="gray" className="cursor-pointer" onClick={handleDisplayMore} />
                <input
                    type='text'
                    defaultValue={zone.nom}
                    className='bg-transparent'
                    onChange={(event) => onChangeZone(indexZone, event.target.value)}
                    onBlur={(event) => onBlurZone(indexZone, event.target.value)}
                />
                <BiTrash color='red' size={20} onClick={() => zoneHandlers.handleSupprimerZone(indexZone)} />

            </div>
            <div className='pt-3 flex-col gap-2 hidden' ref={displayMoreRef}>
                <div className='flex flex-row items-center'>
                    <input type='text' placeholder="Nouvelle zone bénévole" className='bg-transparent' ref={nouvellZoneBenenvoleRef} />
                    <TiPlus color='green' size={20} onClick={() => handleAjouterZoneBenevole()} />
                </div>
                {zone.zonesBenevoles.map((zoneBenevole) => {
                    return (
                        <div className='flex flex-row items-center' key={v4()}>
                            <input
                                type='text'
                                defaultValue={zoneBenevole}
                                className='bg-transparent'
                                key={v4()}
                                onChange={(event) => onChangeZoneBenevole(indexZone, event.target.value)}
                                onBlur={(event) => onBlurZoneBenevole(indexZone, event.target.value)}
                            />
                            <BiTrash color='red' size={20} onClick={() => zoneBenevoleHandlers.handleSupprimerZoneBenevole(indexZone, zoneBenevole)} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

    
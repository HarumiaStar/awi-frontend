import React, { useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { TiPlus } from 'react-icons/ti';
import { v4 } from 'uuid';

export const ChoixActivité = React.forwardRef((props, ref) => {
    const activitesParDefaut = [
        "Accueil Bénévoles",
        "Accueil Public",
        "Accueil VIP",
        "Bar",
    ];

    const [activites, setActivites] = useState(activitesParDefaut);
    const inputRef = useRef<HTMLInputElement | null>(null)

    const ajouterActivite = (nom: string) => {
        setActivites([...activites, nom]);
    }

    const creeActivite = (activite: string, index: number) => {
        return (
            <div
                className='flex flex-row justify-between items-center'
                key={v4()}
            >
                <div className='p-2 border-2 border-gray-400 rounded-lg flex flex-row items-center'>
                    <input type='text' defaultValue={activite} className='bg-transparent' />
                    <BiTrash color='red' size={20} onClick={() => handleSupprimerActivite(index)} />

                </div>
            </div>
        );
    }

    const handleAjouterActivite = () => {
        if (inputRef.current!.value === '') return;
        ajouterActivite(inputRef.current!.value);
        inputRef.current!.value = '';
    }

    const handleSupprimerActivite = (index: number) => {
        const activitesCopie = [...activites];
        activitesCopie.splice(index, 1);
        setActivites(activitesCopie);
    }

    React.useImperativeHandle(ref, () => ({
        getActivites() {
            return activites;
        }
    }));

    return (
        <div>
            <h2 className='text-2xl font-bold'>
                Activités par générales (hors zones)
            </h2>
            <div className='flex flex-col items-center gap-3'>
                <div className='flex flex-row justify-between items-center p-4'>
                    <div className='flex flex-row p-2 border-2 border-gray-400 rounded-lg align-middle border-dotted'>
                        <input type='text' placeholder='Nouvelle activité' className='bg-transparent' ref={inputRef} />
                        <TiPlus color='green' size={25} onClick={handleAjouterActivite} />
                    </div>
                </div>

                {activites.map((activite, index) => creeActivite(activite, index))}
            </div>
        </div>
    );
});
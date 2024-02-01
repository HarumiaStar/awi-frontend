import { useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { TiPlus } from 'react-icons/ti';
import { v4 } from 'uuid';
import { DonneesFestival } from '../DonneesFestival';

export type ChoixActiviteProps = {
    donneesFestival: DonneesFestival;
}

export default function ChoixActivite({ donneesFestival }: ChoixActiviteProps) {
    /* ---------------------------------- DATA ---------------------------------- */

    const activitesParDefaut = [
        "Accueil Bénévoles",
        "Accueil Public",
        "Accueil VIP",
        "Bar",
    ];

    const [activites, setActivites] = useState(activitesParDefaut);
    const inputRef = useRef<HTMLInputElement | null>(null)


    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */

    const handleAjouterActivite = () => {
        if (inputRef.current!.value === '') return;
        donneesFestival.ajouterActivite(inputRef.current!.value);
        setActivites([...activites, inputRef.current!.value]);
        inputRef.current!.value = '';
    }

    const handleSupprimerActivite = (index: number) => {
        donneesFestival.supprimerActivite(activites[index]);
        const activitesCopie = [...activites];
        activitesCopie.splice(index, 1);
        setActivites(activitesCopie);
    }



    /* -------------------------------------------------------------------------- */
    /*                                FIN HANDLERS                                */
    /* -------------------------------------------------------------------------- */



    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */



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
}
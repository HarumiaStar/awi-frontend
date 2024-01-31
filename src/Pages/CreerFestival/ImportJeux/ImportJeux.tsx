import React, { useRef } from "react"
import { FileDND, fileDNDRefType } from "../../../Utils/Form"
import Modale, { ModaleRefType } from "../../../Utils/Modale";
import Alerte, { AlerteRefType } from "../../../Utils/Alerte";
import { BiTrash } from "react-icons/bi";
import { Jeu, Tuple, jeuxParserFichier } from "../../../Utils/Types";
import { AffichageJeu } from "./AffichageJeu/AffichageJeu";
import { RxCross2 } from "react-icons/rx";

export type ImportJeuxProps = {
}

const ImportJeux = React.forwardRef((props: ImportJeuxProps, ref) => {

    const modalRef = useRef<ModaleRefType>(null);
    const AlerteRef = useRef<AlerteRefType>(null);
    const filesRef = useRef<HTMLDivElement>(null);
    const fileDNDRef = useRef<fileDNDRefType>(null);

    const [data, setData] = React.useState<Tuple<File, Jeu[]> | null>(null);

    const fileRemplace = async (file: File, index: number) => {
        fileDNDRef.current?.removeFile(index);
        setData(new Tuple(file, await jeuxParserFichier(file)));
    }

    const onFileChange = async (files: FileList) => {
        if (files.length === 0) {
            console.log("Aucun fichier");
            return;
        }

        const fichierCourant = files[files.length - 1];

        // Vérification que le fichier est bien un csv
        const newFile = fichierCourant;
        const extension = newFile.name.split('.').pop();
        if (extension !== "csv") {
            AlerteRef.current?.open(
                "Erreur",
                "Le fichier doit être un csv",
                () => { }, // onConfirm
                () => { }, // onCancel
                "Ok",
                "Annuler"
            );
            fileDNDRef.current?.removeFile(0);
            return;
        }

        if (files.length > 1) {


            AlerteRef.current?.open(
                "Erreur",
                "Vous ne pouvez ajouter qu'un seul fichier",
                () => { fileRemplace(fichierCourant, files.length - 1) }, // onConfirm
                () => { }, // onCancel
                "Remplacer",
                "Annuler"
            );
            return;
        }

        const file = files[0];
        setData(new Tuple(file, await jeuxParserFichier(file)));
    }

    let fileDescription: JSX.Element | null = null;

    if (data) {
        fileDescription = (
            <div className="flex flex-row items-center justify-between gap-6">
                <div className="text-lg font-bold">
                    {data.item1.name}
                </div>
                <div className="text-sm">
                    {data.item1.size} octets
                </div>
                <div
                    className="text-sm"
                    onClick={() => {
                        setData(null);
                        fileDNDRef.current?.removeAll();
                    }} >
                    <BiTrash color='red' size={20} className="cursor-pointer" />
                </div>
            </div>
        );
    }

    return (
        <>
            <Alerte ref={AlerteRef} />
            <h2 className='text-2xl font-bold'>
                Import des jeux (fichier csv)
            </h2>
            <FileDND ref={fileDNDRef} onChanges={onFileChange} />
            <div ref={filesRef}>
                {fileDescription}
            </div>
            <div className='flex-column items-center justify-center' style={{ display: data ? "flex" : "none" }}>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        modalRef.current?.open();
                    }}
                >
                    Examiner
                </button>
                <Modale ref={modalRef} bg="bg-gray-900 rounded-lg h-3/4 border border-gray-300">
                    <div className='flex flex-row-reverse justify-between items-center p-2'>
                        <RxCross2 onClick={() => { modalRef.current?.close() }} size={30} className="cursor-pointer" color="red" />
                    </div>
                    <div className='flex flex-col gap-10 p-10'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='text-2xl font-bold'>
                                {data?.item1.name}
                            </div>
                            <div className='text-sm'>
                                {data?.item1.size} octets
                            </div>
                        </div>
                        <div className='text-xl font-bold'>
                            Affichage des jeux
                        </div>
                        <div className='flex flex-col gap-2'>
                            {data?.item2.map((jeu, index) => {
                                return (
                                    <AffichageJeu key={index} jeu={jeu} />
                                )
                            })}
                        </div>
                    </div>
                </Modale>
            </div>
        </>)

})

export default ImportJeux
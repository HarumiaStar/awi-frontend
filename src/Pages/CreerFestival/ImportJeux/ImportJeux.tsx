import React, { useRef } from "react"
import { FileDND, fileDNDRefType } from "../../../Utils/Form"
import Modale, { ModaleRefType } from "../../../Utils/Modale";
import Alerte, { AlerteRefType } from "../../../Utils/Alerte";
import ReactDOM from "react-dom";
import { BiTrash } from "react-icons/bi";
import { jeuxParser, jeuxParserFichier } from "../../../Utils/Types";

export type ImportJeuxProps = {
}

const ImportJeux = React.forwardRef((props: ImportJeuxProps, ref) => {

    const modalRef = useRef<ModaleRefType>(null);
    const AlerteRef = useRef<AlerteRefType>(null);
    const filesRef = useRef<HTMLDivElement>(null);
    const fileDNDRef = useRef<fileDNDRefType>(null);

    const [file, setFile] = React.useState<File | null>(null);

    const fileRemplace = (file: File) => {
        setFile(file);
    }

    const onFileChange = async (files: FileList) => {
        if (files.length === 0) return;

        // Vérification que le fichier est bien un csv
        const newFile = files[0];
        const extension = newFile.name.split('.').pop();
        console.log(extension);
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
                () => { fileRemplace(files[0]) }, // onConfirm
                () => { }, // onCancel
                "Remplacer",
                "Annuler"
            );
            return;
        }



        const file = files[0];
        console.log(await jeuxParserFichier(file));
        setFile(file);
    }

    let fileDescription: JSX.Element | null = null;

    if (file) {
        fileDescription = (
            <div className="flex flex-row items-center justify-between">
                <div className="text-lg font-bold">
                    {file.name}
                </div>
                <div className="text-sm">
                    {file.size} octets
                </div>
                <div className="text-sm">
                    <BiTrash color='red' />
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
            <div className='flex-column items-center justify-center' style={{ display: file ? "flex" : "none" }}>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        modalRef.current?.open();
                    }}
                >
                    Examiner
                </button>
                <Modale ref={modalRef}>
                    <div className='flex flex-column'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='text-2xl font-bold'>
                                {file?.name}
                            </div>
                            <div className='text-sm'>
                                {file?.size} octets
                            </div>
                        </div>
                    </div>
                </Modale>
            </div>
        </>)

})

export default ImportJeux
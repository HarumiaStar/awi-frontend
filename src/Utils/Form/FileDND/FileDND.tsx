import React, { useRef, useState } from "react";

type fileDNDProps = {
    onChanges?: (files: FileList) => void;
};

type fileDNDRefType = {
    getFiles: () => FileList;
    removeFile: (index: number) => void;
    getFile: (index: number) => File;
    getFileCount: () => number;
    humanFileSize: (size: number) => string;
    removeAll: () => void;
};

const FileDND = React.forwardRef((props: fileDNDProps, ref: React.Ref<fileDNDRefType>) => {
    const [files, setFiles] = useState<FileList>(new DataTransfer().files);
    const [fileDragging, setFileDragging] = useState<number | null>(null);
    const [fileDropping, setFileDropping] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    function createFileList(files: File[], newFiles: File[] = []): FileList {
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        newFiles.forEach(file => dataTransfer.items.add(file));
        return dataTransfer.files;
    }

    function humanFileSize(size: number) : string {
        const i: number = Math.floor(Math.log(size) / Math.log(1024));
        return (
            parseFloat((size / Math.pow(1024, i)).toFixed(2)) + " " + ["B", "kB", "MB", "GB", "TB"][i]
        );
    }

    function remove(index: number) {
        const filesCurrent = [...files];
        filesCurrent.splice(index, 1);

        const newFiles = createFileList(filesCurrent);
        setFiles(newFiles);
    }
    function drop() {
        const currentFiles = [...files];

        if (fileDragging === null) {
            alert("fileDragging is null");
            return;
        }
        if (fileDropping === null) {
            alert("fileDropping is null");
            return;
        }

        if (fileDragging === fileDropping) return;

        const removed = currentFiles.splice(fileDragging, 1);
        currentFiles.splice(fileDropping, 0, ...removed);

        const add = createFileList(currentFiles);
        setFiles(add);

        setFileDragging(null);
        setFileDropping(null);
        
        if (props.onChanges) {
            props.onChanges(add);
        }
    }

    function removeAll() {
        setFiles(createFileList([]));
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function addFiles(e: React.ChangeEvent<HTMLInputElement>) {
        const currentFiles = createFileList([...files], [...(e.target.files ?? [])]);
        setFiles(currentFiles);
        if (props.onChanges) {
            props.onChanges(currentFiles);
        }
    }

    /* --------------------------- Object interaction --------------------------- */

    function getFiles() : FileList {
        return files;
    }

    function removeFile(index: number) {
        remove(index);
    }

    function getFile(index: number) {
        return files[index];
    }

    function getFileCount() {
        return files.length;
    }

    React.useImperativeHandle(ref, () => ({
        getFiles,
        removeFile,
        getFile,
        getFileCount,
        humanFileSize,
        removeAll
    }));

    function handleOnDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.classList.add('border-blue-400');
        e.currentTarget.classList.add('ring-4');
        e.currentTarget.classList.add('ring-inset');
    }

    function handleOnDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.classList.remove('border-blue-400');
        e.currentTarget.classList.remove('ring-4');
        e.currentTarget.classList.remove('ring-inset');
    }

    function handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.classList.remove('border-blue-400');
        e.currentTarget.classList.remove('ring-4');
        e.currentTarget.classList.remove('ring-inset');
        drop();
    }

    return (<>
        <div className="bg-lighter-100 rounded w-9/12 m-4">
            <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
                <div className="relative flex flex-col text-gray-300 border border-gray-200 border-dashed rounded cursor-pointer">
                    <input accept="*" type="file" multiple
                        className="absolute inset-0 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        onChange={addFiles}
                        onDragOver={handleOnDragOver}
                        onDragLeave={handleOnDragLeave}
                        onDrop={handleOnDrop}
                        title="" 
                        ref={inputRef}
                    />

                    <div className="flex flex-col items-center justify-center py-5 text-center">
                        <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="m-0">Glisser et déposer des fichiers ici ou cliquer pour en sélectionner</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
});

export default FileDND;

export type {fileDNDRefType, fileDNDProps}
import React, { useRef, useState } from "react";


export type AlerteRefType = {
    open: (header: string, message: string, onAccept: () => void, onCancel: () => void, acceptText?: string, cancelText?: string) => void;
    close: () => void;
};

const Alerte = React.forwardRef((props: any, ref: React.Ref<AlerteRefType>) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [contenu, setContenu] = useState<React.ReactNode>(null);



    React.useImperativeHandle(ref, () => ({
        open: (header: string, message: string, onAccept: () => void, onCancel: () => void, acceptText: string = "Accepter", cancelText: string = "Annuler") => {
            setContenu(createModal(header, message, onAccept, onCancel, acceptText, cancelText));
        },
        close: () => {
            setContenu(null);
        }
    }));


    let containerClass = "bg-white rounded-lg shadow-lg p-4 flex flex-col border-2 border-gray-400"

    if (props.type === "error") {
        containerClass += " border-red-500"
    } else {
        containerClass += " border-green-500"
    }

    const createModal = (header: string, message: string, onAccept: () => void, onCancel: () => void, acceptText: string, cancelText: string) => {
        return (
            <div className={containerClass}>
                <div className="text-2xl font-bold text-black">
                    {header}
                </div>
                <div className="text-lg text-black mt-4">
                    <div>
                        {message}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setContenu(null);
                                onAccept(); 
                            }}
                            className="bg-green-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-green-500"
                        >
                            {acceptText}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setContenu(null);
                                onCancel(); 
                            }}
                            className="bg-red-400 text-gray-900 px-4 py-2 rounded-lg ml-4 hover:bg-red-500"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen z-50 fixed top-0 left-0 bg-darker-400" style={{ display: contenu ? "flex" : "none" }} ref={containerRef}>
            {contenu}
        </div> 
    );

});

export default Alerte;
import React from 'react';

export type ModaleProps = {
    children: React.ReactNode;
    bg?: string;
}

export type ModaleRefType = {
    open: () => void;
    close: () => void;
}

const Modale = React.forwardRef((props: ModaleProps, ref: React.Ref<ModaleRefType>) => {

    const [open, setOpen] = React.useState(false);

    // Event listener for escape key
    React.useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    React.useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false)
    }));

    return <div
        className="z-50 absolute inset-0 bg-black bg-opacity-50 h-screen w-screen top-0 left-0 flex items-center justify-center flex-col"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={{ display: open ? "flex" : "none" }}
    >
        <div className="flex flex-column items-center justify-center p- rounded-lg w-1/2 h-1/2" style={{ backgroundColor: props.bg ?? "white" }}>
            {props.children}
        </div>
    </div>
});

export default Modale
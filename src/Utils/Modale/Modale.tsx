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

    let contentClasses = "rounded-lg overflow-auto shadow-xl transform transition-all sm:max-w-lg sm:w-full";
    if( props.bg ) {
        contentClasses += " " + props.bg;
    }

    return <div
        className="z-50 absolute bg-black bg-opacity-50 h-screen w-screen top-0 left-0 flex items-center justify-center flex-col"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={{ display: open ? "flex" : "none" }}
    >
        <div className={contentClasses}>
            {props.children}
        </div>
    </div>
});

export default Modale
import React, { useEffect, useRef } from "react";
import { DisplayJour, DisplayJourRef } from "./DisplayJours";

export type PeriodPickerModalProps = {
    onDateDebutChange: (date: Date | null) => void;
    onDateFinChange: (date: Date | null) => void;
}

export type PeriodPickerModalRef = {
    open: () => void;
    close: () => void;
    toggle: () => void;
    getDates: () => { dateDebut: Date | null, dateFin: Date | null };
}

export const PeriodPickerModal = React.forwardRef((props: PeriodPickerModalProps, ref: React.Ref<PeriodPickerModalRef>) => {
    const [mois, setMois] = React.useState(1);
    const [annee, setAnnee] = React.useState(2024);
    const [open, setOpen] = React.useState(false);
    const joursRef = useRef<DisplayJourRef>(null);

    const today = new Date();
    const minAnnee = today.getFullYear();
    const maxAnnee = today.getFullYear() + 6;

    const anneeListe = [];
    for (let i = minAnnee; i <= maxAnnee; i++) {
        anneeListe.push(i);
    }

    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */

    const handleAujourdhui = () => {
        setMois(today.getMonth());
        setAnnee(today.getFullYear());
    }

    React.useImperativeHandle(ref, () => ({
        open: () => { setOpen(true)},
        close: () => { setOpen(false)},
        toggle: () => { setOpen(!open)},
        getDates: () => { return { dateDebut: new Date(annee, mois, 1), dateFin: new Date(annee, mois + 1, 0) } }
    }));

    const handleDateFinChangeMiddleware = (date: Date | null) => {
        props.onDateFinChange(date);
        if(joursRef.current === null) return;
        if(joursRef.current.getDates().dateFin === null) return;
        setOpen(false);
    }

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /*                                   RENDER                                   */
    /* -------------------------------------------------------------------------- */

    return (<div className={"z-20 bg-slate-500 rounded-lg absolute top-10 p-3 right-0" + (open ? "" : " hidden")}>
        <div className="flex flex-col items-center h-full w-full">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-1">
                    <select
                        className="rounded-lg bg-slate-400 p-2 font-bold text-white"
                        onChange={(event) => setMois(parseInt(event.target.value))}
                        value={mois}
                    >
                        <option value="0">Janvier</option>
                        <option value="1">Février</option>
                        <option value="2">Mars</option>
                        <option value="3">Avril</option>
                        <option value="4">Mai</option>
                        <option value="5">Juin</option>
                        <option value="6">Juillet</option>
                        <option value="7">Août</option>
                        <option value="8">Septembre</option>
                        <option value="9">Octobre</option>
                        <option value="10">Novembre</option>
                        <option value="11">Décembre</option>
                    </select>
                    <div className="flex flex-col">
                        <div
                            className="cursor-pointer hover:bg-slate-400 rounded-lg px-2 py-1"
                            style={{ rotate: "90deg" }}
                            onClick={() => {
                                if (mois === 11) {
                                    setMois(0);
                                    if(annee !== maxAnnee)
                                        setAnnee(annee + 1);
                                }
                                else {
                                    setMois(mois + 1);
                                }
                            }}
                        >
                            {"<"}
                        </div>
                        <div
                            className="cursor-pointer hover:bg-slate-400 rounded-lg px-2 py-1"
                            onClick={() => {
                                if (mois === 0) {
                                    setMois(11);
                                    if(annee !== minAnnee)
                                        setAnnee(annee - 1);
                                }
                                else {
                                    setMois(mois - 1);
                                }
                            }}
                            style={{ rotate: "90deg" }}
                        >
                            {">"}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-1">
                    <select
                        className="rounded-lg bg-slate-400 p-2 font-bold text-white"
                        onChange={(event) => setAnnee(parseInt(event.target.value))}
                        value={annee}>
                        {anneeListe.map((annee) => (<option key={annee} value={annee}>{annee}</option>))}
                    </select>
                    <div className="flex flex-col">
                        <div
                            className="cursor-pointer hover:bg-slate-400 rounded-lg px-2 py-1"
                            onClick={() => {
                                if (annee !== maxAnnee)
                                    setAnnee(annee + 1); 
                            }}
                            style={{ rotate: "90deg" }}
                        >
                            {"<"}
                        </div>
                        <div
                            className="cursor-pointer hover:bg-slate-400 rounded-lg px-2 py-1"
                            onClick={() => {
                                if (annee !== minAnnee)
                                    setAnnee(annee - 1);
                            }}
                            style={{ rotate: "90deg" }}
                        >
                            {">"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between w-full">
                <DisplayJour mois={mois} annee={annee} onDateDebutChange={props.onDateDebutChange} onDateFinChange={handleDateFinChangeMiddleware} ref={joursRef} />
            </div>
            <div className="flex flex-row-reverse justify-between w-full">
                <div
                    className="cursor-pointer hover:bg-slate-400 rounded-lg p-2"
                    onClick={handleAujourdhui}
                >
                    Aujourd'hui
                </div>
            </div>
        </div>

    </div>)

});
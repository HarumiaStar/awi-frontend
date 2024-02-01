import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { PeriodPickerModal, PeriodPickerModalRef } from "./PeriodPickerModal/PeriodPickerModal";
import { useRef } from "react";
import { dateToStringFr } from "../../Types";

export type PeriodPickerProps = {
    onDateDebutChange?: (date: Date | null) => void;
    onDateFinChange?: (date: Date | null) => void;
    onDatesChange?: (dates: { dateDebut: Date | null, dateFin: Date | null }) => void;
}

export default function PeriodPicker({ onDateDebutChange, onDateFinChange, onDatesChange }: PeriodPickerProps) {

    const periodPickerModalRef = useRef<PeriodPickerModalRef>(null);
    const dateDebutInputRef = useRef<HTMLInputElement>(null);
    const dateFinInputRef = useRef<HTMLInputElement>(null);

    const onDateDebutChangeHandle = (date: Date | null) => {
        if (dateDebutInputRef.current === null) return;
        if (date === null) {
            dateDebutInputRef.current!.value = "";
            return;
        }
        dateDebutInputRef.current.value = dateToStringFr(date);
        if (onDateDebutChange) onDateDebutChange(date);
    }

    const onDateFinChangeHandle = (date: Date | null) => {
        if (dateFinInputRef.current === null) return;
        if (date === null) {
            dateFinInputRef.current!.value = "";
            return;
        }
        dateFinInputRef.current.value = dateToStringFr(date);
        if (onDateFinChange) onDateFinChange(date);
    }

    const onTypingHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
        event.stopPropagation();
        event.preventDefault();

        // Get the value of the input
        const value = event.currentTarget.value;
        const keyTyped = event.key;

        // if the key typed is not a character, return
        if (keyTyped.length > 1) {
            return;
        }

        // If the key typed is not a number, remove the last character
        if (isNaN(parseInt(keyTyped)) && keyTyped !== "/") {
            event.currentTarget.value = value.slice(0, -1);
            return;
        }

        // get all numbers in the input
        const numbers = value.match(/\d/g);
        if (numbers === null) {
            return;
        }

        if (keyTyped === "/") {
            event.currentTarget.value = value.slice(0, -1);
            return;
        }

        let numbersString = numbers.join("");

        // if their is more than 8 numbers, remove the last one
        if (numbers.length > 8) {
            event.currentTarget.value = value.slice(0, -1);
            return;
        }

        // if their is more than 2 numbers, add a slash between the 2nd and 3rd number
        if (numbers.length >= 2) {
            numbersString = numbersString.slice(0, 2) + "/" + numbersString.slice(2);
        }

        // if their is more than 5 numbers, add a slash between the 5th and 6th number
        if (numbers.length >= 4) {
            numbersString = numbersString.slice(0, 5) + "/" + numbersString.slice(5);
        }

        // set the input value
        event.currentTarget.value = numbersString;

    }


    return (
        <div className="relative">
            <div className="flex flex-row-reverse gap-2">
                <div className="flex flex-col align-middle justify-center">
                    <FaCalendarAlt
                        className="cursor-pointer hover:bg-slate-400 px-2 py-1 rounded-lg"
                        size={30}
                        onClick={() => periodPickerModalRef.current?.toggle()}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        {/* Input date dans datePicker */}
                        <input
                            type="text"
                            className="rounded-lg bg-slate-400 p-2 font-bold text-white placeholder:text-gray-700"
                            onKeyUp={onTypingHandler}
                            ref={dateDebutInputRef}
                            placeholder="dd/mm/yyyy"
                        />
                    </div>
                    <div className="flex flex-col align-middle justify-center">
                        <FaArrowRight />
                    </div>
                    <div>
                        {/* Input date dans datePicker */}
                        <input
                            type="text"
                            className="rounded-lg bg-slate-400 p-2 font-bold text-white placeholder:text-gray-700"
                            onKeyUp={onTypingHandler}
                            ref={dateFinInputRef}
                            placeholder="dd/mm/yyyy"
                        />
                    </div>
                </div>

            </div>

            <PeriodPickerModal onDateDebutChange={onDateDebutChangeHandle} onDateFinChange={onDateFinChangeHandle} ref={periodPickerModalRef} onDatesChange={onDatesChange} />
        </div>
    )
}
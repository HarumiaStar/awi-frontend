import { v4 } from "uuid";
import style from "./button.module.css";

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined,
    text: string,
    icon?: JSX.Element,
    id?: string,
    containerClass?: string,
    inputClass?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    replaceInputClass?: string
}

export default function Button({ type, text, icon, id, containerClass, inputClass, onClick, replaceInputClass }: ButtonProps): JSX.Element {
    let buttonClasses = style.buttonInput;
    if (inputClass !== undefined)
        buttonClasses = buttonClasses + " " + inputClass;

    if (replaceInputClass !== undefined)
        buttonClasses = replaceInputClass;

    return (
        <div className='flex flex-col items-center justify-center w-full h-full my-5'>
            <button
                type={type}
                id={id ? id : v4()}
                className='px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200'
                onClick={onClick}>
                {icon}
                {text}
            </button>
        </div>
    );
}
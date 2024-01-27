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
        <div className={style.buttonContainer + (containerClass !== undefined ? " " + containerClass : "")}>
            <button type={type} id={id ? id : v4()} className={buttonClasses} onClick={onClick}>
                {icon}
                {text}
            </button>
        </div>
    );
}
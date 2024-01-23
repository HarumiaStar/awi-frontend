import style from './input.module.css';

interface InputProps {
    type : string,
    placeholder : string,
    icon : JSX.Element,
    id : string,
    containerClass? : string,
    inputClass? : string
}

export default function Input({type, placeholder, icon, id, containerClass, inputClass} : InputProps) : JSX.Element {
    const containerClickHandler = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const input = document.getElementById(id);
        if(input !== null)
            input.focus();
    }


    return (
        <div className={style.formInput + " " + containerClass} onClick={containerClickHandler}>
            {icon}
            <input type={type} placeholder={placeholder} id={id} className={inputClass} />
        </div>
    );
}
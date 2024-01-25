import style from './input.module.css';

interface InputProps {
    type : string,
    placeholder : string,
    icon : JSX.Element,
    id : string,
    containerClass? : string,
    inputClass? : string,
    error?: boolean
    onChange? : (event : React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({type, placeholder, icon, id, containerClass, inputClass, error = false, onChange} : InputProps) : JSX.Element {
    const containerClickHandler = (event : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const input = document.getElementById(id);
        if(input !== null)
            input.focus();
    }


    return (
        <div className={style.formInput + " " + containerClass + " " + (error ? style.error : "")} onClick={containerClickHandler}>
            {icon}
            <input type={type} placeholder={placeholder} id={id} className={inputClass} onChange={onChange}/>
        </div>
    );
}
import style from './input.module.css';

export default function Input({type, placeholder, icon, id, containerClass, inputClass} : {type : string, placeholder : string, icon : JSX.Element, id : string, containerClass : string, inputClass : string}) {
    return (
        <div className={style.formInput + " " + containerClass}>
            {icon}        
            <input type={type} placeholder={placeholder} id={id} className={inputClass} />
        </div>
    );
}
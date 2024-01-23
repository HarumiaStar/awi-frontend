import style from "./form.module.css";

interface IForm {
    children: JSX.Element | JSX.Element[],
    className?: string
}

export default function Form({ children, className }: IForm): JSX.Element {
    return <form className={style.form + (className !== undefined ? " " + className : "")}>
        {children}
    </form>;
}

import { v4 } from "uuid";
import style from "./form.module.css";
import React from "react";

interface IForm {
    children: JSX.Element | JSX.Element[],
    className?: string,
    id?: string,
    ref?: React.RefObject<HTMLFormElement>;
}

export default function Form({ children, className, id=v4(), ref }: IForm): JSX.Element {
    return <form className={style.form + (className !== undefined ? " " + className : "")} id={id} ref={ref}>
        {children}
    </form>;
}

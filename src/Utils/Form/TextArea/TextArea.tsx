import { v4 } from "uuid";

import styles from "./TextArea.module.css";

interface TextAreaProps {
    label: string;
    id?: string;
    icon?: JSX.Element;
}

export default function TextArea({ label, id = v4(), icon }: TextAreaProps) {
    const containerClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const input = document.getElementById(id) as HTMLInputElement;
        input.focus();
    }

    return (
        <div className={styles.form_control} onClick={containerClick}>
            <div className={styles.labelContainer}>
                {icon}
                <label htmlFor={id}>{label}</label>
            </div>
            <textarea id={id} />
        </div>
    )
}
import styles from "./DatePicker.module.css";
import { v4 } from "uuid";
interface DatePickerProps {
    label: string;
    id?: string;
    onSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker({ label, id = v4(), onSelect }: DatePickerProps) {
    const inputClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const input = document.getElementById(id) as HTMLInputElement;
        input.click();
    }


    return (
        <div className={styles.form_control} onClick={inputClick} >

            <label htmlFor={id}>{label}</label>
            <input type="date" className={styles.input} id={id} onChange={onSelect} />
        </div>
    )
}
import { useState } from 'react';
import style from './radio.module.css';
import { v4 } from 'uuid';

type RadioOptions = {
    name: string;
    value: string;
    checked: boolean;
}

export default function Radio({ radioOptions, name, icon, error = false, id = v4()}: { radioOptions: RadioOptions[], name: string, icon: JSX.Element, error?: boolean, id?: string }): JSX.Element {


    function onChangeHandler(value: string) {
        const element = document.getElementById(name) as HTMLSelectElement;
        element.value = value;
    }


    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, onChange: (value: string) => void, value: string) {
        const target = event.target as HTMLDivElement;
        const area = target.parentElement as HTMLDivElement;
        const alreadyCheckedButton = area.querySelector(`.${style.checked}`) as HTMLDivElement;
        if (alreadyCheckedButton) {
            alreadyCheckedButton.classList.remove(style.checked);
        }

        const element = target as HTMLDivElement;
        element.classList.add(style.checked);

        onChange(value);
    }


    function createButton(name: string, value: string, checked: boolean, onChange: (value: string) => void): JSX.Element {
        const element_class = style.radio_button_element + (checked ? ' ' + style.checked : '');
        return <div key={value} className={element_class} onClick={(event) => handleClick(event, onChange, value)}>
            {name}
        </div>
    }

    const initialChecked = radioOptions.find((option: RadioOptions) => option.checked);

    return <div className={style.radio_button_container}>
        <div className={style.radio_button_label}>
            <div className={style.radio_button_icon}>
                {icon}
            </div>
            <div className={style.radio_button_name}>
                {name}
            </div>
        </div>
        <div className={style.radio_button_area}>
            <div className={style.radio_button}>
                {radioOptions.map((option: RadioOptions) => {
                    return createButton(option.name, option.value, option.checked, onChangeHandler);
                })}
            </div>
            <select name={name} style={{ display: 'none' }} id={id} value={initialChecked?.value}>
                {radioOptions.map((option: RadioOptions) => {
                    return <option key={option.value} value={option.value}>{option.name}</option>
                })}
            </select>
        </div>
    </div>
}
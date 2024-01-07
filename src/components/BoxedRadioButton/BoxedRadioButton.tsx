import "./BoxedRadioButton.css";
import findParentWithClass from "../../Utils/firstParentWithClass";

type ButtonOptions = {
    name: string;
    value: string;
    checked: boolean;
    onChange: (newValue: string) => void;
}

type buttonsOptions = ButtonOptions[];

export default function BoxedRadioButton({ buttonsOptions }: { buttonsOptions: buttonsOptions }): JSX.Element {

    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, onChange: (newValue: string) => void, value: string) {

        const target = event.target as HTMLDivElement;
        const area = findParentWithClass(target, "boxed_radio_button_area") as HTMLDivElement;
        const alreadyCheckedButton = area.querySelector(".checked") as HTMLDivElement;
        alreadyCheckedButton.classList.remove("checked");

        const element = findParentWithClass(target, "boxed_radio_button_element") as HTMLDivElement;
        element.classList.add("checked");

        onChange(value);
    }


    function createButton(name: string, value: string, checked: boolean, onChange: (newValue: string) => void): JSX.Element {
        const element_class = "boxed_radio_button_element" + (checked ? " checked" : "");
        console.log(element_class)
        return <div key={value} className={element_class} onClick={(event) => handleClick(event, onChange, value)}>
            {name}
        </div>
    }

    return <div className="boxed_radio_button_area">
        <div className="boxed_radio_button">
            {buttonsOptions.map((buttonOption: ButtonOptions) => {
                return createButton(buttonOption.name, buttonOption.value, buttonOption.checked, buttonOption.onChange);
            })}
        </div>
    </div>
}
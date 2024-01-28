import style from './input.module.css';

interface InputProps {
    type: string,
    placeholder: string,
    icon: JSX.Element,
    id: string,
    containerClass?: string,
    inputClass?: string,
    error?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    autocomplete?: string
}

export default function Input({ type, placeholder, icon, id, containerClass, inputClass, error = false, onChange, value = "", autocomplete }: InputProps): JSX.Element {
    const containerClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const input = document.getElementById(id);
        if (input !== null)
            input.focus();
    }
    if (value === null || value === undefined)
        value = "";
    return (
        <div className="flex flex-row items-center justify-center h-full my-5  focus-within:bg-gray-700 focus-within:shadow-sm hover:bg-lighter-200 p-3 rounded-md"
            onClick={containerClickHandler}>
            {icon}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={value}
                autoComplete={autocomplete ? autocomplete : undefined}
                className="w-full pl-3 text-gray-50 bg-transparent outline-none rounded-lg"
            />
        </div>
    );
}
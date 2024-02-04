import styles from "./MultipartFrom.module.css";
import React from "react";
import { useState } from "react";
import { FormGroupProps } from "./FormGroup";
import { Button } from "..";

// Interface for MultipartForm
interface MultipartFormProps {
    children: React.ReactElement<FormGroupProps> | React.ReactElement<FormGroupProps>[];
    nextButtonOptions: {
        text: string;
        className?: string;
    };
    submitButtonOptions: {
        text: string;
        className?: string;
        onSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    };
}

export default function MultipartForm({ children, nextButtonOptions, submitButtonOptions }: MultipartFormProps) {
    const [activeGroup, setActiveGroup] = useState(0);

    const handleButtonClick = (groupNumber: number) => {
        setActiveGroup(groupNumber);
    };

    const groups = React.Children.toArray(children);

    const groupLength = groups.length;
    return (
        <div className='flex flex-col items-center justify-center w-full h-full' >
            <div className='flex gap-5 justify-center items-center flex-row py-1 pb-3'>
                {groups.map((group, index) => (
                    <button key={index} onClick={(e) =>{e.preventDefault();  handleButtonClick(index)}} className={styles.button + " " + (activeGroup === index ? styles.active : "")}>
                    </button>
                ))}
            </div>

            <div className='flex flex-col items-center justify-center w-full h-full'>
                {groups.map((group, index) => (
                    <div key={index} className='flex flex-col items-center justify-center w-full h-full' style={{ display: activeGroup === index ? "flex" : "none" }}>
                        {group}
                        {index !== groupLength - 1 ? (
                            <Button
                                type="button"
                                onClick={() => handleButtonClick(index + 1)}
                                text={nextButtonOptions?.text || "Next"}
                                inputClass={nextButtonOptions?.className}
                            />
                        ) : (
                            <Button
                                type="submit"
                                text={submitButtonOptions?.text || "Submit"}
                                onClick={submitButtonOptions?.onSubmit}
                                inputClass={submitButtonOptions?.className}
                            />
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
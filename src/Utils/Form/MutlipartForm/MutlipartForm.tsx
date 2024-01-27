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
        <div className={styles.multipartFormContainer}>
            <div className={styles.buttonContainer}>
                {groups.map((group, index) => (
                    <button key={index} onClick={(e) =>{e.preventDefault();  handleButtonClick(index)}} className={styles.button + " " + (activeGroup === index ? styles.active : "")}>
                    </button>
                ))}
            </div>

            <div className={styles.groupsContainer}>
                {groups.map((group, index) => (
                    <div key={index} className={styles.groupContainer + " " + (activeGroup === index ? styles.active : "")}>
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
export type FormGroupProps = {
    children: JSX.Element | JSX.Element[]
}

const FormGroup: React.FC<FormGroupProps>  = ( { children }: FormGroupProps ) => {
    return (<>{children}</>
    )
}
export default FormGroup;

import { FormGroupParams } from "./FormGroupParams";

const SendRequestForm : React.FC<FormGroupParams> = (props) => {
    return (
        <div className="form-group">
                    <label htmlFor={props.inputId}>{props.name}</label>
                    {props.input}
        </div>
    );
};

export default SendRequestForm;
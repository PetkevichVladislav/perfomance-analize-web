import { TextInputParams } from "./TextInputParams";

const TextInput : React.FC<TextInputParams> = (props) => {
    return (
            <input
                className="form-control"
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                required
            />
    );
};

export default TextInput;
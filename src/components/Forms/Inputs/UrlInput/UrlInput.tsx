import { UrlInputParams } from "./UrlInputParams";

const UrlInput : React.FC<UrlInputParams> = (props) => {
    return (
            <input
                className="form-control"
                type="url"
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                required
            />
    );
};

export default UrlInput;
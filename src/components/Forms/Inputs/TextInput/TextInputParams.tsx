export interface TextInputParams{
    id: string,
    value?: string | number,
    name?: string;
    onChange: (value: string | number) => void;
}
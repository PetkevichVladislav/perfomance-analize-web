import { ReactNode } from "react";

export interface FormGroupParams {
    input: ReactNode,
    inputId: string,
    value?: string | number,
    name?: string;
    onChange: (value: string | number) => void;
}
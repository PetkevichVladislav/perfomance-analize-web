import { ReportParams } from "./ReportParams";

export default function Report({params} : ReportParams) {
    return <h1>Report with id: {params.id}!</h1>;
};
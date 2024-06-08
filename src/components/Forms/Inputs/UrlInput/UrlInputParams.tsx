export interface UrlInputParams {
  id: string;
  value?: string | number;
  name?: string;
  onChange: (value: string | number) => void;
}

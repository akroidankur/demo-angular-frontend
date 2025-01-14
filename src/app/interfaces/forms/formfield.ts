interface Radio {
  _id: string;
  name: string;
}
export interface CheckboxForArrayOfStrings {
  _id: string;
  name: string;
}

export interface FormField {
  type: string;
  name: string;
  id: string; //make it same as name
  label: string;
  required: boolean;
  pattern?: string;
  placeholder?: string;
  errorMessage?: string;
  selectValues?: Array<string>;
  radioValues?: Array<Radio>;
  checkboxName?: string;
  checkboxValues?: Array<CheckboxForArrayOfStrings>;
  disabled?: boolean
}


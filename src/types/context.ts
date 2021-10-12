import { MyProps } from "./container";

export interface FormikValues {

}

export interface FormikProps {
    setSubmitting: (val: boolean) => void;
    setErrors: (val: any) => void;
} 

export interface Context extends MyProps {
    tooltipOpen: boolean;
    trackOrderHandler: (values: FormikValues, { setSubmitting, setErrors }: FormikProps) => void;
    toggle: () => void;
    toggleMode: () => void;
    errorMessage: string;
}
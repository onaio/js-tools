/// <reference types="react" />
import { FormikState, FormikValues } from 'formik';
/** Type def for Formik onChange function */
export declare type FormikOnChangeFunc<T> = (
  currentValues: FormikState<T>,
  nextValues: FormikState<T>
) => void;
/** Interface to describe FormikEffect props */
export interface FormikEffectProps<T = FormikValues> {
  readonly onChange: FormikOnChangeFunc<T>;
}
/** Connected FormikEffect component */
declare const ConnectedFormikEffect: import('react').ComponentType<FormikEffectProps<FormikValues>>;
export default ConnectedFormikEffect;

import { connect, FormikContextType, FormikState, FormikValues } from 'formik';
import { useEffect, useRef } from 'react';

/** Type def for Formik onChange function */
export type FormikOnchangeFunc<T> = (
  currentValues: FormikState<T>,
  nextValues: FormikState<T>
) => void;

/** Interface to describe FormikEffect props */
export interface FormikEffectProps<T = FormikValues> {
  readonly onChange: FormikOnchangeFunc<T>;
}

/** Interface for connected FormikEffect Props */
interface ConnectedFormikEffectsProps<T> extends FormikEffectProps<T> {
  readonly formik: FormikContextType<T>;
}

/**
 * Declarative Formik component for side-effects
 *
 * Import the <FormikEffect > component and put it inside any Formik form.
 * It renders null! Pass it an onChange() function and it will be called
 * whenever your Formik form's state updates.
 *
 * Based on: https://github.com/jaredpalmer/formik-effect
 * which is currently not working (since React 16.3 API changes)
 * TODO: We'll need to replace this once formik-effect is updated
 */
function FormikEffect<T>(props: ConnectedFormikEffectsProps<T>) {
  const { formik, onChange } = props;
  const ref = useRef(formik);
  useEffect(() => {
    onChange(ref.current, formik);
    ref.current = formik;
  }, [formik]);
  return null;
}

/** Connected FormikEffect component */
const ConnectedFormikEffect = connect<FormikEffectProps>(FormikEffect);

export default ConnectedFormikEffect;

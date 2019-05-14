/// <reference types="react" />
import './style.css';
/** interface for Ripple props */
export interface RippleProps {
  borderColor: string;
  borderStyle: string;
  borderWidth: string;
  height: string;
  minHeight: string;
  width: string;
}
export declare const defaultProps: Partial<RippleProps>;
/** Loading component that displays a nice ripple */
declare const Ripple: {
  (props: RippleProps): JSX.Element;
  defaultProps: Partial<RippleProps>;
};
export default Ripple;

/// <reference types="react" />
import { CommonProps } from '../commons';
export declare const StyledFacebook: import("styled-components").StyledComponent<"div", any, CommonProps, never>;
export declare type FaceBookProps = CommonProps;
export declare const defaultFaceBookProps: {
    animationSpeed: number;
    color: string;
    scaleSizeBy: number;
    scaleSpeedBy: number;
};
declare const Facebook: {
    (props: CommonProps): JSX.Element;
    defaultProps: {
        animationSpeed: number;
        color: string;
        scaleSizeBy: number;
        scaleSpeedBy: number;
    };
};
export { Facebook };

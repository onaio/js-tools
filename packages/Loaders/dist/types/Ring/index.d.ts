/// <reference types="react" />
import { CommonProps } from '../commons';
export declare const ringAnimation: import("styled-components").Keyframes;
export declare const StyledRing: import("styled-components").StyledComponent<"div", any, CommonProps, never>;
declare const Ring: {
    (props: CommonProps): JSX.Element;
    defaultProps: {
        animationSpeed: number;
        color: string;
        scaleSizeBy: number;
        scaleSpeedBy: number;
    };
};
export { Ring };

/// <reference types="react" />
import { CommonProps } from '../commons';
export declare const defaultAnimationDuration = 1.2;
export declare type GridProps = CommonProps;
export declare const gridAnimation: import("styled-components").Keyframes;
export declare const StyledGrid: import("styled-components").StyledComponent<"div", any, CommonProps, never>;
export declare const defaultGridProps: {
    animationSpeed: number;
    color: string;
    scaleSizeBy: number;
    scaleSpeedBy: number;
};
declare const Grid: {
    (props: CommonProps): JSX.Element;
    defaultProps: {
        animationSpeed: number;
        color: string;
        scaleSizeBy: number;
        scaleSpeedBy: number;
    };
};
export { Grid };

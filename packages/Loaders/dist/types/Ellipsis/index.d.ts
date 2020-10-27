/// <reference types="react" />
import { CommonProps } from '../commons';
export declare const ellipsis1: import("styled-components").Keyframes;
export declare const ellipsis2: (props: CommonProps) => import("styled-components").Keyframes;
export declare const ellipsis3: import("styled-components").Keyframes;
export declare const StyledEllipsis: import("styled-components").StyledComponent<"div", any, CommonProps, never>;
export declare type EllipsisProps = CommonProps;
export declare const defaultEllipsisProps: {
    animationSpeed: number;
    color: string;
    scaleSizeBy: number;
    scaleSpeedBy: number;
};
declare const Ellipsis: {
    (props: CommonProps): JSX.Element;
    defaultProps: {
        animationSpeed: number;
        color: string;
        scaleSizeBy: number;
        scaleSpeedBy: number;
    };
};
export { Ellipsis };

export interface CommonProps {
    color: string /** loader color */;
    scaleSizeBy: number /** control the size of the loader */;
    scaleSpeedBy: number /** animation speed in seconds */;
}
/** common props for loaders */
export declare const commonDefaultProps: {
    animationSpeed: number;
    color: string;
    scaleSizeBy: number;
    scaleSpeedBy: number;
};
/** helper to get animation duration in seconds
 * @param animationDuration - default animation at scale 1
 * @param props - the component props
 */
export declare const getAnimationDuration: <T extends Pick<CommonProps, "scaleSpeedBy">>(props: T, animationDuration?: number) => string;

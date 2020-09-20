export interface CommonProps {
  color: string /** loader color */;
  scaleSizeBy: number /** control the size of the loader */;
  scaleSpeedBy: number /** animation speed in seconds */;
}

/** common props for loaders */
export const commonDefaultProps = {
  animationSpeed: 2.4,
  color: 'tomato',
  scaleSizeBy: 1,
  scaleSpeedBy: 1
};

/** helper to get animation duration in seconds
 * @param animationDuration - default animation at scale 1
 * @param props - the component props
 */
export const getAnimationDuration = <T extends Pick<CommonProps, 'scaleSpeedBy'>>(
  props: T,
  animationDuration = commonDefaultProps.animationSpeed
) => {
  return `${(1 / props.scaleSpeedBy) * animationDuration}s`;
};

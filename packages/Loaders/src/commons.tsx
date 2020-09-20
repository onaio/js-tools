export interface CommonProps {
  animationSpeed: number /** animation speed in seconds */;
  color: string /** loader color */;
  scaleSizeBy: number /** control the size of the loader */;
  scaleSpeedBy: number;
}

export const commonDefaultProps = {
  animationSpeed: 2.4,
  color: 'tomato',
  scaleSizeBy: 1,
  scaleSpeedBy: 1
};

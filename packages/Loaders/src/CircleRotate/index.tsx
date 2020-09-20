import React from 'react';
import Styled, { css, keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps } from '../commons';

const defaultAnimationDuration: number = 1.2;

const getAnimationDuration = (props: CircleRotateProps) => {
  return `${(1 / props.scaleSpeedBy) * defaultAnimationDuration}s`;
};

const rotation = keyframes`
0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

const StyledCircleRotate = Styled.div`
    display: inline-block;
    transform: translateZ(1px);

    div{
        display: inline-block;
        width: ${(props: CircleRotateProps) => `${props.scaleSizeBy * 64}px`};
        height: ${(props: CircleRotateProps) => `${props.scaleSizeBy * 64}px`};
        margin: 8px;
        border-radius: 50%;
        background: ${(props: CircleRotateProps) => props.color};
        animation: ${rotation} ${(props: CircleRotateProps) =>
  getAnimationDuration(props)} cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
`;

type CircleRotateProps = CommonProps;

export const defaultCircleRotate: CircleRotateProps = {
  ...commonDefaultProps,
  scaleSizeBy: 1
};

const CircleRotate = (props: CircleRotateProps) => {
  return (
    <StyledCircleRotate {...props}>
      <div />
    </StyledCircleRotate>
  );
};

CircleRotate.defaultProps = defaultCircleRotate;

export { CircleRotate };

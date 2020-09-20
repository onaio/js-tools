import React from 'react';
import Styled, { css, keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps } from '../commons';

const defaultAnimationDuration: number = 0.6;

const getAnimationDuration = (props: EllipsisProps) => {
  return `${(1 / props.scaleSpeedBy) * defaultAnimationDuration}s`;
};

export const ellipsis1 = keyframes`
0% {
  transform: scale(0);
}
100% {
  transform: scale(1);
}`;

export const ellipsis2 = keyframes`
0% {
  transform: translate(0, 0);
}
100% {
  transform: translate(24px, 0);
}`;

export const ellipsis3 = keyframes`
0% {
  transform: scale(1);
}
100% {
  transform: scale(0);
}`;

export const StyledEllipsis = Styled.div`
  display: inline-block;
  position: relative;
  width: ${(props: EllipsisProps) => `${props.scaleSizeBy * 80}px`};
  height: ${(props: EllipsisProps) => `${props.scaleSizeBy * 80}px`};

  div {
    position: absolute;
    top: 33px;
    width: ${(props: EllipsisProps) => `${props.scaleSizeBy * 13}px`};
    height: ${(props: EllipsisProps) => `${props.scaleSizeBy * 13}px`};
    border-radius: 50%;
    background: ${(props: EllipsisProps) => props.color};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1){
    left: ${(props: EllipsisProps) => `${props.scaleSizeBy * 8}px`};
    animation: ${ellipsis1} ${(props: EllipsisProps) => getAnimationDuration(props)} infinite;
  }

  div:nth-child(2){
    left: ${(props: EllipsisProps) => `${props.scaleSizeBy * 8}px`};
    animation: ${ellipsis2} ${(props: EllipsisProps) => getAnimationDuration(props)} infinite;
  }

  div:nth-child(3){
    left: ${(props: EllipsisProps) => `${props.scaleSizeBy * 32}px`};
    animation: ${ellipsis2} ${(props: EllipsisProps) => getAnimationDuration(props)} infinite;
  }

  div:nth-child(4){
    left: ${(props: EllipsisProps) => `${props.scaleSizeBy * 56}px`};
    animation: ${ellipsis3} ${(props: EllipsisProps) => getAnimationDuration(props)} infinite;
  }
`;

export type EllipsisProps = CommonProps;

export const defaultEllipsisProps = {
  ...commonDefaultProps
};

const Ellipsis = (props: EllipsisProps) => {
  return (
    <StyledEllipsis {...props}>
      <div />
      <div />
      <div />
      <div />
    </StyledEllipsis>
  );
};

Ellipsis.defaultProps = defaultEllipsisProps;

export { Ellipsis };

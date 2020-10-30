import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps, getAnimationDuration } from '../commons';

const defaultAnimationDuration: number = 0.6;

export const ellipsis1 = keyframes`
0% {
  transform: scale(0);
}
100% {
  transform: scale(1);
}`;

export const ellipsis2 = (props: EllipsisProps) => keyframes`
0% {
  transform: translate(0, 0);
}
100% {
  transform: translate(${props.scaleSizeBy * 24}px, 0);
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
    left: 8px;
    animation: ${ellipsis1} ${(props: EllipsisProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} infinite;
  }

  div:nth-child(2){
    left: 8px;
    animation: ${(props: EllipsisProps) => ellipsis2(props)} ${(props: EllipsisProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} infinite;
  }

  div:nth-child(3){
    left: ${(props: EllipsisProps) => `${props.scaleSizeBy * 32}px`};
    animation: ${(props: EllipsisProps) => ellipsis2(props)} ${(props: EllipsisProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} infinite;
  }

  div:nth-child(4){
    left: ${(props: EllipsisProps) => `${props.scaleSizeBy * 56}px`};
    animation: ${ellipsis3} ${(props: EllipsisProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} infinite;
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

import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps, getAnimationDuration } from '../commons';

const defaultAnimationDuration = 1.2;

export const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledRing = Styled.div`
  display: inline-block;
  position: relative;
  width: ${(props: RingProps) => `${props.scaleSizeBy * 80}px`};
  height: ${(props: RingProps) => `${props.scaleSizeBy * 80}px`};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props: RingProps) => `${props.scaleSizeBy * 64}px`};
  height: ${(props: RingProps) => `${props.scaleSizeBy * 64}px`};
    margin: 8px;
    border: 8px solid ${(props: RingProps) => props.color};
    border-radius: 50%;
    border-color: ${(props: RingProps) => props.color} transparent transparent transparent;
    animation: ${ringAnimation} ${(props: RingProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  div:nth-child(1){
    animation-delay: ${(props: RingProps) => getAnimationDuration(props, -0.45)};
  }

  div:nth-child(2){
    animation-delay: ${(props: RingProps) => getAnimationDuration(props, -0.3)};
  }

  div: nth-child(3){
    animation-delay: ${(props: RingProps) => getAnimationDuration(props, -0.15)};
  }
`;

type RingProps = CommonProps;

const defaultRingProps = {
  ...commonDefaultProps
};

const Ring = (props: RingProps) => {
  return (
    <StyledRing {...props}>
      <div />
      <div />
      <div />
      <div />
    </StyledRing>
  );
};

Ring.defaultProps = defaultRingProps;

export { Ring };

import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps, getAnimationDuration } from '../commons';

const defaultAnimationDuration: number = 1.2;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% { 
    transform: rotate(360deg);
  }
`;

export const DualRing = Styled.div`
  display: inline-block;
  width: ${(props: DualRingProps) => `${props.scaleSizeBy * 80}px`};
  height: ${(props: DualRingProps) => `${props.scaleSizeBy * 80}px`};

  &:after {
    content: "";
    display: block;
    width: ${(props: DualRingProps) => `${props.scaleSizeBy * 64}px`};
    height: ${(props: DualRingProps) => `${props.scaleSizeBy * 64}px`};
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${(props: DualRingProps) => props.color};
    border-radius: 50%;
    border-color: ${(props: DualRingProps) => props.color} transparent ${(props: DualRingProps) =>
  props.color} transparent;
    animation : ${rotation} ${(props: DualRingProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} linear infinite;
  }
`;

export type DualRingProps = CommonProps;

export const defaultDualRingProps: DualRingProps = {
  ...commonDefaultProps
};

DualRing.defaultProps = defaultDualRingProps;

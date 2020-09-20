import React from 'react';
import Styled, { css, keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps } from '../commons';

export const gridAnimation = keyframes`
0%, 100% {
  opacity: 1;
}
50% {
  opacity: 0.5;
}
`;

export const StyledGrid = Styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    width: ${(props: GripProps) => `${props.scaleSizeBy * 16}px`};
    height: ${(props: GripProps) => `${props.scaleSizeBy * 16}px`};
    border-radius: 50%;
    background: ${(props: GripProps) => props.color};
    animation: ${gridAnimation} ${(props: GripProps) => `${props.animationSpeed}s`} linear infinite
  }

  div:nth-Child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }

  div:nth-Child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }

  div:nth-Child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }

  div:nth-Child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }

  div:nth-Child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }

  div:nth-Child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }

  div:nth-Child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  div:nth-Child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }

  div:nth-Child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
`;

type GripProps = CommonProps;

const defaultGridProps = {
  ...commonDefaultProps,
  animationSpeed: 1.2
};

const Grid = (props: CommonProps) => {
  return (
    <StyledGrid {...props}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </StyledGrid>
  );
};

Grid.defaultProps = defaultGridProps;

export { Grid };

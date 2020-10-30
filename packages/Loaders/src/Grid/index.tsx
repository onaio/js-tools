import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps, getAnimationDuration } from '../commons';

export const defaultAnimationDuration = 1.2;

export type GridProps = CommonProps;

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
  width: ${(props: GridProps) => `${props.scaleSizeBy * 80}px`};
  height: ${(props: GridProps) => `${props.scaleSizeBy * 80}px`};


  div {
    position: absolute;
    width: ${(props: GridProps) => `${props.scaleSizeBy * 16}px`};
    height: ${(props: GridProps) => `${props.scaleSizeBy * 16}px`};
    border-radius: 50%;
    background: ${(props: GridProps) => props.color};
    animation: ${gridAnimation} ${(props: GridProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} linear infinite
  }

  div:nth-Child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }

  div:nth-Child(2) {
    top: 8px;
    left: ${(props: GridProps) => `${props.scaleSizeBy * 32}px`};
    animation-delay: -0.4s;
  }

  div:nth-Child(3) {
    top: 8px;
    left: ${(props: GridProps) => `${props.scaleSizeBy * 56}px`};
    animation-delay: -0.8s;
  }

  div:nth-Child(4) {
    top: ${(props: GridProps) => `${props.scaleSizeBy * 32}px`};
    left: 8px;
    animation-delay: -0.4s;
  }

  div:nth-Child(5) {
    top: ${(props: GridProps) => `${props.scaleSizeBy * 32}px`};
    left: ${(props: GridProps) => `${props.scaleSizeBy * 32}px`};
    animation-delay: -0.8s;
  }

  div:nth-Child(6) {
    top: ${(props: GridProps) => `${props.scaleSizeBy * 32}px`};
    left: ${(props: GridProps) => `${props.scaleSizeBy * 56}px`};
    animation-delay: -1.2s;
  }

  div:nth-Child(7) {
    top: ${(props: GridProps) => `${props.scaleSizeBy * 56}px`};
    left: 8px;
    animation-delay: -0.8s;
  }
  div:nth-Child(8) {
    top: ${(props: GridProps) => `${props.scaleSizeBy * 56}px`};
    left: ${(props: GridProps) => `${props.scaleSizeBy * 32}px`};
    animation-delay: -1.2s;
  }

  div:nth-Child(9) {
    top: ${(props: GridProps) => `${props.scaleSizeBy * 56}px`};
    left: ${(props: GridProps) => `${props.scaleSizeBy * 56}px`};
    animation-delay: -1.6s;
  }
`;

export const defaultGridProps = {
  ...commonDefaultProps
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

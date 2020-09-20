import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { commonDefaultProps, CommonProps, getAnimationDuration } from '../commons';

const defaultAnimationDuration: number = 1.2;

const animation = (props: FaceBookProps) => keyframes`
0% {
  top: ${`${props.scaleSizeBy * 8}px`};
  height: ${`${props.scaleSizeBy * 64}px`};
}
50%, 100% {
  top: ${`${props.scaleSizeBy * 24}px`};
  height: ${`${props.scaleSizeBy * 32}px`};
}
`;

export const StyledFacebook = Styled.div`
  display: inline-block;
  position: relative;
  width: ${(props: FaceBookProps) => `${props.scaleSizeBy * 80}px`};
  height: ${(props: FaceBookProps) => `${props.scaleSizeBy * 80}px`};

  div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: ${(props: FaceBookProps) => `${props.scaleSizeBy * 16}px`};
    background: ${(props: FaceBookProps) => props.color};
    animation: ${animation} ${(props: FaceBookProps) =>
  getAnimationDuration(props, defaultAnimationDuration)} cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    left:  ${(props: FaceBookProps) => `${props.scaleSizeBy * 8}px`};
    animation-delay: -0.24s;
  }
  
  div:nth-child(2) {
    left:  ${(props: FaceBookProps) => `${props.scaleSizeBy * 32}px`};
    animation-delay: -0.12s;
  }
  
  div:nth-child(3) {
    left:  ${(props: FaceBookProps) => `${props.scaleSizeBy * 56}px`};
    animation-delay: 0;
  }
`;

export type FaceBookProps = CommonProps;

export const defaultFaceBookProps = {
  ...commonDefaultProps
};

const Facebook = (props: FaceBookProps) => {
  return (
    <StyledFacebook {...props}>
      <div />
      <div />
      <div />
    </StyledFacebook>
  );
};

Facebook.defaultProps = defaultFaceBookProps;

export { Facebook };

import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Styled from 'styled-components';
import notes from '../../packages/Loaders/README.md';
import {
  CircleRotate,
  CommonProps,
  DualRing,
  Ellipsis,
  Facebook,
  Grid,
  Ring
} from '../../packages/Loaders/src';

const CenteredContainer = Styled.div`
  width: 100vw;
  display: flex;
  margin: 20px 0;
  justify-content: center;
`;

const LoadersContainer = Styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr  5fr;
  grid-template-areas: 
    "filters filters filters"
    "loadersGrid loadersGrid loadersGrid";
`;

const FiltersGrid = Styled.div`
  grid-area: filters;
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
`;

const SingleFilter = Styled.div`
  label {
    display: block;
  }
`;

const LoadersGrid = Styled.div`
  grid-area: loadersGrid;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 5px;
  row-gap: 10px;
`;

const SingleGrid = Styled.div.attrs(() => ({
  className: 'card' // external stylesheet integration, though once can still pass a className prop
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 2px solid palevioletred;
`;

export const LoadersGridView = () => {
  /** a customization tool for the loaders */

  const defaultColor: string = '#FF6347';
  const defaultSpeed: number = 1;
  const defaultScale: number = 1;

  const [animationSpeed, setAnimationSpeed] = useState<number>(defaultSpeed);
  const [color, setColor] = useState<string>(defaultColor);
  const [scale, setScale] = useState<number>(defaultScale);

  type InputEventHandlers = (event: React.ChangeEvent<HTMLInputElement>) => void;

  const colorInputHandler: InputEventHandlers = event => {
    setColor(event.target.value);
  };

  const speedInputHandler: InputEventHandlers = event => {
    setAnimationSpeed(Number(event.target.value));
  };

  const scaleInputHandler: InputEventHandlers = event => {
    setScale(Number(event.target.value));
  };

  const props: CommonProps = {
    color,
    scaleSizeBy: scale,
    scaleSpeedBy: animationSpeed
  };
  return (
    <CenteredContainer>
      <LoadersContainer>
        <FiltersGrid>
          <SingleFilter>
            <label htmlFor="colorPicker">Choose Color:</label>
            <input
              type="color"
              id="colorPicker"
              name="colorPicker"
              defaultValue={defaultColor}
              onChange={colorInputHandler}
            />
          </SingleFilter>

          <SingleFilter>
            <label htmlFor="animationSpeed">scale speed by:</label>
            <input
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              id="animationSpeed"
              name="animationSpeed"
              defaultValue={defaultSpeed}
              onChange={speedInputHandler}
            />
          </SingleFilter>

          <SingleFilter>
            <label htmlFor="scaleSize">scale size by:</label>
            <input
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              id="scaleSize"
              name="scaleSize"
              defaultValue={defaultScale}
              onChange={scaleInputHandler}
            />
          </SingleFilter>
        </FiltersGrid>
        <LoadersGrid>
          <SingleGrid>
            <CircleRotate {...props} />
          </SingleGrid>
          <SingleGrid>
            <Facebook {...props} />
          </SingleGrid>
          <SingleGrid>
            <DualRing {...props} />
          </SingleGrid>
          <SingleGrid>
            <Ellipsis {...props} />
          </SingleGrid>
          <SingleGrid>
            <Grid {...props} />
          </SingleGrid>
          <SingleGrid>
            <Ring {...props} />
          </SingleGrid>
        </LoadersGrid>
      </LoadersContainer>
    </CenteredContainer>
  );
};

/** draw a grid with all the loaders witha section to change
 * the props:
 *
 * - color
 */

storiesOf('All loaders', module).add('with default settings', () => <LoadersGridView />, { notes });

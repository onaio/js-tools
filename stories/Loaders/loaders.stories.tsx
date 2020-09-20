import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Styled from 'styled-components';
import notes from '../../packages/Loaders/README.md';
import { CircleRotate, DualRing, Ellipsis, Facebook, Grid, Ring } from '../../packages/Loaders/src';

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
  padding: 10px;
`;

const LoadersGrid = Styled.div`
  grid-area: loadersGrid;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 5px;
  row-gap: 10px;
`;

const SingleGrid = Styled.div.attrs(() => ({
  className: 'card' // bootstrap integration
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 2px solid palevioletred;
`;

export const LoadersGridView = () => {
  /** a customization tool for the loaders */
  const [animationSpeed, setAnimationSpeed] = useState<number>(5);
  const [color, setColor] = useState<string>('');
  const [scale, setScale] = useState<number>(1);

  return (
    <CenteredContainer>
      <LoadersContainer>
        <FiltersGrid></FiltersGrid>
        <LoadersGrid>
          <SingleGrid>
            <CircleRotate />
          </SingleGrid>
          <SingleGrid>
            <Facebook />
          </SingleGrid>
          <SingleGrid>
            <DualRing />
          </SingleGrid>
          <SingleGrid>
            <Ellipsis />
          </SingleGrid>
          <SingleGrid>
            <Grid />
          </SingleGrid>
          <SingleGrid>
            <Ring />
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

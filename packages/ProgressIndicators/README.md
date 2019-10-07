# ProgressBar

Graphical control element to visualize progress

## Installation

```sh
yarn add @onaio/progress-bar
```

## Configuration

configuration is done via props; properties currently supported include:

```typescript
/**
 *  {boolean} anime - apply animation over stripped gradient
 *  {boolean} showLabel - add label to the progressBar
 *  {boolean} stripped - apply stripped gradient on the progressBar
 *  {number} decimalPoints - Rounds off the value to this number of decimalPoints;
 *  {string} height - height of the bar;
 *  {number} min:  - the lower bound for the range of the progressBar
 *  {number} max: - the upper bound for the range of the progressBar
 *  {number} value - number that represents the progress; should be in range[min, max)
 *  {string} lineColor:  - A color to use for the line; defaults to blue
 *  { [key: string]: number } | undefined} [lineColorThresholds] - an optional object
 *               that represents the thresholds at which the line should change colors
 *       lineColorThresholds: {
 *                [GREEN]: 70,
 *                [RED]: 0,
 *                [YELLOW]: 30
 *            }
 */
```

A sample of the full list of props:

```typescript
const props = {
  anime: true,
  decimalPoints: 0,
  height: '10px',
  lineColor: '#5269EB',
  lineColorThresholds: {
    [GREEN]: 70,
    [RED]: 0,
    [YELLOW]: 30
  },
  max: 100,
  min: 0,
  value: 70,
  showLabel: false,
  stripped: false
};
```

### Code Example

```typescript
import ProgressBar from '@onaio/progress-bar';

// props defined above

<ProgressBar {...props} />;
```

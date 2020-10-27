# Loaders

This package provides a number of React loading elements that you can use to show
that something on your page is... loading.

## Installation

```node
yarn add @onaio/loaders
```

## Ripple Loader

The Ripple Loader displays a nice ripple effect via pure CSS.

### Usage

```javascript
import Ripple from '@onaio/loaders';

<Ripple />;
```

### Customization

The Ripple loader takes a number of props that can be used to customize it:

- **borderColor**: the border color
- **borderStyle**: the border style
- **borderWidth**: the border width
- **height**: the height
- **minHeight**: the minimum height
- **width**: the width

#### Code example

```javascript
import Ripple from '@onaio/loaders'

const props = {
  borderColor: '#FF22EF',
  borderStyle: 'dotted',
  borderWidth: '4px',
}

<Ripple {...props} />
```

### Facebook, Grid, DualRing, Ring, Ellipsis, CircleRotate

Attribution: [Loading.io](loading.io)

These Loaders display a nice loading effects via pure CSS. using [styled-components](https://styled-components.com)

### Customization

These loader can be parametrized by animation speed, size and color through the below props:

- **color**: color of component
- **scaleSizeBy**: a number to scale the size relative to the default
- **scaleSpeedBy**: a number to scale the speed relative to the default

#### Code example

```typescript
import { CircleRotate } from '@onaio/loaders';

<CircleRotate {...props} />;
```

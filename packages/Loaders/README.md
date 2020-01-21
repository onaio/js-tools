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

Also, if the styling does not work out of the box, you might have to import the stylesheet with:

```typescript
import '@onaio/loaders/dist/style.css';
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

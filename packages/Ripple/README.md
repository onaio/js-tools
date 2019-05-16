# Ripple

---

purely makes use of css to provide a ripple effect.

The ripple loader component when used enhances interactivity when lazyloading static objects like videos, or other components. it is especially useful when loading components that may take a while to fully or correctly display.

### Installation

```node
yarn add @onaio/ripple
```

---

## Usage[customization]

The customization object interface is as defined below.

```js
{
  borderColor: string;
  borderStyle: string;
  borderWidth: string;
  height: string;
  minHeight: string;
  width: string;
}
```

### Code example

Relative to the default setting:

- sets ripple effect color to purple-ish
- changes the border style

```javascript
import Loader from '@onaio/ripple'

const props = {
  borderColor: '#FF22EF',
  borderStyle: 'dotted',
  borderWidth: '4px',
}

<Loader {...props} />
```

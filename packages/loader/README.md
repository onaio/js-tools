# loader

purely makes use of css to provide a ripple effect.

### Installation

> yarn add @onaio/loader

### customization(props)

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

#### Code example

Relative to the default setting:

- sets ripple effect color to purple-ish
- changes the border style

```javascript
import Loader from '@onaio/loader'

const loaderStyle = {
  borderColor: '#FF22EF',
  borderStyle: 'dotted',
  borderWidth: '4px',
}

<Loader {...loaderStyle} />
```

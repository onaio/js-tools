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
- sets borderstyle from solid to dashed
- scales display size by 1.5

```javascript
import Loader from '@onaio/loader'

const LoaderStyles = {
  borderColor: '#FF22EF',
  borderStyle: 'dashed',
  borderWidth: '4px',
  height: '96px',
  minHeight: '80vh',
  width: '96px'
}

<Loader {...props} />
```

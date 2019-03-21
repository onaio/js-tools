# ElementMap

A simple `React` component that takes a list of elements and a HTML tag and outputs the same list of elements wrapped in the same HTML tag provided.

## Why is this useful?

`ElementMap` helps to keep code DRY - use it every time that have a list of things that you want to render wrapped inside a HTML tag, which happens a lot of times in any medium/large codebase.

Therefore this (or variations of it):

```js
const items = ['a', 'b', 'c'];
const wrappedItems = items.map(el => <li>el</li>);
return <ol>{wrappedItems}</ol>;
```

Becomes:

```js
import ElementMap from '@onaio/element-map';

const things = ['a', 'b', 'c'];
return (
  <ol>
    <ElementMap items={things} HTMLTag="li" />
  </ol>
);
```

## Examples

```js
import ElementMap from '@onaio/element-map';

const headerItems = ['Name', 'Age'];
let output = <ElementMap items={headerItems} HTMLTag="th" />;
// output should now look like:
// [<th>Name</th>, <th>Age</th>]
```

```js
import ElementMap from '@onaio/element-map';

const headerItems = ['Fruit', 'Price'];
let output = <ElementMap items={headerItems} HTMLTag="th" className="css-class" />;
// output should now look like:
// [<th className="css-class">Fruit</th>, <th className="css-class">Price</th>]
```

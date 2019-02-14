# ElementMap

A simple `React` component that takes a list of elements and a HTML tag and outputs the same list of elements wrapped in the same HTML tag provided.

Examples:

```js
const headerItems = ['Name', 'Age'];
let output = <ElementMap items={headerItems} HTMLTag="th" />;
// output should now look like:
// [<th>Name</th>, <th>Age</th>]
```

```js
const headerItems = ['Fruit', 'Price'];
let output = <ElementMap items={headerItems} HTMLTag="th" className="css-class" />;
// output should now look like:
// [<th className="css-class">Fruit</th>, <th className="css-class">Price</th>]
```

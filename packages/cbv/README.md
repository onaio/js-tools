# Redux Class Based Views

This package came out of the [ideas expressed here](https://github.com/onaio/js-tools/issues/126).

The objective is to make the process of connecting React components to the Redux store more DRY, and with less boilerplate.

Currently, this package implements the following class based views:

## ObjectList

`ObjectList` is a class based view that works with components that expect to receive an array of objects from the Redux store.

### How does it work?

ObjectList is a generic class that is instantiated with two parameters:

1. The component that you want to connect to the redux store
2. The ObjectList options

### Sample usage

```tsx
import reducer, {
  Message,
  selectAllMessages,
  sendMessage,
  SendMessageAction
} from 'some reducer module';

// this is the component that wants to be connected to the Redux store
const SomeComponent = (props: Props) => {
  const { messages } = props;
  const listItems = messages ? messages.map((e, index) => <li key={index}>{e.message}</li>) : null;
  return listItems ? <ul>{listItems}</ul> : <span>error</span>;
};

// these are options that ObjectList uses
const objectListOptions = {
  actionCreator: sendMessage,
  dispatchPropName: 'actionCreator',
  returnPropName: 'messages',
  selector: selectAllMessages
};

// this is how you implement ObjectList
const ClassBasedView = new ObjectList<Message, SendMessageAction, typeof selectAllMessages, Props>(
  SomeComponent,
  objectListOptions
);

// Voila!  This is a fully redux-connected version of SomeComponent
const ConnectedSomeComponent = ClassBasedView.render();
```

## SingleObject

`SingleObject` is a class based view that works with components that expect to receive a single of objects from the Redux store.

### How does it work?

SingleObject is a generic class that is instantiated with two parameters:

1. The component that you want to connect to the redux store
2. The SingleObject options

### Sample usage

```tsx
import reducer, {
  Message,
  selectAllMessages,
  sendMessage,
  SendMessageAction
} from 'some reducer module';

const TheComponent = (props: Props) => {
  const { message } = props;
  return message ? <div>{message.message}</div> : <div>error</div>;
};

/** SingleObject options */
const singleObjectOptions = {
  actionCreator: sendMessage,
  dispatchPropName: 'actionCreator',
  returnPropName: 'message',
  selector: selectOneMessage
};

// this is how you instantiate SingleObject
const ClassBasedView = new SingleObject<
  Message,
  SendMessageAction,
  typeof selectOneMessage,
  TestProps
>(TheComponent, singleObjectOptions);

// Voila!  This is a fully redux-connected version of SomeComponent
const ConnectedSomeComponent = ClassBasedView.render();
```

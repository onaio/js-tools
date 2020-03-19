# GoogleAnalytics

GoogleAnalytics works with [React ga](https://github.com/react-ga/react-ga) to include Google Analytics code in a website or app that uses [React](https://facebook.github.io/react/)

## Installation

```sh

yarn add @onaio/google-analytics
```

## Tracking page views

A couple of approaches are available for use

### WithGATracker

A high order component `WithGATracker` wraps an entire `App` or `Route` component

#### Usage

```
import { WithGATracker, initGoogleAnalytics,setDimensions } from '@onaio/google-analytics'

const initializeOptions  = {
    testMode: true
}
initGoogleAnalytics('UA-000000-01', initializeOptions)

class App extends Component {
    ....

    render() {
        const dimensions = {
            env: 'test',
            username: 'logged-in-username'
        }
        setDimensions(dimensions);
        return (
            ....
           <Route exact path="/users" component={WithGATracker(Users)} />
        )
    }
}
```

This approach however forces components (and all of their children components) to unmount and remount every time the URL changes.

### RouterTracker (Best approach)

Uses a `Route` that matches everything so that it can be re-rendered on every route change.

#### Usage

```
import { RouteTracker, initGoogleAnalytics } from '@onaio/google-analytics'
....

const initializeOptions  = {
    testMode: true
}
initGoogleAnalytics('UA-000000-01', initializeOptions)

class App extends Component {
    ...
    render () {
        const dimensions = {
            env: 'test',
            username: 'logged-in-username'
        }
        setDimensions(dimensions);
        return (
            <BrowserRouter>

                { <RouteTracker /> }

                <Switch>
                    <AuthorizedRoute path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }

}
```

Note that the `RouteTracker` is not wrapped inside the `Switch`

### API

Initialization must be done before any of the other tracking functions.

#### initGoogleAnalytics(trackingCode, initializeOptions, dimensions)

Returns a boolean. `true` if the initialization was a success, `false` otherwise.

Takes the following arguments:

1. `trackingCode` **(Required)**: A string value for the Google analytics tracking code.

2. `initializeOptions` **(Optional)**: Initialization options as defined by `[react-ga](https://www.npmjs.com/package/react-ga#reactgainitializegatrackingid-options)`. The default options if not provided are:

```
{
  testMode: false
};
```

The `InitializeOptions` interface looks like this

```ts
export interface InitializeOptions {
  debug?: boolean;
  gaAddress?: string;
  testMode?: boolean;
  titleCase?: boolean;
  gaOptions?: GaOptions;
  alwaysSendToDefaultTracker?: boolean;
  standardImplementation?: boolean;
}
```

#### setDimensions(dimensions)

Set [custom dimensions](https://www.npmjs.com/package/react-ga#reactgasetfieldsobject) (user attributes) to be tracked.

Takes the following arguments

1. `dimensions` **(Required)**:

The `Dimensions` interface looks like this

```ts
import { FieldsObject } from 'react-ga';

export interface Dimensions extends FieldsObject {
  env?: string;
  username?: string;
}
```

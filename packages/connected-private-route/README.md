# connected-private-route

This is a wrapper around the [`Route` component from react-router](https://reacttraining.com/react-router/web/api/Route).

Basically what it does is that it checks if the current user is logged in and if so allows them to access the route/page, otherwise it sends them to the defined redirect page(usually the login page).

The component will append the path the user was trying to access onto the redirect path as query string with key `next` should authentication fail.

For instance. Say the user types in some url in the browser e.g `example.com/dashboard`.

If the path `/dashboard` routes to this component like so:

```typescript
        <Router>
          <div className={'main-container'}>
            <Switch>
              <Route path="/login" component={Login} />
              <ConnectedPrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                redirectPath="/login"
                disableLoginProtection=false
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
```

then if the user is authenticated he will be redirected to `example.com/login?next=%2Fdashboard`
`

## Sample usage

```ts
import ConnectedPrivateRoute from '@onaio/connected-private-route'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
     ...
        <Router>
          <div className={'main-container'}>
            <Switch>
              <Route path="/login" component={Login} />
              <ConnectedPrivateRoute
                exact
                path="/"
                component={Home}
                redirectPath="/login"
                disableLoginProtection=false
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
     ...
    )
  }
}

export default App
```

## How it works

Behind the scenes, it works with the [session reducer](https://github.com/onaio/js-tools/tree/master/packages/session-reducer) to check if the user is logged in.

## The props

- **disableLoginProtection**: if this is true, we don't check if the user is authenticated. Useful for turning off login protection without doing much else. Default value is false.
- **redirectPath**: the path that the user will be redirected to if they are not logged in. Default is "/login".

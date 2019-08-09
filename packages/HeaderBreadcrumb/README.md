# HeaderBreadcrumb

HeaderBreadcrumb component is a configurable BreadCrumbs component that renders breadcrumb items with urls as links or without urls as text nodes

## Installation

```sh
yarn add @onaio/head-bread-crumb
```

### The props

The props passed to HeaderBreadcrumb looks like this:

```ts
/** interface for breadcrumb items */
export interface BreadCrumbProps {
  currentPage: Page;
  pages: Page[];
}

/** interface describing page object for use in breadcrumbs */
interface Page {
  url?: string;
  label: string;
}
```

Each page requires a label parameter that is displayed on the HeadBreadcrumb and pages with urls are turned into links and displayed in blue.

### Code example

```ts
import HeaderBreadCrumb from '@onaio/head-bread-crumb';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const props = {
  currentPage: {
    label: 'IRS',
    url: '/irs'
  },
  pages: [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Programs',
      url: '/programs'
    },
    {
      label: 'Provinces',
      url: ''
    },
    {
      label: 'Disctricts'
    }
  ]
};
<Router history={history}>
  <HeaderBreadcrumb {...props} />
</Router>;
```

note that the HeaderBreadcrumb component must be used within a Router component because it has Link component ancestors

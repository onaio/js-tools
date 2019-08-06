import { storiesOf } from '@storybook/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
// add notes here later
import notes from '../../packages/HeaderBreadcrumb/README.md';
/* eslint-enable import/no-extraneous-dependencies */
import HeaderBreadcrumb from '../../packages/HeaderBreadcrumb/src/';

const history = createBrowserHistory();

function testRender() {
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
  return (
    <Router history={history}>
      <HeaderBreadcrumb {...props} />
    </Router>
  );
}

storiesOf('HeaderBreadcrumb', module).add('list items', testRender, { notes });

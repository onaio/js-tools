import { storiesOf } from '@storybook/react';
import React from 'react';
import LoaderMarkdown from '../../packages/loader/README.md';
import Loader from '../../packages/loader/src';

storiesOf('Loader', module).add('with Markdown', () => <Loader />, {
  notes: {
    markdown: LoaderMarkdown
  }
});

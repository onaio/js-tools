import { FunctionComponent } from 'react';
import { expectType } from 'tsd';
import { FlexComponent } from '../types';

describe('types', () => {
  it('FlexComponent', () => {
    const Component: FunctionComponent = () => <div>Hello</div>;

    expectType<FlexComponent>(Component);
  });
});

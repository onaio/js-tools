import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { expectType } from 'tsd';
import { ConnectedFlexComponent, FlexComponent } from '../types';

describe('types', () => {
  it('FlexComponent', () => {
    const Component: FunctionComponent = () => <div>Hello</div>;

    expectType<FlexComponent>(Component);
  });

  it('ConnectedFlexComponent', () => {
    const Component: FunctionComponent = () => <div>Hello</div>;
    const ConnectedComponent: ConnectedFlexComponent = connect()(Component);
    expectType<ConnectedFlexComponent>(ConnectedComponent);
  });
});

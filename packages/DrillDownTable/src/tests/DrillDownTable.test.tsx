import { shallow } from 'enzyme';
import React from 'react';
import DrillDownTable from '..';

describe('DrillDownTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<DrillDownTable />);
  });
});

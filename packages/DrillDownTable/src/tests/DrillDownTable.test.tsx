import { shallow } from 'enzyme';
import React from 'react';
import DrillDownTable from '../DrillDownTable';

describe('DrillDownTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<DrillDownTable />);
  });
});

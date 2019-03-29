import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ListView from '../';

describe('ListView', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      data: [['Data 1'], ['Data 2'], ['Data 3']],
      headerItems: ['Columns']
    };
    shallow(<ListView {...props} />);
  });

  it('renders correctly with derived columns', () => {
    const props = {
      data: [['Data 1'], ['Data 2'], ['Data 3']],
      headerItems: ['Columns']
    };
    const wrapper = mount(<ListView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});

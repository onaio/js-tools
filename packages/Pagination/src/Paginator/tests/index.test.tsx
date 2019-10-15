import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { fetchPageNumbers, Paginator } from '../base';

describe('src/components/paginator - rendering', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Paginator />);
  });

  it('renders correctly without props', () => {
    // check that the dom structure has crucial components
    const wrapper = mount(<Paginator />);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(paginationItemNum).toEqual(4);
    expect(PIWrapper.at(0).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 2).hasClass('disabled')).toBeTruthy();
    expect(toJson(PIWrapper.at(0))).toMatchSnapshot('Start page');
    expect(toJson(PIWrapper.at(1))).toMatchSnapshot('previous page');
    expect(toJson(PIWrapper.at(paginationItemNum - 1))).toMatchSnapshot('Next page');
    expect(toJson(PIWrapper.at(paginationItemNum - 2))).toMatchSnapshot('End page');
  });

  it('renders correctly with minimal data', () => {
    // data does not span more than a single page
    const props = { totalRecords: 5 };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(paginationItemNum).toEqual(5);
  });

  it('renders correctly with minimal data(2 pages)', () => {
    // data does not span more than a single page
    const props = { totalRecords: 31 };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(paginationItemNum).toEqual(6);
    expect(PIWrapper.at(0).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 1).hasClass('disabled')).toBeFalsy();
    expect(PIWrapper.at(paginationItemNum - 2).hasClass('disabled')).toBeFalsy();
    expect(toJson(PIWrapper.at(2))).toMatchSnapshot('paginationItem for page 1');
    expect(toJson(PIWrapper.at(3))).toMatchSnapshot('paginationItem for page 2');
  });

  it('renders correctly with minimal exact data for a single page', () => {
    // data spans to just 2 pages
    const props = { totalRecords: 30 };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(PIWrapper.at(0).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 1).hasClass('disabled')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 2).hasClass('disabled')).toBeTruthy();
    expect(paginationItemNum).toEqual(5);
  });

  it('renders correctly with loads of records', () => {
    // alot of pages
    const props = { totalRecords: 300000 };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    expect(paginationItemNum).toEqual(7);
  });

  it('Maintains active and disabled fields status correctly', () => {
    // 5 pages
    const props = { totalRecords: 135 };
    const wrapper = mount(<Paginator {...props} />);
    let PIWrapper = wrapper.find('PaginationItem');
    expect(PIWrapper.length).toEqual(7);

    // go to the 3rd page
    PIWrapper.at(4)
      .find('PaginationLink a')
      .simulate('click');

    // wrapper.update();
    let updatedPIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = updatedPIWrapper.length;
    PIWrapper = wrapper.find('PaginationItem');
    expect(paginationItemNum).toEqual(9);
    expect(PIWrapper.at(0).hasClass('disabled')).toBeFalsy();
    expect(PIWrapper.at(1).hasClass('disabled')).toBeFalsy();
    expect(PIWrapper.at(4).hasClass('active')).toBeTruthy();
    expect(PIWrapper.at(paginationItemNum - 1).hasClass('disabled')).toBeFalsy();
    expect(PIWrapper.at(paginationItemNum - 2).hasClass('disabled')).toBeFalsy();

    // go to the last page
    PIWrapper.at(8)
      .find('PaginationLink a')
      .simulate('click');

    wrapper.update();
    updatedPIWrapper = wrapper.find('PaginationItem');
    expect(updatedPIWrapper.length).toEqual(7);
    expect(updatedPIWrapper.at(0).hasClass('disabled')).toBeFalsy();
    expect(updatedPIWrapper.at(1).hasClass('disabled')).toBeFalsy();
    expect(updatedPIWrapper.at(4).hasClass('active')).toBeTruthy();
    const nextItemAt = 5;
    expect(updatedPIWrapper.at(nextItemAt).hasClass('disabled')).toBeTruthy();
    const endItemAt = 6;
    expect(updatedPIWrapper.at(endItemAt).hasClass('disabled')).toBeTruthy();
  });

  it('clicking next & start link work correctly', () => {
    // clicking next takes you to correct page; will use 10 pages
    const props = { totalRecords: 280 };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    const paginationItemNum = PIWrapper.length;
    // clicking next
    const NextItem = PIWrapper.at(paginationItemNum - 2).find('PaginationLink a');
    NextItem.simulate('click');
    wrapper.update();
    expect(
      wrapper
        .find('PaginationItem')
        .at(3)
        .hasClass('active')
    ).toBeTruthy();

    // clicking start takes you to start page
    const startPageAt = 2;
    const startItem = wrapper
      .find('PaginationItem')
      .at(0)
      .find('PaginationLink a');
    startItem.simulate('click');
    wrapper.update();
    expect(
      wrapper
        .find('PaginationItem')
        .at(startPageAt)
        .hasClass('active')
    ).toBeTruthy();
  });

  it('clicking end link work correctly', () => {
    // clicking end takes you to last page; will use 10 pages
    const lastPageAt = 6;
    const props = { totalRecords: 280 };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    let paginationItemNum = PIWrapper.length;
    // clicking end
    const endItem = PIWrapper.at(lastPageAt).find('PaginationLink a');
    endItem.simulate('click');
    wrapper.update();
    expect(
      wrapper
        .find('PaginationItem')
        .at(4)
        .hasClass('active')
    ).toBeTruthy();

    // clicking previous
    const previousPageAt = 1;
    const updatedPIWrapper = wrapper.find('PaginationItem');
    paginationItemNum = updatedPIWrapper.length;
    const previousItem = updatedPIWrapper.at(previousPageAt).find('PaginationLink a');
    previousItem.simulate('click');
    wrapper.update();
    expect(
      wrapper
        .find('PaginationItem')
        .at(4)
        .hasClass('active')
    ).toBeTruthy();
  });

  it('calls pageChangeHandler with correct args', () => {
    // 5 pages
    const mock: any = jest.fn();
    const props = { totalRecords: 135, onPageChange: mock };
    const wrapper = mount(<Paginator {...props} />);
    const PIWrapper = wrapper.find('PaginationItem');
    expect(PIWrapper.length).toEqual(7);

    PIWrapper.at(5)
      .find('PaginationLink a')
      .simulate('click'); // click on next

    const mockArgs = {
      currentPage: 2,
      pageLimit: 30,
      totalPages: 5,
      totalRecords: 135
    };
    wrapper.update();
    expect(mock).toBeCalled();
    expect(mock).toHaveBeenCalledWith(mockArgs);
  });

  // TODO - tabbing through the links works??.
});

describe('src/components/paginator - helpers/utilities', () => {
  it('fetchPageNumbers works for nominal case', () => {
    let neighbourPillsNum = 2;
    const totalPages = 24;
    let currentPage = 8;
    let expected: number[] = [6, 7, 8, 9, 10];
    expect(fetchPageNumbers(neighbourPillsNum, totalPages, currentPage)).toEqual(expected);

    neighbourPillsNum = 1;
    expected = [7, 8, 9];
    expect(fetchPageNumbers(neighbourPillsNum, totalPages, currentPage)).toEqual(expected);

    neighbourPillsNum = 1;
    expected = [14, 15, 16];
    currentPage = 15;
    expect(fetchPageNumbers(neighbourPillsNum, totalPages, currentPage)).toEqual(expected);
  });

  it('fetchPageNumbers works for right boundary edgecase', () => {
    const neighbourPillsNum = 2;
    const totalPages = 24;
    const currentPage = 24;
    const expected: number[] = [22, 23, 24];
    expect(fetchPageNumbers(neighbourPillsNum, totalPages, currentPage)).toEqual(expected);
  });

  it('fetchPageNumbers works for left boundary edgecase', () => {
    const neighbourPillsNum = 2;
    const totalPages = 24;
    const currentPage = 1;
    const expected: number[] = [1, 2, 3];
    expect(fetchPageNumbers(neighbourPillsNum, totalPages, currentPage)).toEqual(expected);
  });
});

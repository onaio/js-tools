import { ReactWrapper } from 'enzyme';

export const renderTable = (wrap: ReactWrapper, text = '') => {
  wrap
    .find('table tr')
    .forEach((tr, indx) => expect(tr.text()).toMatchSnapshot(`${text} tr index ${indx}`));
};

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Navbar from './Navbar';

configure({ adapter: new Adapter() });

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
describe('Header Component', () => {
  it('It should render navbar without errors', () => {
    const component = shallow(<Navbar />);
    const wrapper = findByTestAtrr(component, 'headerComponent');
    expect(wrapper.length).toBe(1);
  });
});

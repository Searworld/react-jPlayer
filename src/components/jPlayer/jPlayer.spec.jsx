import React from 'react';
import expect, { restoreSpies } from 'expect';
import { shallow } from 'enzyme';

import JPlayer from './jPlayer';
import KeyControl from '../../keyControl/keyControlContainer';

const setup = () => {
  const props = {
    keyEnabled: false,
    children: (<div className="@@jPlayer-test" />),
    'data-test': 'test',
  };

  const wrapper = shallow(<JPlayer {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<JPlayer />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    ({ wrapper, props } = setup());
  });

  it('renders self and subcomponents', () => {
    expect(wrapper.children('.@@jPlayer-test').exists()).toBeTruthy();
    expect(wrapper.children(KeyControl).exists()).toBeFalsy();
    expect(wrapper.prop('data-test')).toBe(props['data-test']);
  });

  it('enables keycontrols if keyEnabled', () => {
    wrapper.setProps({ keyEnabled: true });
    expect(wrapper.children(KeyControl).exists()).toBeTruthy();
  });

  afterEach(() => {
    restoreSpies();
  });
});

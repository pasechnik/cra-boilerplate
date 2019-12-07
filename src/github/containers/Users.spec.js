import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { Users } from './Users'

configure({ adapter: new Adapter() })

const setup = () => {
  const props = {
    loading: false,
    users: [],
    login: 'test',
    doUsers: jest.fn(),
    doLoginSet: jest.fn(),
    doUserSet: jest.fn(),
  }

  const wrapper = shallow(<Users {...props} />)

  return {
    props,
    wrapper,
  }
}

describe('<Users />', () => {
  it('Renders', () => {
    const { wrapper } = setup()

    expect(wrapper).toMatchSnapshot()
  })

  // Doesn't work with AsyncTypeahead
  // it('should call search users if length of text is greater than 3', () => {
  //   const {
  //     props,
  //     wrapper,
  //   } = setup()
  //
  //   const input = wrapper.find('#inputsearch')
  //   input.simulate('focus')
  //   input.simulate('change', { target: { value: 'te' } })
  //   expect(props.doLoginSet.mock.calls.length).toBe(0)
  //   input.simulate('change', { target: { value: 'testusche' } })
  //   expect(props.doLoginSet.mock.calls.length).toBe(1)
  // })
})

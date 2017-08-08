/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/header/Nav.js'

let wrapper

describe('Nav component', () => {
  beforeAll(function () {
    wrapper = shallow(<Component />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('toggles the nav dropdown', () => {
    const button = wrapper.find('button')
    expect(wrapper.state().isOpen).toBe(false)
    button.simulate('click')
    expect(wrapper.state().isOpen).toBe(true)
  })
})

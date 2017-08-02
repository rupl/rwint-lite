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
})

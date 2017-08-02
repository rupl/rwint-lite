/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/header/Header.js'

let wrapper

describe('Header component', () => {
  beforeAll(function () {
    wrapper = shallow(<Component />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })
})

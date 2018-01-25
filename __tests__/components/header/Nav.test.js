/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Nav from '../../../components/header/Nav.js'
import Router from 'next/router'
Router['push'] = jest.fn(() => function () {})

let navLinks, wrapper

describe('Nav component', () => {
  beforeAll(function () {
    wrapper = shallow(<Nav />)
    navLinks = wrapper.find('NavLink')
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

  it('renders a NavLink for each nav item', () => {
    expect(navLinks.length).toBe(5)
    expect(navLinks.get(0).props.link.label).toEqual('Updates')
    expect(navLinks.get(0).props.link.type).toEqual('report')
  })
})

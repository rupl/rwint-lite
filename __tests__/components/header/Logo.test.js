/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Component from '../../../components/header/Logo.js'

let wrapper

describe('Logo component', () => {
  it('renders the component', () => {
    wrapper = shallow(<Component />)
    expect(wrapper.exists()).toBe(true)
  })

  describe('On the homepage', () => {
    beforeAll(function () {
      wrapper = shallow(<Component home='true' />)
    })

    it('renders a h1', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
    })

    it('does not render a link', () => {
      expect(wrapper.find('a').exists()).toBe(false)
    })

    it('has the active class', () => {
      expect(wrapper.find('h1').hasClass('active')).toBe(true)
    })
  })

  describe('On other pages', () => {
    beforeAll(function () {
      wrapper = shallow(<Component />)
    })

    it('does not render a h1', () => {
      expect(wrapper.find('h1').exists()).toBe(false)
    })

    it('renders a link', () => {
      expect(wrapper.find('a').exists()).toBe(true)
    })
    it('does not have the active class', () => {
      expect(wrapper.find('a').hasClass('active')).toBe(false)
    })
  })
})

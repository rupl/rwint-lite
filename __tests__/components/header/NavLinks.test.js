/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import NavLink from '../../../components/header/NavLink.js'

let link, linkEl, wrapper

describe('Nav Link component', () => {
  describe('Populating the link', () => {
    beforeAll(function () {
      link = {
        label: 'Countries',
        type: 'country'
      }
      wrapper = shallow(<NavLink link={link} />)
      linkEl = wrapper.find('Link')
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a link with the correct href and as properties', () => {
      expect(linkEl.exists()).toBe(true)
      expect(linkEl.prop('href')).toBe('/country-listing')
      expect(linkEl.prop('as')).toBe('/country/listing')
    })

    it('renders the link label', () => {
      expect(linkEl.find('a').text()).toContain('Countries')
    })
  })
  describe('Inactive links', () => {
    beforeAll(function () {
      link = {
        label: 'Countries',
        type: 'country'
      }
      wrapper = shallow(<NavLink link={link} />)
      linkEl = wrapper.find('Link')
    })

    it('does not add the active class to inactive links', () => {
      expect(linkEl.find('a').hasClass('link--active')).toBe(false)
    })
  })
  describe('Active links', () => {
    beforeAll(function () {
      link = {
        label: 'Updates',
        type: 'report'
      }

      wrapper = shallow(<NavLink link={link} isActive />)
      linkEl = wrapper.find('Link')
    })

    it('adds the active class to active links', () => {
      expect(linkEl.find('a').hasClass('link--active')).toBe(true)
    })
  })
})

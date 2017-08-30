/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import InfoLinks from '../../../components/links/InfoLinks.js'

let linkEl, sourcesLinks, wrapper
const country = {
  name: 'South Yorkshire',
  shortname: 'SoYo'
}
const sources = [
  {
    name: 'Sheffield Star',
    shortname: 'Star'
  },
  {
    name: 'Sheffield Telegraph'
  },
  {
    name: 'Now Then'
  }
]

describe('Info Links component', () => {
  describe('Standard version', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinks country={country} sources={sources} />)
      sourcesLinks = wrapper.find('.sources')
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the country links', () => {
      linkEl = wrapper.find('Link').at(0)
      expect(linkEl.find('a').text()).toContain('South Yorkshire')
      expect(linkEl.prop('href')).toBe('/updates?search=country.exact:"South Yorkshire"')
      expect(linkEl.prop('as')).toBe('/report/listing?search=country.exact:"South Yorkshire"')
    })

    it('renders the source links', () => {
      expect(sourcesLinks.at(0).find('a').text()).toContain('Sheffield Star')
      expect(sourcesLinks.at(1).find('a').text()).toContain('Sheffield Telegraph')
      expect(sourcesLinks.at(0).find('Link').prop('href')).toBe('/updates?search=source.exact:"Sheffield Star"')
      expect(sourcesLinks.at(0).find('Link').prop('as')).toBe('/report/listing?search=source.exact:"Sheffield Star"')
    })

    it('only shows up to 2 sources', () => {
      expect(sourcesLinks.length).toBe(2)
      expect(wrapper.find('.sources-more').text()).toEqual('+1 more')
    })
  })

  describe('Summary version', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinks country={country} sources={sources} type='summary' />)
      sourcesLinks = wrapper.find('.sources')
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.summary').exists()).toBe(true)
    })

    it('renders the country links using the shortname if available', () => {
      linkEl = wrapper.find('Link').at(0)
      expect(linkEl.find('a').text()).toContain('SoYo')
      expect(linkEl.prop('href')).toBe('/updates?search=country.exact:"SoYo"')
      expect(linkEl.prop('as')).toBe('/report/listing?search=country.exact:"SoYo"')
    })

    it('renders the source links using the shortname if available', () => {
      expect(sourcesLinks.at(0).find('a').text()).toContain('Star')
      expect(sourcesLinks.at(1).find('a').text()).toContain('Sheffield Telegraph')
      expect(sourcesLinks.at(0).find('Link').prop('href')).toBe('/updates?search=source.exact:"Sheffield Star"')
      expect(sourcesLinks.at(0).find('Link').prop('as')).toBe('/report/listing?search=source.exact:"Sheffield Star"')
    })

    it('only shows up to 2 sources', () => {
      expect(sourcesLinks.length).toBe(2)
      expect(wrapper.find('.sources-more').text()).toEqual('+1 more')
    })
  })
})

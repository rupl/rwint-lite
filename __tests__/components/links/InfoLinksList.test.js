/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import InfoLinksList from '../../../components/links/InfoLinksList.js'

let links, wrapper
const items = [
  {
    name: 'Sheffield Star',
    shortname: 'Star'
  },
  {
    name: 'Sheffield Telegraph'
  },
  {
    name: 'Now Then'
  },
  {
    name: 'Exposed'
  }
]
const singleItem = [items[0]]
const twoItems = [items[0], items[1]]

describe('Info Links List component', () => {
  describe('Only one item in the list', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinksList dataType='source' items={singleItem} />)
      links = wrapper.find('Link')
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a link for the item', () => {
      expect(links.length).toBe(1)
    })

    it('renders the name as the link text', () => {
      expect(links.at(0).find('a').text()).toContain('Sheffield Star')
    })
  })

  describe('Setting the correct search path', () => {
    it('links to updates search by default', () => {
      wrapper = shallow(<InfoLinksList dataType='source' items={singleItem} />)
      links = wrapper.find('Link')
      expect(links.at(0).prop('href')).toBe('/report-listing?search=source.exact:%22Sheffield+Star%22')
      expect(links.at(0).prop('as')).toBe('/report/listing?search=source.exact:%22Sheffield+Star%22')
    })

    it('links to jobs search if set', () => {
      wrapper = shallow(<InfoLinksList dataType='source' items={singleItem} searchType='job' />)
      links = wrapper.find('Link')
      expect(links.at(0).prop('href')).toBe('/job-listing?search=source.exact:%22Sheffield+Star%22')
      expect(links.at(0).prop('as')).toBe('/job/listing?search=source.exact:%22Sheffield+Star%22')
    })

    it('links to trainings search if set', () => {
      wrapper = shallow(<InfoLinksList dataType='source' items={singleItem} searchType='training' />)
      links = wrapper.find('Link')
      expect(links.at(0).prop('href')).toBe('/training-listing?search=source.exact:%22Sheffield+Star%22')
      expect(links.at(0).prop('as')).toBe('/training/listing?search=source.exact:%22Sheffield+Star%22')
    })
  })

  describe('2 items in the list', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinksList dataType='source' items={twoItems} />)
      links = wrapper.find('Link')
    })

    it('renders a link for the item', () => {
      expect(links.length).toBe(2)
    })

    it('renders the name as the link text', () => {
      expect(links.at(0).find('a').text()).toContain('Sheffield Star')
      expect(links.at(1).find('a').text()).toContain('Sheffield Telegraph')
    })
  })

  describe('More than 2 items in the list', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinksList dataType='source' items={items} />)
      links = wrapper.find('Link')
    })

    it('renders links for the first 2 items', () => {
      expect(links.length).toBe(2)
      expect(links.at(0).find('a').text()).toContain('Sheffield Star')
      expect(links.at(1).find('a').text()).toContain('Sheffield Telegraph')
    })

    it('show how many more items there are', () => {
      expect(wrapper.find('.more').text()).toEqual('+2 more')
    })
  })

  describe('Dividers', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinksList dataType='source' divider='true' items={items} />)
    })

    it('renders a divider if required', () => {
      expect(wrapper.find('.divider').exists()).toBe(true)
    })
  })

  describe('Summary version', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinksList dataType='source' items={items} type='summary' />)
      links = wrapper.find('Link')
    })
    it('renders the links using the shortname if available', () => {
      expect(links.at(0).find('a').text()).toContain('Star')
      expect(links.at(1).find('a').text()).toContain('Sheffield Telegraph')
    })
  })
})

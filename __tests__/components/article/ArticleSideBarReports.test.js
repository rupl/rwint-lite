/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import { ArticleSideBarReports } from '../../../components/article/ArticleSideBarReports.js'
import { mockCountry, mockDisaster, mockReports } from '../../../__fixtures__/data.fixture'

describe('Article SideBar with Reports component', () => {
  let wrapper

  describe('On a Country article', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleSideBarReports item={mockCountry} reports={{items: mockReports.data}} type='country' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a link for each report', () => {
      const links = wrapper.find('ReportLinkSmall')
      expect(links.length).toBe(10)
    })

    it('renders a link to more updates', () => {
      const link = wrapper.find('Link')
      expect(link.prop('as')).toBe('/report/listing?search=country.exact:"I am a country"')
      expect(link.prop('href')).toBe('/report-listing?search=country.exact:"I am a country"')
      expect(link.find('a').text()).toBe('View more I am a country updates')
    })
  })

  describe('On a Disaster article', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleSideBarReports item={mockDisaster} reports={{items: mockReports.data}} type='disaster' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders a link for each report', () => {
      const links = wrapper.find('ReportLinkSmall')
      expect(links.length).toBe(10)
    })

    it('renders a link to more updates', () => {
      const link = wrapper.find('Link')
      expect(link.prop('as')).toBe('/report/listing?search=disaster.exact:"I am a disaster"')
      expect(link.prop('href')).toBe('/report-listing?search=disaster.exact:"I am a disaster"')
      expect(link.find('a').text()).toBe('View more I am a disaster updates')
    })
  })
})

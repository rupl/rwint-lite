/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import { ArticleSideBarReports } from '../../../components/article/ArticleSideBarReports.js'
import { mockCountry, mockReports } from '../../../__fixtures__/data.fixture'

describe('Article SideBar with Reports component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<ArticleSideBarReports country={mockCountry} updates={{items: mockReports.data}} />)
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
    expect(link.prop('href')).toBe('/updates?search=country.exact:"I am a country"')
    expect(link.find('a').text()).toBe('View more I am a country updates')
  })
})

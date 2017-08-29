/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleInfo from '../../../components/article/ArticleInfo.js'

describe('Article Info component', () => {
  let wrapper
  const items = [
    {name: 'South Yorkshire'},
    {name: 'pud'}
  ]

  beforeAll(() => {
    wrapper = shallow(<ArticleInfo heading='The heading' type='country' items={items} />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the heading', () => {
    expect(wrapper.find('h2').text()).toContain('The heading')
  })

  it('renders a link for each item', () => {
    expect(wrapper.find('a').length).toBe(2)
    expect(wrapper.find('a').first().text()).toContain('South Yorkshire')
    expect(wrapper.find('Link').first().prop('href')).toBe('/updates?search=country.exact:"South Yorkshire"')
    expect(wrapper.find('Link').first().prop('as')).toBe('/report/listing?search=country.exact:"South Yorkshire"')
  })
})

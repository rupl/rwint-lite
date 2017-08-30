/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleInfo from '../../../components/article/ArticleInfo.js'

describe('Article Info component', () => {
  let wrapper
  const itemsSingular = [{name: 'South Yorkshire'}]
  const items = [
    {name: 'South Yorkshire'},
    {name: 'Cheshire'}
  ]

  it('renders the component', () => {
    wrapper = shallow(<ArticleInfo heading='Source' type='source' items={items} />)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the singular heading if only one item', () => {
    wrapper = shallow(<ArticleInfo heading='Source' type='source' items={itemsSingular} />)
    expect(wrapper.find('h2').text()).toContain('Source')
  })

  it('renders the plural heading if more than one item', () => {
    wrapper = shallow(<ArticleInfo heading='Source' type='source' items={items} />)
    expect(wrapper.find('h2').text()).toContain('Sources')
  })

  it('renders the correct plural heading for countries', () => {
    wrapper = shallow(<ArticleInfo heading='Country' type='country' items={items} />)
    expect(wrapper.find('h2').text()).toContain('Countries')
  })

  it('renders a link for each item', () => {
    wrapper = shallow(<ArticleInfo heading='Country' type='country' items={items} />)
    expect(wrapper.find('a').length).toBe(2)
    expect(wrapper.find('a').first().text()).toContain('South Yorkshire')
    expect(wrapper.find('Link').first().prop('href')).toBe('/updates?search=country.exact:"South Yorkshire"')
    expect(wrapper.find('Link').first().prop('as')).toBe('/report/listing?search=country.exact:"South Yorkshire"')
  })
})

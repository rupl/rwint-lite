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

  it('sets the search term based on the item type', () => {
    wrapper = shallow(<ArticleInfo heading='Language' type='language' items={items} />)
    expect(wrapper.find('Link').first().prop('href')).toBe('/updates?search=language.exact:"South Yorkshire"')
    expect(wrapper.find('Link').first().prop('as')).toBe('/report/listing?search=language.exact:"South Yorkshire"')
  })

  it('sets the correct search term for cost ', () => {
    wrapper = shallow(<ArticleInfo heading='Cost' type='cost' items={items} />)
    expect(wrapper.find('Link').first().prop('href')).toBe('/updates?search=cost:"South Yorkshire"')
    expect(wrapper.find('Link').first().prop('as')).toBe('/report/listing?search=cost:"South Yorkshire"')
  })

  it('changes + to plus in in the search term for job experience', () => {
    wrapper = shallow(<ArticleInfo heading='experience' type='experience' searchType='job' items={[{name: '10+ years'}]} />)
    expect(wrapper.find('Link').first().prop('href')).toBe('/jobs?search=experience.exact:"10plus years"')
    expect(wrapper.find('Link').first().prop('as')).toBe('/job/listing?search=experience.exact:"10plus years"')
  })

  it('sets the search path based on the article type', () => {
    wrapper = shallow(<ArticleInfo heading='Language' searchType='job' type='language' items={items} />)
    expect(wrapper.find('Link').first().prop('href')).toBe('/jobs?search=language.exact:"South Yorkshire"')
    expect(wrapper.find('Link').first().prop('as')).toBe('/job/listing?search=language.exact:"South Yorkshire"')
  })
})

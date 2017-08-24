/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleAttachments from '../../../components/article/ArticleAttachments.js'

describe('Article Attachments component', () => {
  let wrapper
  const items = [
    {url: 'http://something.pdf'},
    {url: 'http://somehting-else.pdf', filename: 'a pdf'}
  ]

  beforeAll(() => {
    wrapper = shallow(<ArticleAttachments heading='The heading' items={items} />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the heading', () => {
    expect(wrapper.find('h2').text()).toContain('The heading')
  })

  it('renders a link for each item', () => {
    expect(wrapper.find('a').length).toBe(2)
    expect(wrapper.find('a').first().text()).toContain('http://something.pdf')
    expect(wrapper.find('a').first().prop('href')).toContain('http://something.pdf')
    expect(wrapper.find('a').at(1).text()).toContain('a pdf')
    expect(wrapper.find('a').at(1).prop('href')).toContain('http://somehting-else.pdf')
  })
})

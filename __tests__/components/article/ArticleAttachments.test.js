/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleAttachments from '../../../components/article/ArticleAttachments.js'

describe('Article Attachments component', () => {
  let wrapper
  const items = [
    {url: 'http://something1.pdf', filesize: '727962', mimetype: 'application/pdf'},
    {url: 'http://something-else2.pdf', filename: 'a pdf', filesize: '7279620', mimetype: 'application/pdf'},
    {url: 'http://something-else3.pdf', filename: 'a pdf', description: 'This is a description'}
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
    expect(wrapper.find('a').length).toBe(3)
  })

  it('shows the file description if present', () => {
    expect(wrapper.find('a').at(2).text()).toContain('This is a description')
    expect(wrapper.find('a').at(2).prop('href')).toContain('http://something-else3.pdf')
  })

  it('if the file description is not present it shows the filename', () => {
    expect(wrapper.find('a').at(1).text()).toContain('a pdf')
    expect(wrapper.find('a').at(1).prop('href')).toContain('http://something-else2.pdf')
  })

  it('if the file description and name are not present it shows the url', () => {
    expect(wrapper.find('a').at(0).text()).toContain('http://something1.pdf')
    expect(wrapper.find('a').at(0).prop('href')).toContain('http://something1.pdf')
  })

  it('shows the file size', () => {
    expect(wrapper.find('a').at(0).text()).toContain('728 kB')
    expect(wrapper.find('a').at(1).text()).toContain('7.28 MB')
  })

  it('shows the file type', () => {
    expect(wrapper.find('a').at(0).text()).toContain('PDF')
    expect(wrapper.find('a').at(1).text()).toContain('PDF')
  })
})

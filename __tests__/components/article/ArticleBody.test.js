/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleBody from '../../../components/article/ArticleBody.js'
import { mockUpdate } from '../../../__fixtures__/data.fixture'

describe('Article Body component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<ArticleBody report={mockUpdate} />)
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the title', () => {
    expect(wrapper.find('h1').text()).toContain(mockUpdate.fields.title)
  })

  it('renders the publish date', () => {
    expect(wrapper.find('.date').text()).toContain('Published on 23 August 2017')
  })

  it('renders a link to the original', () => {
    expect(wrapper.find('.original').text()).toContain('View original')
  })

  it('renders the body', () => {
    expect(wrapper.find('.body').exists()).toBe(true)
  })
})

/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleHeader from '../../../components/article/ArticleHeader.js'
import { mockCountry, mockUpdate } from '../../../__fixtures__/data.fixture'

describe('Article Header component', () => {
  let wrapper

  describe('Header on Country articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleHeader report={mockCountry} />)
    })

    it('renders the name', () => {
      expect(wrapper.find('h1').text()).toContain(mockCountry.fields.name)
    })
  })

  describe('Header on Report articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleHeader report={mockUpdate} hasInfo />)
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
  })
})

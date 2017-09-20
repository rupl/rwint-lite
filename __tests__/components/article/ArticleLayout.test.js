/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleLayout from '../../../components/article/ArticleLayout.js'
import { mockUpdate } from '../../../__fixtures__/data.fixture'

describe('Article Layout component', () => {
  let wrapper

  describe('Layout on Update articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleLayout report={mockUpdate} />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the header', () => {
      expect(wrapper.find('ArticleHeader').exists()).toBe(true)
      expect(wrapper.find('ArticleHeader').prop('report')).toEqual(mockUpdate)
    })

    it('renders the body', () => {
      expect(wrapper.find('ArticleBody').exists()).toBe(true)
      expect(wrapper.find('ArticleBody').prop('report')).toEqual(mockUpdate)
    })

    it('renders the sidebar', () => {
      expect(wrapper.find('ArticleSideBar').exists()).toBe(true)
    })
  })
})

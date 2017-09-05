/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleLayout from '../../../components/article/ArticleLayout.js'
import { mockCountry, mockUpdate } from '../../../__fixtures__/data.fixture'

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
      expect(wrapper.find('ArticleHeader').prop('hasInfo')).toBe(true)
    })

    it('renders the body', () => {
      expect(wrapper.find('ArticleBody').exists()).toBe(true)
      expect(wrapper.find('ArticleBody').prop('report')).toEqual(mockUpdate)
    })

    it('renders the sidebar', () => {
      expect(wrapper.find('ArticleSideBar').exists()).toBe(true)
    })
  })

  describe('Layout on Country articles with a report', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleLayout report={mockCountry} type='country' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the header', () => {
      expect(wrapper.find('ArticleHeader').exists()).toBe(true)
      expect(wrapper.find('ArticleHeader').prop('report')).toEqual(mockCountry)
      expect(wrapper.find('ArticleHeader').prop('hasInfo')).toBe(false)
    })

    it('renders the body', () => {
      expect(wrapper.find('CountryBody').exists()).toBe(true)
      expect(wrapper.find('CountryBody').prop('report')).toEqual(mockCountry)
    })
  })

  describe('Layout on Country articles without report', () => {
    beforeAll(() => {
      let countryWithoutBody = Object.assign({}, mockCountry)
      delete countryWithoutBody.fields['description-html']
      wrapper = shallow(<ArticleLayout report={countryWithoutBody} type='country' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the header', () => {
      expect(wrapper.find('ArticleHeader').exists()).toBe(true)
      expect(wrapper.find('ArticleHeader').prop('report')).toEqual(mockCountry)
      expect(wrapper.find('ArticleHeader').prop('hasInfo')).toBe(false)
    })

    it('does not render the body', () => {
      expect(wrapper.find('CountryBody').exists()).toBe(false)
    })
  })
})

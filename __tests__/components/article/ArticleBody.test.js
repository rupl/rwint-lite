/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleBody from '../../../components/article/ArticleBody.js'
import { mockJob, mockTraining, mockUpdate } from '../../../__fixtures__/data.fixture'

describe('Article Body component', () => {
  let wrapper

  describe('Update', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleBody report={mockUpdate} />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the body', () => {
      expect(wrapper.find('.body').exists()).toBe(true)
    })

    it('does not render how to apply', () => {
      expect(wrapper.find('.apply').exists()).toBe(false)
    })

    it('does not render how to register', () => {
      expect(wrapper.find('.reg').exists()).toBe(false)
    })
  })

  describe('Job', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleBody report={mockJob} />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the body', () => {
      expect(wrapper.find('.body').exists()).toBe(true)
    })

    it('renders how to apply', () => {
      expect(wrapper.find('.apply').exists()).toBe(true)
    })

    it('does not render how to register', () => {
      expect(wrapper.find('.reg').exists()).toBe(false)
    })
  })

  describe('Training', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleBody report={mockTraining} />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the body', () => {
      expect(wrapper.find('.body').exists()).toBe(true)
    })

    it('renders how to register', () => {
      expect(wrapper.find('.reg').exists()).toBe(true)
    })

    it('renders fee information', () => {
      expect(wrapper.find('.fee').exists()).toBe(true)
    })

    it('does not render how to apply', () => {
      expect(wrapper.find('.apply').exists()).toBe(false)
    })
  })
})

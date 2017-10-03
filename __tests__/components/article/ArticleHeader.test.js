/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleHeader from '../../../components/article/ArticleHeader.js'
import { mockCountry, mockDisaster, mockJob, mockTraining, mockTraining2, mockUpdate } from '../../../__fixtures__/data.fixture'

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
      wrapper = shallow(<ArticleHeader report={mockUpdate} />)
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
      expect(wrapper.find('a.btn-small').text()).toContain('View original')
    })
  })

  describe('Header on Disaster articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleHeader report={mockDisaster} type='disaster' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the title', () => {
      expect(wrapper.find('h1').text()).toContain(mockDisaster.fields.name)
    })

    it('renders the publish date', () => {
      expect(wrapper.find('.date').text()).toContain('Published on 23 August 2017')
    })
  })

  describe('Header on Job articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleHeader report={mockJob} type='job' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the title', () => {
      expect(wrapper.find('h1').text()).toContain(mockJob.fields.title)
    })

    it('renders the application date', () => {
      expect(wrapper.find('.date').text()).toContain('Closing date: 23 August 2017')
    })
  })

  describe('Header on Training articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleHeader report={mockTraining} type='training' />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the title', () => {
      expect(wrapper.find('h1').text()).toContain(mockTraining.fields.title)
    })

    it('renders the application date', () => {
      expect(wrapper.find('.date').text()).toContain('From 24 Aug 2017 to 23 Aug 2017 Registration before 22 Aug 2017')
    })
  })

  describe('Header on ongoing Training articles', () => {
    beforeAll(() => {
      wrapper = shallow(<ArticleHeader report={mockTraining2} type='training' />)
    })

    it('renders the application date', () => {
      expect(wrapper.find('.date').text()).toContain('Ongoing course')
    })
  })
})

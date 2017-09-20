/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import InfoLinks from '../../../components/links/InfoLinks.js'

let countriesList, disasterTypesList, sourcesList, wrapper
const countries = [
  {
    name: 'South Yorkshire',
    shortname: 'SoYo'
  }
]
const disasterTypes = [
  {
    name: 'cyclone'
  }
]
const sources = [
  {
    name: 'Sheffield Star',
    shortname: 'Star'
  },
  {
    name: 'Sheffield Telegraph'
  },
  {
    name: 'Now Then'
  }
]

describe('Info Links component', () => {
  describe('Standard version', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinks countries={countries} disasterTypes={disasterTypes} sources={sources} />)
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
      countriesList = wrapper.find('InfoLinksList').at(0)
      disasterTypesList = wrapper.find('InfoLinksList').at(1)
      sourcesList = wrapper.find('InfoLinksList').at(2)
    })

    it('renders the InfoLinksList for countries', () => {
      expect(countriesList.exists()).toBe(true)
      expect(countriesList.prop('dataType')).toBe('country')
      expect(countriesList.prop('items')).toEqual(countries)
    })

    it('renders the InfoLinksList for disaster types', () => {
      expect(disasterTypesList.exists()).toBe(true)
      expect(disasterTypesList.prop('dataType')).toBe('disaster_type')
      expect(disasterTypesList.prop('items')).toEqual(disasterTypes)
    })

    it('renders the InfoLinksList for sources', () => {
      expect(sourcesList.exists()).toBe(true)
      expect(sourcesList.prop('dataType')).toBe('source')
      expect(sourcesList.prop('items')).toEqual(sources)
    })
  })

  describe('Divider', () => {
    it('shows a divider on disasterTypes and sources if there are countries', () => {
      wrapper = shallow(<InfoLinks countries={countries} disasterTypes={disasterTypes} sources={sources} />)
      disasterTypesList = wrapper.find('InfoLinksList').at(1)
      sourcesList = wrapper.find('InfoLinksList').at(2)
      expect(disasterTypesList.prop('divider')).toBe(1)
      expect(sourcesList.prop('divider')).toBe(1)
    })

    it('does not show a divider on disasterTypes and sources if there are no countries', () => {
      wrapper = shallow(<InfoLinks disasterTypes={disasterTypes} sources={sources} />)
      disasterTypesList = wrapper.find('InfoLinksList').at(0)
      sourcesList = wrapper.find('InfoLinksList').at(1)
      expect(disasterTypesList.prop('divider')).toEqual(undefined)
      expect(sourcesList.prop('divider')).toEqual(undefined)
    })
  })

  describe('Summary version', () => {
    beforeAll(function () {
      wrapper = shallow(<InfoLinks sources={sources} type='summary' />)
    })

    it('adds the summary className to the component', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.summary').exists()).toBe(true)
    })
  })
})

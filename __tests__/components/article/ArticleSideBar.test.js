/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import ArticleSideBar from '../../../components/article/ArticleSideBar.js'
import { mockUpdate } from '../../../__fixtures__/data.fixture'

describe('Article Attachments component', () => {
  let attachmentInfo, countryInfo, disastersInfo, disasterTypeInfo, formatInfo, languageInfo, report,
    sourceInfo, themeInfo, vulnerableGroupInfo, wrapper

  beforeEach(() => {
    report = [...mockUpdate]
    report.fields = {}
  })

  it('renders the component', () => {
    wrapper = shallow(<ArticleSideBar report={mockUpdate} />)
    expect(wrapper.exists()).toBe(true)
  })

  describe('Countries info', () => {
    it('renders the countries if present', () => {
      report.fields.country = [
        {name: 'Spain'},
        {name: 'France'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      countryInfo = wrapper.find('ArticleInfo[heading="Country"]')
      expect(countryInfo.exists()).toBe(true)
      expect(countryInfo.prop('items')).toEqual(report.fields.country)
      expect(countryInfo.prop('type')).toEqual('country')
    })

    it('does not render the countries if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      countryInfo = wrapper.find('ArticleInfo[heading="Country"]')
      expect(countryInfo.exists()).toBe(false)
    })
  })

  describe('Disasters info', () => {
    it('renders the disasters if present', () => {
      report.fields.disaster = [
        {name: 'Earthquake'},
        {name: 'Trump'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      disastersInfo = wrapper.find('ArticleInfo[heading="Disaster"]')
      expect(disastersInfo.exists()).toBe(true)
      expect(disastersInfo.prop('items')).toEqual(report.fields.disaster)
      expect(disastersInfo.prop('type')).toEqual('disaster')
    })

    it('does not render the disasters if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      disastersInfo = wrapper.find('ArticleInfo[heading="Disaster"]')
      expect(disastersInfo.exists()).toBe(false)
    })
  })

  describe('Sources info', () => {
    it('renders the sources if present', () => {
      report.fields.source = [
        {name: 'MSF'},
        {name: 'UN'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      sourceInfo = wrapper.find('ArticleInfo[heading="Source"]')
      expect(sourceInfo.exists()).toBe(true)
      expect(sourceInfo.prop('items')).toEqual(report.fields.source)
      expect(sourceInfo.prop('type')).toEqual('source')
    })

    it('does not render the sources if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      sourceInfo = wrapper.find('ArticleInfo[heading="Source"]')
      expect(sourceInfo.exists()).toBe(false)
    })
  })

  describe('Themes info', () => {
    it('renders the themes if present', () => {
      report.fields.theme = [
        {name: 'Coordination'},
        {name: 'Wash'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      themeInfo = wrapper.find('ArticleInfo[heading="Theme"]')
      expect(themeInfo.exists()).toBe(true)
      expect(themeInfo.prop('items')).toEqual(report.fields.theme)
      expect(themeInfo.prop('type')).toEqual('theme')
    })

    it('does not render the themes if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      themeInfo = wrapper.find('ArticleInfo[heading="Theme"]')
      expect(themeInfo.exists()).toBe(false)
    })
  })

  describe('Disaster types info', () => {
    it('renders the disasters type if present', () => {
      report.fields.disaster_type = [
        {name: 'Drought'},
        {name: 'Other'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      disasterTypeInfo = wrapper.find('ArticleInfo[heading="Disaster type"]')
      expect(disasterTypeInfo.exists()).toBe(true)
      expect(disasterTypeInfo.prop('items')).toEqual(report.fields.disaster_type)
      expect(disasterTypeInfo.prop('type')).toEqual('disaster_type')
    })

    it('does not render the disasters type if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      disasterTypeInfo = wrapper.find('ArticleInfo[heading="Disaster type"]')
      expect(disasterTypeInfo.exists()).toBe(false)
    })
  })

  describe('Vulnerable groups info', () => {
    it('renders the vulnerable groups type if present', () => {
      report.fields.vulnerable_groups = [
        {name: 'Children'},
        {name: 'Women'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      vulnerableGroupInfo = wrapper.find('ArticleInfo[heading="Vulnerable group"]')
      expect(vulnerableGroupInfo.exists()).toBe(true)
      expect(vulnerableGroupInfo.prop('items')).toEqual(report.fields.vulnerable_groups)
      expect(vulnerableGroupInfo.prop('type')).toEqual('vulnerable_groups')
    })

    it('does not render the vulnerable groups type if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      vulnerableGroupInfo = wrapper.find('ArticleInfo[heading="Vulnerable group"]')
      expect(vulnerableGroupInfo.exists()).toBe(false)
    })
  })

  describe('Formats info', () => {
    it('renders the formats if present', () => {
      report.fields.format = [
        {name: 'Coordination'},
        {name: 'Wash'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      formatInfo = wrapper.find('ArticleInfo[heading="Format"]')
      expect(formatInfo.exists()).toBe(true)
      expect(formatInfo.prop('items')).toEqual(report.fields.format)
      expect(formatInfo.prop('type')).toEqual('format')
    })

    it('does not render the formats if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      formatInfo = wrapper.find('ArticleInfo[heading="Format"]')
      expect(formatInfo.exists()).toBe(false)
    })
  })

  describe('Languages info', () => {
    it('renders the languages if present', () => {
      report.fields.language = [
        {name: 'Coordination'},
        {name: 'Wash'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      languageInfo = wrapper.find('ArticleInfo[heading="Language"]')
      expect(languageInfo.exists()).toBe(true)
      expect(languageInfo.prop('items')).toEqual(report.fields.language)
      expect(languageInfo.prop('type')).toEqual('language')
    })

    it('does not render the languages if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      languageInfo = wrapper.find('ArticleInfo[heading="Language"]')
      expect(languageInfo.exists()).toBe(false)
    })
  })

  describe('Attachments', () => {
    it('renders the attachments if present', () => {
      report.fields.file = [
        {filename: 'a pdf'},
        {filename: 'another one'}
      ]
      wrapper = shallow(<ArticleSideBar report={report} />)
      attachmentInfo = wrapper.find('ArticleAttachments[heading="Attachment"]')
      expect(attachmentInfo.exists()).toBe(true)
      expect(attachmentInfo.prop('items')).toEqual(report.fields.file)
    })

    it('does not render the attachments if not present', () => {
      report.fields = {}
      wrapper = shallow(<ArticleSideBar report={report} />)
      attachmentInfo = wrapper.find('ArticleAttachments[heading="Attachment"]')
      expect(attachmentInfo.exists()).toBe(false)
    })
  })
})
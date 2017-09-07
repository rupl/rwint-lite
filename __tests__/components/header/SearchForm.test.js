/* eslint-env jest */
import { mount } from 'enzyme'
import React from 'react'
import SearchForm from '../../../components/header/SearchForm.js'
import Router from 'next/router'
Router['push'] = jest.fn(() => function () {})

describe('Search Form component', () => {
  let form, input, wrapper
  const fakeEvent = {
    preventDefault: function () {}
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Search form', function () {
    beforeAll(() => {
      wrapper = mount(<SearchForm />)
      form = wrapper.find('form')
      input = wrapper.find('input[type="search"]')
    })

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the search form', () => {
      expect(form.exists()).toBe(true)
      expect(input.exists()).toBe(true)
    })

    it('sets the input value on state', () => {
      input.simulate('change', { target: { value: 'Hello' } })
      expect(wrapper.state('value')).toBe('Hello')
    })
  })

  describe('Handling special characters in search input', function () {
    beforeAll(() => {
      Router.router = {
        route: '/updates'
      }
      wrapper = mount(<SearchForm />)
      form = wrapper.find('form')
      input = wrapper.find('input[type="search"]')
    })

    it('replaces special characters with spaces', () => {
      const inputString = 'Hello+Good-bye&&guten||tag!auf(weidersehn}{pet}[hola]bonjour^hallo"salut"~bored*now?nearly:at\\theend'
      const searchString = 'Hello Good bye guten tag auf weidersehn pet hola bonjour hallo salut bored now nearly at theend'
      input.simulate('change', { target: { value: inputString } })
      form.simulate('submit', fakeEvent)
      expect(Router.push).toHaveBeenCalledWith(`/updates?search=${searchString}`, `/report/listing?search=${searchString}`)
    })

    it('does not replace accented characters', () => {
      input.simulate('change', { target: { value: 'Curaçao' } })
      form.simulate('submit', fakeEvent)
      expect(Router.push).toHaveBeenCalledWith('/updates?search=Curaçao', '/report/listing?search=Curaçao')

      input.simulate('change', { target: { value: '1585 ressortissantes et ressortissants haïtiens rapatriés à Belladère au cours du mois d’août 2017 Spécial' } })
      form.simulate('submit', fakeEvent)
      expect(Router.push).toHaveBeenCalledWith('/updates?search=1585 ressortissantes et ressortissants haïtiens rapatriés à Belladère au cours du mois d’août 2017 Spécial', '/report/listing?search=1585 ressortissantes et ressortissants haïtiens rapatriés à Belladère au cours du mois d’août 2017 Spécial')
    })
  })

  describe('Searching for updates', function () {
    describe('From updates listing page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/updates'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('updates')
        expect(wrapper.state('placeholder')).toBe('Search for updates')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/updates?search=Yemen', '/report/listing?search=Yemen')
      })
    })
    describe('From home page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('updates')
        expect(wrapper.state('placeholder')).toBe('Search for updates')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/updates?search=Yemen', '/report/listing?search=Yemen')
      })
    })
  })

  describe('Searching for countries', function () {
    describe('From countries listing page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/countries'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('countries')
        expect(wrapper.state('placeholder')).toBe('Search for countries')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/countries?search=Yemen', '/country/listing?search=Yemen')
      })
    })
  })

  describe('Searching for disasters', () => {
    describe('From disasters listing page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/disasters'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('disasters')
        expect(wrapper.state('placeholder')).toBe('Search for disasters')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/disasters?search=Yemen', '/disaster/listing?search=Yemen')
      })
    })

    describe('From disasters article page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/disaster'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('disasters')
        expect(wrapper.state('placeholder')).toBe('Search for disasters')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/disasters?search=Yemen', '/disaster/listing?search=Yemen')
      })
    })
  })

  describe('Searching for jobs', () => {
    describe('From jobs listing page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/jobs'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('jobs')
        expect(wrapper.state('placeholder')).toBe('Search for jobs')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/jobs?search=Yemen', '/job/listing?search=Yemen')
      })
    })

    describe('From jobs article page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/job'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('jobs')
        expect(wrapper.state('placeholder')).toBe('Search for jobs')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/jobs?search=Yemen', '/job/listing?search=Yemen')
      })
    })
  })

  describe('Searching for training', () => {
    describe('From training listing page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/trainings'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('trainings')
        expect(wrapper.state('placeholder')).toBe('Search for training')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/trainings?search=Yemen', '/training/listing?search=Yemen')
      })
    })

    describe('From training article page', function () {
      beforeAll(() => {
        Router.router = {
          route: '/training'
        }
        wrapper = mount(<SearchForm />)
        form = wrapper.find('form')
        input = wrapper.find('input[type="search"]')
      })

      it('sets the search and placeholder values on state', () => {
        expect(wrapper.state('search')).toBe('trainings')
        expect(wrapper.state('placeholder')).toBe('Search for training')
      })

      it('sets the route with the input value on submit', () => {
        input.simulate('change', { target: { value: 'Yemen' } })
        form.simulate('submit', fakeEvent)
        expect(Router.push).toHaveBeenCalledWith('/trainings?search=Yemen', '/training/listing?search=Yemen')
      })
    })
  })
})

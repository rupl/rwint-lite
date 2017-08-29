/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import SearchForm from '../../../components/header/SearchForm.js'
import Router from 'next/router'
Router['push'] = jest.fn(() => function () {})

describe('Search Form component', () => {
  let form, input, wrapper
  const fakeEvent = {
    preventDefault: function () {}
  }

  beforeAll(() => {
    wrapper = shallow(<SearchForm />)
    form = wrapper.find('form')
    input = wrapper.find('input[type="search"]')
  })

  afterEach(() => {
    jest.resetAllMocks()
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

  it('sets the route with the input value on submit', () => {
    input.simulate('change', { target: { value: 'Yemen' } })
    form.simulate('submit', fakeEvent)
    expect(Router.push).toHaveBeenCalledWith('/updates?search=Yemen', '/report/listing/?search=Yemen')
  })
})

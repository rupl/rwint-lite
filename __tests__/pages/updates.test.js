/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import App from '../../pages/updates.js'

jest.mock('../../services/requests')

let component

describe('Updates page', () => {
  beforeAll(function () {
    component = shallow(<App />)
  })

  it('renders the page', () => {
    expect(component.exists()).toEqual(true)
  })

  it('calls getUpdates and return the updates from the request', () => {
    expect.assertions(1)
    return App.getInitialProps().then(data => expect(data.reports).toEqual([{id: 'updatesId'}]))
  })
})

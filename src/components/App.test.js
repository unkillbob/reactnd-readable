import React from 'react'
import { MemoryRouter } from 'react-router'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import App from './App'

it('renders without crashing', () => {
  const mockStore = configureStore()
  const store = mockStore({ categories: [] })
  shallow(
    <MemoryRouter><Provider store={store}><App /></Provider></MemoryRouter>
  )
})

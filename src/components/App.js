import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Default from './Default'

class App extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={Default} />
      </div>
    )
  }
}

export default App

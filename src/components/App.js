import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Default from './Default'
import { fetchCategories } from '../actions'

class App extends Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
    return (
      <div className='app'>
        <h1 className='header'>Readable</h1>
        <Route exact path='/' component={Default} />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(null, mapDispatchToProps)(App)

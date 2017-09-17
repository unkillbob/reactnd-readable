import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Default from './Default'
import Post from './Post'
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
        <Route path='/post/:id' component={Post} />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))

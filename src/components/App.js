import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import { fetchCategories } from '../actions'
import Default from './Default'
import PostEdit from './PostEdit'
import PostView from './PostView'

class App extends Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
    return (
      <div className='app'>
        <h1 className='header'>Readable</h1>
        <Route exact path='/' component={Default} />
        <Route exact path='/new' component={PostEdit} />
        <Route path='/post/:id' component={PostView} />
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

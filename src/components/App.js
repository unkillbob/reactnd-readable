import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch, withRouter } from 'react-router-dom'

import { fetchCategories } from '../actions'
import DefaultView from './DefaultView'
import PostEdit from './PostEdit'
import PostView from './PostView'

class App extends Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-inverse bg-primary'>
          <Link to='/' className='navbar-brand'>Readable</Link>
        </nav>
        <Switch>
          <Route exact path='/' component={DefaultView} />
          <Route exact path='/new' component={PostEdit} />
          <Route exact path='/:category' component={DefaultView} />
          <Route exact path='/:category/:id' component={PostView} />
          <Route exact path='/:category/:id/edit' component={PostEdit} />
        </Switch>
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

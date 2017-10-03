import { Component, default as React } from 'react'
import { connect } from 'react-redux'

import Categories from './Categories'
import PostList from './PostList'
import { updateCategory } from '../actions'

class DefaultView extends Component {
  componentDidMount () {
    this.updateCategory(this.props)
  }

  componentWillUpdate (nextProps) {
    this.updateCategory(nextProps)
  }

  updateCategory (props) {
    const category = props.match.params.category
    if (category !== props.category) {
      props.updateCategory(category)
    }
  }

  render () {
    return (
      <div className='container-fluid row no-gutters px-0'>
        <div className='col-2 py-3'>
          <Categories />
        </div>
        <div className='col-10'>
          <PostList />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ category }) {
  return {
    category: category.active
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: category => dispatch(updateCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)

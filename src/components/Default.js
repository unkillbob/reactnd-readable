import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PostList from './PostList'

class Default extends Component {
  render () {
    return (
      <div className='container-fluid row'>
        <div className='col-2 py-3'>
          <h5>Category</h5>
          <ul className='nav flex-column'>
            {this.props.categories.map(category => (
              <li className='nav-item' key={category.name}>
                <Link to={`/${category.path}`} className='nav-link pl-0'>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='col-10'>
          <PostList />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(Default)

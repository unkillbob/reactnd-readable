import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Categories extends Component {
  render () {
    return (
      <div>
        <h5 className='pl-3'>Categories</h5>
        <ul className='nav flex-column'>
          {this.props.categories.map(category => {
            return (
              <li className='nav-item' key={category.name}>
                <NavLink
                  to={`/${category.path}`}
                  activeClassName='bg-primary text-white'
                  className='nav-link category-item'
                >
                  {category.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ category }) {
  return {
    categories: category.list
  }
}

export default connect(mapStateToProps)(Categories)

import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Categories extends Component {
  render () {
    return (
      <div>
        <h5>Categories</h5>
        <ul className='nav flex-column'>
          {this.props.categories.map(category => {
            return (
              <li className='nav-item' key={category.name}>
                <NavLink
                  to={`/c/${category.path}`}
                  activeClassName='active'
                  className='nav-link pl-0'
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

function mapStateToProps ({ categories, category }) {
  return { categories, category }
}

export default connect(mapStateToProps)(Categories)

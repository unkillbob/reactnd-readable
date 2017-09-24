import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Categories extends Component {
  render () {
    return (
      <div>
        <h5>Categories</h5>
        <ul className='nav flex-column'>
          {this.props.categories.map(category => {
            const isActive = this.props.category === category.path
            return (
              <li className='nav-item' key={category.name}>
                <Link
                  to={`/${category.path}`}
                  className={`nav-link pl-0 ${isActive ? 'active' : ''}`}
                >
                  {category.name}
                </Link>
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

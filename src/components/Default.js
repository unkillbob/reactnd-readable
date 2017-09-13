import React, { Component } from 'react'
import { connect } from 'react-redux'

class Default extends Component {
  render () {
    return (
      <ul className='category-list'>
        {this.props.categories.map(category => (
          <li className='category' key={category.name}>{category.name}</li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(Default)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import './Default.css'

class Default extends Component {
  render () {
    return (
      <div className='default-view'>
        <ul className='category-list'>
          {this.props.categories.map(category => (
            <li className='category' key={category.name}>{category.name}</li>
          ))}
        </ul>
        <PostList />
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(Default)

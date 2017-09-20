import './PostEdit.css'

import serializeForm from 'form-serialize'
import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { createPost } from '../actions'

class PostEdit extends Component {
  handleSubmit = event => {
    event.preventDefault()

    const post = serializeForm(event.target, { hash: true })

    post.id = post.id || Math.random().toString(36).substr(-8)
    post.timestamp = post.timestamp || Date.now()

    this.props
      .createPost(post)
      .then(() => this.props.history.push(`/post/${post.id}`))
  }

  render () {
    return (
      <div>
        <Link to='/' className='close-edit-view'>Close</Link>
        <form onSubmit={this.handleSubmit}>
          <div className='create-post-details'>
            <label className='post-field'>
              Title:
              <input type='text' name='title' placeholder='Title' />
            </label>
            <label className='post-field'>
              Body:
              <textarea name='body' />
            </label>
            <label className='post-field'>
              Category:
              <select name='category'>
                {this.props.categories.map(category => (
                  <option key={category.path} value={category.path}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className='post-field'>
              Author:
              <input type='text' name='author' placeholder='Author' />
            </label>
          </div>
          <button type='submit'>Post</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: post => dispatch(createPost(post))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostEdit)
)

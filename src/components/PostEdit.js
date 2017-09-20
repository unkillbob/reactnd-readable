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
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label' htmlFor='post-author'>
              Name
            </label>
            <div className='col-sm-10'>
              <input
                id='post-author'
                name='author'
                type='text'
                className='form-control'
                placeholder='Name'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label' htmlFor='post-title'>
              Title
            </label>
            <div className='col-sm-10'>
              <input
                id='post-title'
                name='title'
                type='text'
                className='form-control'
                placeholder='Title'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label' htmlFor='post-body'>
              Content
            </label>
            <div className='col-sm-10'>
              <textarea
                id='post-body'
                name='body'
                rows='3'
                className='form-control'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label' htmlFor='post-category'>
              Category
            </label>
            <div className='col-sm-10'>
              <select
                id='post-category'
                name='category'
                className='form-control'
              >
                {this.props.categories.map(category => (
                  <option key={category.path} value={category.path}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className='btn btn-primary' type='submit'>Post</button>
          <Link to='/' className='btn btn-link'>Cancel</Link>
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

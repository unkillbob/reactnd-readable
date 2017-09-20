import './PostView.css'

import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost } from '../actions'
import PostSummary from './PostSummary'

class PostView extends Component {
  componentDidMount () {
    const id = this.props.match.params.id
    const post = this.props.post

    if (!post || post.id !== id) {
      this.props.fetchPost(id)
    }
  }

  render () {
    const { post } = this.props
    return (
      <div className='container py-3'>
        {post &&
          <div className='card'>
            <h4 className='card-header'>
              <span className='badge badge-primary'>{post.category}</span>
              {' '}
              <span className='align-bottom'>{post.title}</span>
              <Link to='/' className='close'>×</Link>
            </h4>
            <div className='card-block'>
              <p className='card-text'>{post.body}</p>
            </div>
            <div className='card-footer text-muted'>
              <PostSummary post={post} />
            </div>
          </div>}
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return { post }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: id => dispatch(fetchPost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

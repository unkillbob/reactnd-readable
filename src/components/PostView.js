import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost, fetchComments } from '../actions'
import PostSummary from './PostSummary'

class PostView extends Component {
  componentDidMount () {
    const id = this.props.match.params.id
    const post = this.props.post

    if (!post || post.id !== id) {
      this.props.fetchPost(id)
      this.props.fetchComments(id)
    }
  }

  render () {
    const { post } = this.props
    const comments =
      this.props.comments &&
      this.props.comments.filter(comment => {
        return post && comment.parentId === post.id
      })

    return (
      <div className='container py-3'>
        {post &&
          <div>
            <div className='card mb-3'>
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
            </div>
            <div>
              {comments &&
                comments.map(comment => (
                  <div key={comment.id} className='card mb-3'>
                    <div className='card-block'>
                      <p className='card-text'>{comment.body}</p>
                    </div>
                    <div className='card-footer text-muted'>
                      <PostSummary post={comment} />
                    </div>
                  </div>
                ))}
            </div>
          </div>}
      </div>
    )
  }
}

function mapStateToProps ({ post, comments }) {
  return { post, comments }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    fetchComments: postId => dispatch(fetchComments(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

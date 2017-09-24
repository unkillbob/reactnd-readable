import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost, fetchComments, updateSortCommentsBy } from '../actions'
import PostSummary from './PostSummary'
import SortBy from './SortBy'

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
            </div>
            <div>
              <nav className='navbar navbar-light bg-faded mt-3'>
                <form className='form-inline my-2 my-lg-0'>
                  <h4 className='mr-3'>Comments</h4>
                  <SortBy
                    sortBy={this.props.sortCommentsBy}
                    onSortByChange={sortBy =>
                      this.props.updateSortCommentsBy(sortBy)}
                  />
                </form>
              </nav>
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

function mapStateToProps ({ post, comments, sortCommentsBy }) {
  return { post, comments, sortCommentsBy }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    updateSortCommentsBy: sortBy => dispatch(updateSortCommentsBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

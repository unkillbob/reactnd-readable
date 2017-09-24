import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost, fetchComments, updateSortCommentsBy } from '../actions'
import ItemSummary from './ItemSummary'
import SortBy from './SortBy'
import VoteScore from './VoteScore'

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
          <div className='media'>
            <VoteScore voteScore={post.voteScore} />
            <div className='media-body'>
              <div className='mb-3'>
                <h4 className='mb-0'>
                  {post.title}
                  <Link to='/' className='close'>×</Link>
                </h4>
                <small className='text-muted'>
                  <span className='badge badge-primary align-middle mr-2'>
                    {post.category}
                  </span>
                  <ItemSummary item={post} />
                </small>
              </div>
              <p className='lead'>{post.body}</p>
              <nav className='navbar navbar-light bg-faded mt-5'>
                <form className='form-inline my-2 my-lg-0'>
                  <SortBy
                    sortBy={this.props.sortCommentsBy}
                    onSortByChange={sortBy =>
                      this.props.updateSortCommentsBy(sortBy)}
                  />
                </form>
              </nav>
              {comments &&
                comments.map(comment => (
                  <div key={comment.id} className='media mt-3'>
                    <VoteScore voteScore={comment.voteScore} />
                    <div className='media-body'>
                      <small className='text-muted'>
                        <ItemSummary item={comment} />
                      </small>
                      <p>{comment.body}</p>
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

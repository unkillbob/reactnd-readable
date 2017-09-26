import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import * as sortBy from 'lodash/sortBy'

import {
  fetchPost,
  voteForPost,
  fetchComments,
  createComment,
  voteForComment,
  updateSortCommentsBy
} from '../actions'
import ItemSummary from './ItemSummary'
import SortBy from './SortBy'
import VoteScore from './VoteScore'

class PostView extends Component {
  state = {
    commentModalOpen: false
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const post = this.props.post

    if (!post || post.id !== id) {
      this.props.fetchPost(id)
      this.props.fetchComments(id)
    }
  }

  showCommentModal = () => {
    this.setState(() => ({ commentModalOpen: true }))
  }

  closeCommentModal = () => {
    this.setState(() => ({ commentModalOpen: false }))
  }

  handleSaveComment = event => {
    event.preventDefault()

    const comment = serializeForm(event.target, { hash: true })

    comment.id = comment.id || Math.random().toString(36).substr(-8)
    comment.timestamp = comment.timestamp || Date.now()

    comment.parentId = this.props.post.id

    this.props.createComment(comment)
    this.closeCommentModal()
  }

  render () {
    const { post } = this.props
    const comments = sortBy(
      (this.props.comments || []).filter(comment => {
        return post && comment.parentId === post.id
      }),
      comment => -comment[this.props.sortCommentsBy]
    )

    return (
      <div className='container py-3'>
        {post &&
          <div className='media'>
            <VoteScore
              voteScore={post.voteScore}
              onVoteChange={option => this.props.voteForPost(post, option)}
            />
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
                <div className='form-inline my-2 my-lg-0'>
                  <button
                    className='btn btn-primary mr-3'
                    onClick={event => this.showCommentModal()}
                  >
                    Add Comment
                  </button>
                  <SortBy
                    sortBy={this.props.sortCommentsBy}
                    onSortByChange={sortBy =>
                      this.props.updateSortCommentsBy(sortBy)}
                  />
                </div>
              </nav>
              {comments.map(comment => (
                <div key={comment.id} className='media mt-3'>
                  <VoteScore
                    voteScore={comment.voteScore}
                    onVoteChange={option =>
                      this.props.voteForComment(comment, option)}
                  />
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

        <Modal
          className='modal fade show'
          overlayClassName='modal-backdrop fade show'
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
          <div className='modal-dialog'>
            <form className='modal-content' onSubmit={this.handleSaveComment}>
              <div className='modal-header'>
                Comment
                <button
                  className='close'
                  onClick={event => {
                    event.preventDefault()
                    this.closeCommentModal()
                  }}
                >
                  ×
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <input
                    id='comment-author'
                    name='author'
                    type='text'
                    className='form-control'
                    placeholder='Name'
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    id='comment-body'
                    name='body'
                    rows='3'
                    className='form-control'
                    placeholder='Comment'
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='btn btn-primary'>Save</button>
              </div>
            </form>
          </div>
        </Modal>
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
    voteForPost: (post, option) => dispatch(voteForPost(post, option)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    createComment: comment => dispatch(createComment(comment)),
    voteForComment: (comment, option) =>
      dispatch(voteForComment(comment, option)),
    updateSortCommentsBy: sortBy => dispatch(updateSortCommentsBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

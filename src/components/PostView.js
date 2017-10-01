import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import * as sortBy from 'lodash/sortBy'
import PencilIcon from 'react-icons/lib/fa/pencil'
import CommentIcon from 'react-icons/lib/fa/comment-o'
import TrashIcon from 'react-icons/lib/fa/trash'

import {
  fetchPost,
  voteForPost,
  deletePost,
  fetchComments,
  createComment,
  updateComment,
  voteForComment,
  deleteComment,
  updateSortCommentsBy
} from '../actions'
import ItemSummary from './ItemSummary'
import SortBy from './SortBy'
import VoteScore from './VoteScore'

class PostView extends Component {
  state = {
    commentModalOpen: false,
    id: null,
    author: '',
    body: ''
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const post = this.props.post

    if (!post || post.id !== id) {
      this.props.fetchPost(id)
    }
    this.props.fetchComments(id)
  }

  deletePost = () => {
    this.props
      .deletePost(this.props.post)
      .then(() => this.props.history.replace('/'))
  }

  editComment = comment => {
    const { author, body, id } = comment
    this.setState({
      commentModalOpen: true,
      id,
      author,
      body
    })
    this.showCommentModal()
  }

  showCommentModal = () => {
    this.setState({ commentModalOpen: true })
  }

  closeCommentModal = () => {
    this.setState({
      commentModalOpen: false,
      id: null,
      author: '',
      body: ''
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSaveComment = event => {
    event.preventDefault()

    const { author, body, id } = this.state
    const timestamp = Date.now()

    if (id) {
      this.props.updateComment(id, { body, timestamp })
    } else {
      const comment = {
        author,
        body,
        timestamp,
        id: Math.random().toString(36).substr(-8),
        parentId: this.props.post.id
      }

      this.props.createComment(comment)
    }

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
                  <span className='mr-3'>{comments.length} comments</span>
                  <div className='btn-group mr-3'>
                    <button
                      className='btn btn-secondary'
                      onClick={() => this.showCommentModal()}
                    >
                      <CommentIcon className='align-text-top mr-2' />
                      Add Comment
                    </button>
                    <Link to={`${post.id}/edit`} className='btn btn-secondary'>
                      <PencilIcon className='align-text-top mr-2' />
                      Edit Post
                    </Link>
                  </div>
                  <SortBy
                    sortBy={this.props.sortCommentsBy}
                    onSortByChange={sortBy =>
                      this.props.updateSortCommentsBy(sortBy)}
                  />
                  <button
                    className='btn btn-danger ml-auto'
                    onClick={this.deletePost}
                  >
                    <TrashIcon className='align-text-top mr-2' />
                    Delete Post
                  </button>
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
                      <button
                        className='btn btn-link btn-sm ml-2'
                        onClick={() => this.editComment(comment)}
                      >
                        <PencilIcon className='align-text-top mr-1' />
                        Edit
                      </button>
                      <button
                        className='btn btn-link btn-sm text-danger'
                        onClick={() => this.props.deleteComment(comment)}
                      >
                        <TrashIcon className='align-text-top mr-1' />
                        Delete
                      </button>
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
                {this.state.id ? 'Edit' : 'Add'} Comment
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
                {!this.state.id &&
                  <div className='form-group'>
                    <input
                      id='comment-author'
                      name='author'
                      value={this.state.author}
                      onChange={this.handleChange}
                      type='text'
                      className='form-control'
                      placeholder='Name'
                    />
                  </div>}
                <div className='form-group'>
                  <textarea
                    id='comment-body'
                    name='body'
                    value={this.state.body}
                    onChange={this.handleChange}
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
    deletePost: post => dispatch(deletePost(post)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    createComment: comment => dispatch(createComment(comment)),
    updateComment: (id, details) => dispatch(updateComment(id, details)),
    voteForComment: (comment, option) =>
      dispatch(voteForComment(comment, option)),
    deleteComment: comment => dispatch(deleteComment(comment)),
    updateSortCommentsBy: sortBy => dispatch(updateSortCommentsBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

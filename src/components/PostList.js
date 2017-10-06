import './PostList.css'

import countBy from 'lodash/countBy'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PencilIcon from 'react-icons/lib/fa/pencil'
import TrashIcon from 'react-icons/lib/fa/trash'

import { fetchPosts, deletePost, updateSortBy, voteForPost } from '../actions'
import CommentCount from './CommentCount'
import ItemSummary from './ItemSummary'
import SortBy from './SortBy'
import VoteScore from './VoteScore'

class PostList extends Component {
  componentDidMount () {
    this.props.fetchPosts(this.props.category)
  }

  componentWillUpdate ({ category }) {
    if (category !== this.props.category) {
      this.props.fetchPosts(category)
    }
  }

  render () {
    return (
      <div className='post-list'>
        <nav className='navbar navbar-light bg-faded'>
          <form className='form-inline my-2 my-lg-0'>
            <Link to='/new' className='btn btn-primary mr-3'>New Post</Link>
            <SortBy
              sortBy={this.props.sortBy}
              onSortByChange={sortBy => this.props.updateSortBy(sortBy)}
            />
          </form>
        </nav>
        {this.props.posts.map(post => (
          <div className='post-item media my-2' key={post.id}>
            <VoteScore
              voteScore={post.voteScore}
              onVoteChange={option => this.props.voteForPost(post, option)}
            />
            <div className='media-body' key={post.id}>
              <h5 className='mt-0'>
                <Link
                  className='badge badge-primary mr-3'
                  to={`/${post.category}`}
                >
                  {post.category}
                </Link>
                <Link
                  className='post-title align-bottom'
                  to={`/${post.category}/${post.id}`}
                >
                  {post.title}
                </Link>
              </h5>
              <small className='text-muted'>
                <Link
                  className='post-summary'
                  to={`/${post.category}/${post.id}`}
                >
                  <CommentCount
                    className='mr-3'
                    count={this.props.commentCount[post.id]}
                  />
                  <ItemSummary item={post} />
                </Link>
                <Link
                  className='btn btn-link btn-sm ml-2'
                  to={`/${post.category}/${post.id}/edit`}
                >
                  <PencilIcon className='align-text-top mr-1' />
                  Edit
                </Link>
                <button
                  className='btn btn-link btn-sm text-danger'
                  onClick={() => this.props.deletePost(post)}
                >
                  <TrashIcon className='align-text-top mr-1' />
                  Delete
                </button>
              </small>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ category, posts, comments }) {
  const filteredPosts = category.active
    ? filter(posts.byId, { category: category.active })
    : values(posts.byId)

  return {
    category: category.active,
    posts: sortBy(filteredPosts, post => -post[posts.sortBy]),
    commentCount: countBy(comments.byId, 'parentId'),
    sortBy: posts.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: category => dispatch(fetchPosts(category)),
    deletePost: post => dispatch(deletePost(post)),
    updateSortBy: sortBy => dispatch(updateSortBy(sortBy)),
    voteForPost: (post, option) => dispatch(voteForPost(post, option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

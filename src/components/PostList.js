import './PostList.css'

import * as sortBy from 'lodash/sortBy'
import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPosts, updateSortBy } from '../actions'
import PostSummary from './PostSummary'

class PostList extends Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    const posts = sortBy(this.props.posts, post => -post[this.props.sortBy])

    return (
      <div className='post-list'>
        <nav className='navbar navbar-light bg-faded'>
          <form className='form-inline my-2 my-lg-0'>
            <Link to='/new' className='btn btn-primary mr-3'>New Post</Link>
            <label htmlFor='posts-sort-by' className='mr-2'>Sort by</label>
            <select
              id='posts-sort-by'
              className='form-control'
              value={this.props.sortBy}
              onChange={event => this.props.updateSortBy(event.target.value)}
            >
              <option value='voteScore'>Vote Score</option>
              <option value='timestamp'>Time</option>
            </select>
          </form>
        </nav>
        {posts.map(post => (
          <div className='post-item media' key={post.id}>
            <h4 className='post-vote-score mr-3'>
              <span className='badge badge-default'>{post.voteScore}</span>
            </h4>
            <Link
              className='post-item-details media-body my-2'
              key={post.id}
              to={`/post/${post.id}`}
            >
              <h5 className='mt-0'>
                <span className='badge badge-primary mr-3'>
                  {post.category}
                </span>
                <span className='align-bottom'>{post.title}</span>
              </h5>
              <span className='text-muted'><PostSummary post={post} /></span>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ posts, sortBy }) {
  return { posts, sortBy }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    updateSortBy: sortBy => dispatch(updateSortBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

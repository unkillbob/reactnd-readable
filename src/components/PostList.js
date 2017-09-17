import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as sortBy from 'lodash/sortBy'
import { fetchPosts, updateSortBy } from '../actions'
import PostSummary from './PostSummary'
import './PostList.css'

class PostList extends Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    const posts = sortBy(this.props.posts, post => -post[this.props.sortBy])

    return (
      <div className='post-list'>
        <div className='post-list-actions'>
          <button
            className='post-create'
            onClick={() => alert('TODO: create posts')}
          >
            New Post
          </button>
          Sort by:
          <select
            className='post-select-sort'
            value={this.props.sortBy}
            onChange={event => this.props.updateSortBy(event.target.value)}
          >
            <option value='voteScore'>Vote Score</option>
            <option value='timestamp'>Time</option>
          </select>
        </div>
        {posts.map(post => (
          <Link className='post' key={post.id} to={`/post/${post.id}`}>
            <div className='post-vote-score'>{post.voteScore}</div>
            <div className='post-details'>
              <div className='post-title'>
                {post.title}
                <span className='post-category'>{post.category}</span>
              </div>
              <PostSummary post={post} />
            </div>
          </Link>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as sortBy from 'lodash/sortBy'
import moment from 'moment'
import { fetchPosts, updateSortBy } from '../actions'
import './PostList.css'

const DATE_FORMAT = 'D MMM YY HH:mm'

function formatTime (timestamp) {
  return moment(timestamp).format(DATE_FORMAT)
}

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
          <div className='post' key={post.id}>
            <div className='post-vote-score'>{post.voteScore}</div>
            <div className='post-details'>
              <div className='post-title'>
                {post.title}
                <span className='post-category'>{post.category}</span>
              </div>
              <div className='post-summary'>
                Submitted by
                <span className='post-author'> {post.author} </span>
                at
                <span className='post-timestamp'>
                  {' '}{formatTime(post.timestamp)}{' '}
                </span>
              </div>
            </div>
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

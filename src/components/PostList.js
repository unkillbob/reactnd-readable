import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as sortBy from 'lodash/sortBy'
import moment from 'moment'
import { fetchPosts } from '../actions'
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
    const posts = sortBy(this.props.posts, post => -post.voteScore)
    return (
      <div className='post-list'>
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

function mapStateToProps ({ posts }) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostSummary from './PostSummary'
import { fetchPost } from '../actions'
import './PostView.css'

class PostView extends Component {
  componentDidMount () {
    this.props.fetchPost(this.props.match.params.id)
  }

  render () {
    const { post } = this.props
    return (
      <div>
        <Link to='/'>Back</Link>
        {post &&
          <div className='post-view'>
            <div className='post-header'>
              <div className='post-vote-score'>{post.voteScore}</div>
              <div className='post-details'>
                <div className='post-title'>
                  {post.title}
                  <span className='post-category'>{post.category}</span>
                </div>
                <PostSummary post={post} />
              </div>
            </div>
            <div className='post-content'>{post.body}</div>
          </div>}
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return { post }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: id => dispatch(fetchPost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

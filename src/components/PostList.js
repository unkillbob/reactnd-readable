import './PostList.css'

import * as sortBy from 'lodash/sortBy'
import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPosts, updateSortBy, voteForPost } from '../actions'
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
    const posts = sortBy(this.props.posts, post => -post[this.props.sortBy])

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
        {posts.map(post => (
          <div className='post-item media my-2' key={post.id}>
            <VoteScore
              voteScore={post.voteScore}
              onVoteChange={option => this.props.voteForPost(post, option)}
            />
            <Link
              className='post-item-details media-body'
              key={post.id}
              to={`/${post.category}/${post.id}`}
            >
              <h5 className='mt-0'>
                <span className='badge badge-primary mr-3'>
                  {post.category}
                </span>
                <span className='align-bottom'>{post.title}</span>
              </h5>
              <small className='text-muted'><ItemSummary item={post} /></small>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ category, posts, sortBy }) {
  return { category, posts, sortBy }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: category => dispatch(fetchPosts(category)),
    updateSortBy: sortBy => dispatch(updateSortBy(sortBy)),
    voteForPost: (post, option) => dispatch(voteForPost(post, option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)

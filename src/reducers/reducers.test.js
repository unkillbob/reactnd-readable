import {
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
  UPDATE_CATEGORY,
  UPDATE_SORT_BY,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'
import reducer from './'

describe('default state', () => {
  it('should default categories, posts and comments to empty arrays', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('categories', [])
    expect(state).toHaveProperty('posts', [])
    expect(state).toHaveProperty('comments', [])
  })

  it('should default sortBy and sortCommentsBy to "voteScore"', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('sortBy', 'voteScore')
    expect(state).toHaveProperty('sortCommentsBy', 'voteScore')
  })
})

const categories = [{ name: 'foo', path: 'foo' }, { name: 'bar', path: 'bar' }]
const category = 'foo'
const posts = [{ id: 1 }, { id: 2 }, { id: 4 }]
const post = { id: 2 }
const comments = [{ id: 10 }, { id: 12 }, { id: 13 }]
const sortBy = 'voteScore'
const sortCommentsBy = 'voteScore'

const state = {
  categories,
  category,
  posts,
  post,
  comments,
  sortBy,
  sortCommentsBy
}

describe('RECEIVE_CATEGORIES', () => {
  it('should update the list of categories', () => {
    const receivedCategories = [
      { name: 'bar', path: 'bar' },
      { name: 'baz', path: 'baz' }
    ]
    const updatedState = reducer(state, {
      type: RECEIVE_CATEGORIES,
      categories: receivedCategories
    })
    expect(updatedState).toEqual({
      categories: receivedCategories,
      category,
      posts,
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })
})

describe('RECEIVE_POSTS', () => {
  it('should update the list of posts', () => {
    const receivedPosts = [{ id: 3 }, { id: 5 }, { id: 7 }]
    const updatedState = reducer(state, {
      type: RECEIVE_POSTS,
      posts: receivedPosts
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts: receivedPosts,
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })

  it('should filter out deleted posts', () => {
    const receivedPosts = [
      { id: 3, deleted: true },
      { id: 4 },
      { id: 5 },
      { id: 7, deleted: true }
    ]
    const updatedState = reducer(state, {
      type: RECEIVE_POSTS,
      posts: receivedPosts
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts: [{ id: 4 }, { id: 5 }],
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })
})

describe('RECEIVE_POST', () => {
  it('should update the active post', () => {
    const receivedPost = { id: 5 }
    const updatedState = reducer(state, {
      type: RECEIVE_POST,
      post: receivedPost
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts,
      post: receivedPost,
      comments,
      sortBy,
      sortCommentsBy
    })
  })
})

describe('RECEIVE_UPDATED_POST', () => {
  it('should update the active post and posts collection if it matches by ID', () => {
    const updatedPost = {
      id: post.id,
      title: 'Such updated',
      body: 'Many updates. Wow.'
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_POST,
      post: updatedPost
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts: [posts[0], updatedPost, posts[2]],
      post: updatedPost,
      comments,
      sortBy,
      sortCommentsBy
    })
  })

  it('should not update the active post or posts collection if it does not match by ID', () => {
    const updatedPost = {
      id: 7,
      title: 'Such updated',
      body: 'Many updates. Wow.'
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_POST,
      post: updatedPost
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts,
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })
})

describe('POST_DELETED', () => {
  it('should set the active post to null and remove the post from the posts collection if it matches by ID', () => {
    const deletedPost = { id: post.id }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts: [posts[0], posts[2]],
      post: null,
      comments,
      sortBy,
      sortCommentsBy
    })
  })

  it('should not update the active post if it does not match by ID', () => {
    const deletedPost = { id: posts[2].id }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts: [posts[0], posts[1]],
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })

  it('should not change the posts collection if it is not present in the collection', () => {
    const deletedPost = { id: 9 }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts,
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })
})

describe('RECEIVE_COMMENTS', () => {
  it('should update the list of comments')
})

describe('RECEIVE_UPDATED_COMMENT', () => {
  it(
    'should update the comment in the comments collection if it is present in the collection'
  )

  it(
    'should add the comment to the comments collection if it is not present in the collection'
  )
})

describe('COMMENT_DELETED', () => {
  it(
    'should remove the comment from the comments collection if it is present in the collection'
  )

  it(
    'should not change the comments collection if it is not present in the collection'
  )
})

describe('UPDATE_CATEGORY', () => {
  it('should update the active category', () => {
    const updatedCategory = 'bar'
    const updatedState = reducer(state, {
      type: UPDATE_CATEGORY,
      category: updatedCategory
    })
    expect(updatedState).toEqual({
      categories,
      category: updatedCategory,
      posts,
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })

  it('should allow updating the active category to null', () => {
    const updatedState = reducer(state, {
      type: UPDATE_CATEGORY,
      category: null
    })
    expect(updatedState).toEqual({
      categories,
      category: null,
      posts,
      post,
      comments,
      sortBy,
      sortCommentsBy
    })
  })
})

describe('UPDATE_SORT_BY', () => {
  it('should update the sortBy', () => {
    const updatedSortBy = 'timestamp'
    const updatedState = reducer(state, {
      type: UPDATE_SORT_BY,
      sortBy: updatedSortBy
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts,
      post,
      comments,
      sortBy: updatedSortBy,
      sortCommentsBy
    })
  })
})

describe('UPDATE_SORT_COMMENTS_BY', () => {
  it('should update the sortCommentsBy', () => {
    const updatedSortCommentsBy = 'timestamp'
    const updatedState = reducer(state, {
      type: UPDATE_SORT_COMMENTS_BY,
      sortCommentsBy: updatedSortCommentsBy
    })
    expect(updatedState).toEqual({
      categories,
      category,
      posts,
      post,
      comments,
      sortBy,
      sortCommentsBy: updatedSortCommentsBy
    })
  })
})

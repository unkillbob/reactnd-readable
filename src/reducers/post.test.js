import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
  UPDATE_SORT_BY
} from '../actions'
import reducer from './post'

describe('default state', () => {
  it('should default the collection of posts to an empty object', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('byId', {})
  })

  it('should default sortBy to "voteScore"', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('sortBy', 'voteScore')
  })
})

const list = [{ id: 1 }, { id: 2 }, { id: 4 }]
const active = { id: 2 }
const sortBy = 'voteScore'

const state = {
  list,
  active,
  sortBy
}

describe('RECEIVE_POSTS', () => {
  it('should update the list of posts', () => {
    const receivedPosts = [{ id: 3 }, { id: 5 }, { id: 7 }]
    const updatedState = reducer(state, {
      type: RECEIVE_POSTS,
      posts: receivedPosts
    })
    expect(updatedState).toEqual({
      list: receivedPosts,
      active,
      sortBy
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
      list: [{ id: 4 }, { id: 5 }],
      active,
      sortBy
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
      list,
      active: receivedPost,
      sortBy
    })
  })
})

describe('RECEIVE_UPDATED_POST', () => {
  it('should update the active post and posts collection if it matches by ID', () => {
    const updatedPost = {
      id: active.id,
      title: 'Such updated',
      body: 'Many updates. Wow.'
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_POST,
      post: updatedPost
    })
    expect(updatedState).toEqual({
      list: [list[0], updatedPost, list[2]],
      active: updatedPost,
      sortBy
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
      list,
      active,
      sortBy
    })
  })
})

describe('POST_DELETED', () => {
  it('should set the active post to null and remove the post from the posts collection if it matches by ID', () => {
    const deletedPost = { id: active.id }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    expect(updatedState).toEqual({
      list: [list[0], list[2]],
      active: null,
      sortBy
    })
  })

  it('should not update the active post if it does not match by ID', () => {
    const deletedPost = { id: list[2].id }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    expect(updatedState).toEqual({
      list: [list[0], list[1]],
      active,
      sortBy
    })
  })

  it('should not change the posts collection if it is not present in the collection', () => {
    const deletedPost = { id: 9 }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    expect(updatedState).toEqual({
      list,
      active,
      sortBy
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
      list,
      active,
      sortBy: updatedSortBy
    })
  })
})

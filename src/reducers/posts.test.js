import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
  UPDATE_SORT_BY
} from '../actions'
import reducer from './posts'

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
const byId = {
  1: list[0],
  2: list[1],
  4: list[2]
}
const sortBy = 'voteScore'

const state = {
  byId,
  sortBy
}

describe('RECEIVE_POSTS', () => {
  it('should update the collection of posts with the received posts', () => {
    const receivedPosts = [{ id: 3 }, { id: 5 }, { id: 7 }]
    const updatedState = reducer(state, {
      type: RECEIVE_POSTS,
      posts: receivedPosts
    })
    expect(updatedState).toEqual({
      byId: {
        ...byId,
        3: receivedPosts[0],
        5: receivedPosts[1],
        7: receivedPosts[2]
      },
      sortBy
    })
  })

  it('should filter out deleted posts from the received posts', () => {
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
      byId: {
        ...byId,
        4: receivedPosts[1],
        5: receivedPosts[2]
      },
      sortBy
    })
  })
})

describe('RECEIVE_POST', () => {
  it('should add the received post to the collection of posts', () => {
    const receivedPost = { id: 5 }
    const updatedState = reducer(state, {
      type: RECEIVE_POST,
      post: receivedPost
    })
    expect(updatedState).toEqual({
      byId: {
        ...byId,
        5: receivedPost
      },
      sortBy
    })
  })
})

describe('RECEIVE_UPDATED_POST', () => {
  it('should update the received post in the collection of posts', () => {
    const updatedPost = {
      id: 2,
      title: 'Such updated',
      body: 'Many updates. Wow.'
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_POST,
      post: updatedPost
    })
    expect(updatedState).toEqual({
      byId: {
        ...byId,
        2: updatedPost
      },
      sortBy
    })
  })
})

describe('POST_DELETED', () => {
  it('should remove the post from the posts collection', () => {
    const deletedPost = { id: 2 }
    const updatedState = reducer(state, {
      type: POST_DELETED,
      post: deletedPost
    })
    const expectedById = { ...byId }
    delete expectedById[deletedPost.id]

    expect(updatedState).toEqual({
      byId: expectedById,
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
      byId,
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
      byId,
      sortBy: updatedSortBy
    })
  })
})

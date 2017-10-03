import {
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'
import reducer from './comment'

describe('default state', () => {
  it('should default the list of comments to an empty array', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('list', [])
  })

  it('should default sortBy to "voteScore"', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('sortBy', 'voteScore')
  })
})

const list = [{ id: 10 }, { id: 12 }, { id: 13 }]
const sortBy = 'voteScore'

const state = {
  list,
  sortBy
}

describe('RECEIVE_COMMENTS', () => {
  it('should update the list of comments', () => {
    const receivedComments = [{ id: 11 }, { id: 13 }, { id: 14 }]
    const updatedState = reducer(state, {
      type: RECEIVE_COMMENTS,
      comments: receivedComments
    })
    expect(updatedState).toEqual({
      list: receivedComments,
      sortBy
    })
  })
})

describe('RECEIVE_UPDATED_COMMENT', () => {
  it('should update the comment in the list of comments if it is present in the list', () => {
    const updatedComment = {
      id: list[1].id,
      body: 'Many updates. Wow.'
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_COMMENT,
      comment: updatedComment
    })
    expect(updatedState).toEqual({
      list: [list[0], list[2], updatedComment],
      sortBy
    })
  })

  it('should add the comment to the list of comments if it is not present in the list', () => {
    const updatedComment = {
      id: 17,
      body: 'Totally new comment.'
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_COMMENT,
      comment: updatedComment
    })
    expect(updatedState).toEqual({
      list: list.concat(updatedComment),
      sortBy
    })
  })
})

describe('COMMENT_DELETED', () => {
  it('should remove the comment from the list of comments if it is present in the list', () => {
    const deletedComment = {
      id: list[1].id
    }
    const updatedState = reducer(state, {
      type: COMMENT_DELETED,
      comment: deletedComment
    })
    expect(updatedState).toEqual({
      list: [list[0], list[2]],
      sortBy
    })
  })

  it('should not change the list of comments if it is not present in the list', () => {
    const deletedComment = {
      id: 17
    }
    const updatedState = reducer(state, {
      type: COMMENT_DELETED,
      comment: deletedComment
    })
    expect(updatedState).toEqual({
      list,
      sortBy
    })
  })
})

describe('UPDATE_SORT_COMMENTS_BY', () => {
  it('should update sortBy', () => {
    const updatedSortCommentsBy = 'timestamp'
    const updatedState = reducer(state, {
      type: UPDATE_SORT_COMMENTS_BY,
      sortBy: updatedSortCommentsBy
    })
    expect(updatedState).toEqual({
      list,
      sortBy: updatedSortCommentsBy
    })
  })
})

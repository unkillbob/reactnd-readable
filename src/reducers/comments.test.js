import {
  RECEIVE_COMMENTS,
  COMMENT_CREATED,
  COMMENT_UPDATED,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'
import reducer from './comments'

describe('default state', () => {
  it('should default the collection of comments to an empty object', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('byId', {})
  })

  it('should default sortBy to "voteScore"', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('sortBy', 'voteScore')
  })
})

const comments = [{ id: 10 }, { id: 12 }, { id: 13 }]
const byId = {
  10: comments[0],
  12: comments[1],
  13: comments[2]
}
const sortBy = 'voteScore'

const state = {
  byId,
  sortBy
}

describe('RECEIVE_COMMENTS', () => {
  it('should update the collection of comments with the received comments', () => {
    const receivedComments = [{ id: 11 }, { id: 13 }, { id: 14 }]
    const updatedState = reducer(state, {
      type: RECEIVE_COMMENTS,
      comments: receivedComments
    })
    expect(updatedState).toEqual({
      byId: {
        ...byId,
        11: receivedComments[0],
        13: receivedComments[1],
        14: receivedComments[2]
      },
      sortBy
    })
  })
})

describe('COMMENT_CREATED', () => {
  it('should add the comment to the collections of comments', () => {
    const createdComment = {
      id: 17,
      body: 'Totally new comment.'
    }
    const updatedState = reducer(state, {
      type: COMMENT_CREATED,
      comment: createdComment
    })
    expect(updatedState).toEqual({
      byId: {
        ...byId,
        [createdComment.id]: createdComment
      },
      sortBy
    })
  })
})

describe('COMMENT_UPDATED', () => {
  it('should update the comment in the collection of comments', () => {
    const updatedComment = {
      id: comments[1].id,
      body: 'Many updates. Wow.'
    }
    const updatedState = reducer(state, {
      type: COMMENT_UPDATED,
      comment: updatedComment
    })
    expect(updatedState).toEqual({
      byId: {
        ...byId,
        [updatedComment.id]: updatedComment
      },
      sortBy
    })
  })
})

describe('COMMENT_DELETED', () => {
  it('should remove the comment from the collection of comments if it is present', () => {
    const deletedComment = {
      id: comments[1].id
    }
    const updatedState = reducer(state, {
      type: COMMENT_DELETED,
      comment: deletedComment
    })

    const expectedComments = { ...byId }
    delete expectedComments[deletedComment.id]

    expect(updatedState).toEqual({
      byId: expectedComments,
      sortBy
    })
  })

  it('should not change the collection of comments if it is not present', () => {
    const deletedComment = { id: 17 }
    const updatedState = reducer(state, {
      type: COMMENT_DELETED,
      comment: deletedComment
    })
    expect(updatedState).toEqual({
      byId,
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
      byId,
      sortBy: updatedSortCommentsBy
    })
  })
})

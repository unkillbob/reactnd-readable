import {
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'
import reducer from './comment'

describe('default state', () => {
  it('should default the collection of comments to an empty object', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('byPostId', {})
  })

  it('should default sortBy to "voteScore"', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('sortBy', 'voteScore')
  })
})

const postId = 'post1'
const comments = [{ id: 10 }, { id: 12 }, { id: 13 }]
const byPostId = {
  [postId]: comments
}
const sortBy = 'voteScore'

const state = {
  byPostId,
  sortBy
}

describe('RECEIVE_COMMENTS', () => {
  it('should update the list of comments for that postId', () => {
    const receivedComments = [{ id: 11 }, { id: 13 }, { id: 14 }]
    const updatedState = reducer(state, {
      type: RECEIVE_COMMENTS,
      comments: receivedComments,
      postId
    })
    expect(updatedState).toEqual({
      byPostId: {
        [postId]: receivedComments
      },
      sortBy
    })
  })
})

describe('RECEIVE_UPDATED_COMMENT', () => {
  it('should update the comment in the list of comments for the relevant post ID if it is present', () => {
    const updatedComment = {
      id: comments[1].id,
      body: 'Many updates. Wow.',
      parentId: postId
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_COMMENT,
      comment: updatedComment
    })
    expect(updatedState).toEqual({
      byPostId: {
        [postId]: [comments[0], comments[2], updatedComment]
      },
      sortBy
    })
  })

  it('should add the comment to the list of comments for the relevant post ID if it is not present', () => {
    const updatedComment = {
      id: 17,
      body: 'Totally new comment.',
      parentId: postId
    }
    const updatedState = reducer(state, {
      type: RECEIVE_UPDATED_COMMENT,
      comment: updatedComment
    })
    expect(updatedState).toEqual({
      byPostId: {
        [postId]: comments.concat(updatedComment)
      },
      sortBy
    })
  })
})

describe('COMMENT_DELETED', () => {
  it('should remove the comment from the list of comments for the relevant post ID if it is present', () => {
    const deletedComment = {
      id: comments[1].id,
      parentId: postId
    }
    const updatedState = reducer(state, {
      type: COMMENT_DELETED,
      comment: deletedComment
    })
    expect(updatedState).toEqual({
      byPostId: {
        [postId]: [comments[0], comments[2]]
      },
      sortBy
    })
  })

  it('should not change the list of comments for the relevant post ID if it is not present', () => {
    const deletedComment = {
      id: 17,
      parentId: postId
    }
    const updatedState = reducer(state, {
      type: COMMENT_DELETED,
      comment: deletedComment
    })
    expect(updatedState).toEqual({
      byPostId,
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
      byPostId,
      sortBy: updatedSortCommentsBy
    })
  })
})

import {
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'

const INITIAL_STATE = {
  byPostId: {},
  sortBy: 'voteScore'
}

export default function reducer (state = INITIAL_STATE, action) {
  let relatedComments

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.postId]: action.comments
        }
      }
    case RECEIVE_UPDATED_COMMENT:
      const updatedComment = action.comment
      relatedComments = state.byPostId[updatedComment.parentId] || []

      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [updatedComment.parentId]: relatedComments
            .filter(comment => comment.id !== updatedComment.id)
            .concat(updatedComment)
        }
      }
    case COMMENT_DELETED:
      const deletedComment = action.comment
      relatedComments = state.byPostId[deletedComment.parentId] || []

      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [deletedComment.parentId]: relatedComments.filter(comment => {
            return comment.id !== deletedComment.id
          })
        }
      }
    case UPDATE_SORT_COMMENTS_BY:
      return {
        ...state,
        sortBy: action.sortBy
      }
    default:
      return state
  }
}

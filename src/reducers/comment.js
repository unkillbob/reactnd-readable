import {
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'

const INITIAL_STATE = {
  list: [],
  sortBy: 'voteScore'
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        list: action.comments
      }
    case RECEIVE_UPDATED_COMMENT:
      return {
        ...state,
        list: state.list
          .filter(c => c.id !== action.comment.id)
          .concat(action.comment)
      }
    case COMMENT_DELETED:
      return {
        ...state,
        list: state.list.filter(comment => comment.id !== action.comment.id)
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

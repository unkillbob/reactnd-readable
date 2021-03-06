import keyBy from 'lodash/keyBy'
import omitBy from 'lodash/omitBy'

import {
  RECEIVE_COMMENTS,
  COMMENT_CREATED,
  COMMENT_UPDATED,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'

const INITIAL_STATE = {
  byId: {},
  sortBy: 'voteScore'
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...keyBy(action.comments, 'id')
        }
      }
    case COMMENT_CREATED:
    case COMMENT_UPDATED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      }
    case COMMENT_DELETED:
      return {
        ...state,
        byId: omitBy(state.byId, { id: action.comment.id })
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

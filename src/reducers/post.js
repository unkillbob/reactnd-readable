import * as keyBy from 'lodash/keyBy'
import * as omitBy from 'lodash/omitBy'

import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
  UPDATE_SORT_BY
} from '../actions'

const INITIAL_STATE = {
  byId: {},
  sortBy: 'voteScore'
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...keyBy(action.posts.filter(post => !post.deleted), 'id')
        }
      }
    case RECEIVE_POST:
    case RECEIVE_UPDATED_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        }
      }
    case POST_DELETED:
      return {
        ...state,
        byId: omitBy(state.byId, { id: action.post.id })
      }
    case UPDATE_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy
      }
    default:
      return state
  }
}

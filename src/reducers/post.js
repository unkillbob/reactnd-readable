import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
  UPDATE_SORT_BY
} from '../actions'

const INITIAL_STATE = {
  list: [],
  sortBy: 'voteScore'
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        list: action.posts.filter(post => !post.deleted)
      }
    case RECEIVE_POST:
      return {
        ...state,
        active: action.post
      }
    case RECEIVE_UPDATED_POST:
      const active = state.active && state.active.id === action.post.id
        ? action.post
        : state.active
      const list = state.list.map(post => {
        return post.id === action.post.id ? action.post : post
      })
      return {
        ...state,
        list,
        active
      }
    case POST_DELETED:
      return {
        ...state,
        list: state.list.filter(post => post.id !== action.post.id),
        active: state.active && state.active.id === action.post.id
          ? null
          : state.active
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

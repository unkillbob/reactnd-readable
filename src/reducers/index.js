import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions'

const INITIAL_STATE = { categories: [], posts: [] }

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}

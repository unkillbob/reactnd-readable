import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  UPDATE_CATEGORY,
  UPDATE_SORT_BY
} from '../actions'

const INITIAL_STATE = {
  categories: [],
  posts: [],
  sortBy: 'voteScore'
}

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
    case RECEIVE_POST:
      return {
        ...state,
        post: action.post
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.category
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

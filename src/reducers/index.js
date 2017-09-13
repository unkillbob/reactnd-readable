import { RECEIVE_CATEGORIES } from '../actions'

export default function reducer (state = { categories: [] }, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}

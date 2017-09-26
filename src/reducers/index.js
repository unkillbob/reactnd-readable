import {
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  RECEIVE_POSTS,
  RECEIVE_POST,
  UPDATE_CATEGORY,
  UPDATE_SORT_BY,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'

const INITIAL_STATE = {
  categories: [],
  comments: [],
  posts: [],
  sortBy: 'voteScore',
  sortCommentsBy: 'voteScore'
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
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }
    case RECEIVE_COMMENT:
      const comments = state.comments.filter(c => c.id !== action.comment.id)
      comments.push(action.comment)
      return {
        ...state,
        comments
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
    case UPDATE_SORT_COMMENTS_BY:
      return {
        ...state,
        sortCommentsBy: action.sortCommentsBy
      }
    default:
      return state
  }
}

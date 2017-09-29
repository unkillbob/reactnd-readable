import {
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
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
        posts: action.posts.filter(post => !post.deleted)
      }
    case RECEIVE_POST:
      return {
        ...state,
        post: action.post
      }
    case RECEIVE_UPDATED_POST:
      const post = state.post && state.post.id === action.post.id
        ? action.post
        : state.post
      const posts = state.posts.map(post => {
        return post.id === action.post.id ? action.post : post
      })
      return {
        ...state,
        posts,
        post
      }
    case POST_DELETED:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post.id),
        post: state.post && state.post.id === action.post.id
          ? null
          : state.post
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }
    case RECEIVE_UPDATED_COMMENT:
      return {
        ...state,
        comments: state.comments
          .filter(c => c.id !== action.comment.id)
          .concat(action.comment)
      }
    case COMMENT_DELETED:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.comment.id
        )
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

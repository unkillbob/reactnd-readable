import API from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  return API.fetchCategories().then(categories => {
    dispatch(receiveCategories(categories))
  })
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => {
  return API.fetchPosts().then(posts => {
    dispatch(receivePosts(posts))
  })
}

export const updateSortBy = sortBy => ({
  type: UPDATE_SORT_BY,
  sortBy
})

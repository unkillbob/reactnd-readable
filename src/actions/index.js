import API from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const UPDATE_SORT_COMMENTS_BY = 'UPDATE_SORT_COMMENTS_BY'

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

export const fetchPosts = category => dispatch => {
  return API.fetchPosts(category).then(posts => {
    dispatch(receivePosts(posts))
  })
}

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = id => dispatch => {
  return API.fetchPost(id).then(post => {
    dispatch(receivePost(post))
  })
}

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = id => dispatch => {
  return API.fetchComments(id).then(comments => {
    dispatch(receiveComments(comments))
  })
}

export const updateSortBy = sortBy => ({
  type: UPDATE_SORT_BY,
  sortBy
})

export const updateSortCommentsBy = sortCommentsBy => ({
  type: UPDATE_SORT_COMMENTS_BY,
  sortCommentsBy
})

export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
})

export const createPost = post => dispatch => {
  return API.createPost(post).then(createdPost => {
    dispatch(receivePost(createdPost))
  })
}

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

export const createComment = comment => dispatch => {
  return API.createComment(comment).then(createdComment => {
    console.log('comment created', comment)
    dispatch(receiveComment(createdComment))
  })
}

import API from '../utils/api'

// ===== Categories ===== //

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  return API.fetchCategories().then(categories => {
    dispatch(receiveCategories(categories))
  })
}

export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
})

// ===== Posts ===== //

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_UPDATED_POST = 'RECEIVE_UPDATED_POST'
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY'

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

export const createPost = post => dispatch => {
  return API.createPost(post).then(createdPost => {
    dispatch(receivePost(createdPost))
  })
}

export const receiveUpdatedPost = post => ({
  type: RECEIVE_UPDATED_POST,
  post
})

export const updatePost = (id, details) => dispatch => {
  return API.updatePost(id, details).then(updatedPost => {
    dispatch(receiveUpdatedPost(updatedPost))
  })
}

export const voteForPost = (post, option) => dispatch => {
  return API.voteForPost(post, option).then(updatedPost => {
    dispatch(receiveUpdatedPost(updatedPost))
  })
}

export const updateSortBy = sortBy => ({
  type: UPDATE_SORT_BY,
  sortBy
})

// ===== Comments ===== //

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_SORT_COMMENTS_BY = 'UPDATE_SORT_COMMENTS_BY'

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = id => dispatch => {
  return API.fetchComments(id).then(comments => {
    dispatch(receiveComments(comments))
  })
}

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
})

export const createComment = comment => dispatch => {
  return API.createComment(comment).then(createdComment => {
    dispatch(updateComment(createdComment))
  })
}

export const voteForComment = (comment, option) => dispatch => {
  return API.voteForComment(comment, option).then(updatedComment => {
    dispatch(updateComment(updatedComment))
  })
}

export const updateSortCommentsBy = sortCommentsBy => ({
  type: UPDATE_SORT_COMMENTS_BY,
  sortCommentsBy
})

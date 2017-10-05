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
export const POST_CREATED = 'POST_CREATED'
export const POST_UPDATED = 'POST_UPDATED'
export const POST_DELETED = 'POST_DELETED'
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = category => dispatch => {
  return API.fetchPosts(category).then((posts = []) => {
    posts.forEach(post => dispatch(fetchComments(post.id)))
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

export const postCreated = post => ({
  type: POST_CREATED,
  post
})

export const createPost = post => dispatch => {
  return API.createPost(post).then(createdPost => {
    dispatch(postCreated(createdPost))
  })
}

export const postUpdated = post => ({
  type: POST_UPDATED,
  post
})

export const updatePost = (id, details) => dispatch => {
  return API.updatePost(id, details).then(updatedPost => {
    dispatch(postUpdated(updatedPost))
  })
}

export const postDeleted = post => ({
  type: POST_DELETED,
  post
})

export const deletePost = post => dispatch => {
  return API.deletePost(post.id).then(() => {
    dispatch(postDeleted(post))
  })
}

export const voteForPost = (post, option) => dispatch => {
  return API.voteForPost(post, option).then(updatedPost => {
    dispatch(postUpdated(updatedPost))
  })
}

export const updateSortBy = sortBy => ({
  type: UPDATE_SORT_BY,
  sortBy
})

// ===== Comments ===== //

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const COMMENT_CREATED = 'COMMENT_CREATED'
export const COMMENT_UPDATED = 'COMMENT_UPDATED'
export const COMMENT_DELETED = 'COMMENT_DELETED'
export const UPDATE_SORT_COMMENTS_BY = 'UPDATE_SORT_COMMENTS_BY'

export const receiveComments = (postId, comments) => ({
  type: RECEIVE_COMMENTS,
  postId,
  comments
})

export const fetchComments = postId => dispatch => {
  return API.fetchComments(postId).then(comments => {
    dispatch(receiveComments(postId, comments))
  })
}

export const commentCreated = comment => ({
  type: COMMENT_CREATED,
  comment
})

export const createComment = comment => dispatch => {
  return API.createComment(comment).then(createdComment => {
    dispatch(commentCreated(createdComment))
  })
}

export const commentUpdated = comment => ({
  type: COMMENT_UPDATED,
  comment
})

export const updateComment = (id, details) => dispatch => {
  return API.updateComment(id, details).then(updatedComment => {
    dispatch(commentUpdated(updatedComment))
  })
}

export const commentDeleted = comment => ({
  type: COMMENT_DELETED,
  comment
})

export const deleteComment = comment => dispatch => {
  return API.deleteComment(comment.id).then(() => {
    dispatch(commentDeleted(comment))
  })
}

export const voteForComment = (comment, option) => dispatch => {
  return API.voteForComment(comment, option).then(updatedComment => {
    dispatch(commentUpdated(updatedComment))
  })
}

export const updateSortCommentsBy = sortBy => ({
  type: UPDATE_SORT_COMMENTS_BY,
  sortBy
})

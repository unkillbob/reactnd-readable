const BASE_URL = 'http://localhost:3001'
const POSTS_URL = `${BASE_URL}/posts`
const COMMENTS_URL = `${BASE_URL}/comments`

const OPTIONS = {
  headers: {
    Authorization: 'whatever-you-want'
  }
}
const POST_OPTIONS = {
  ...OPTIONS,
  headers: {
    ...OPTIONS.headers,
    'Content-Type': 'application/json'
  },
  method: 'POST'
}

export function fetchCategories () {
  return fetch(`${BASE_URL}/categories`, OPTIONS)
    .then(res => res.json())
    .then(data => data.categories)
}

export function fetchPosts (category) {
  const url = category ? `${BASE_URL}/${category}/posts` : POSTS_URL
  return fetch(url, OPTIONS).then(res => res.json())
}

export function fetchPost (id) {
  return fetch(`${POSTS_URL}/${id}`, OPTIONS).then(res => res.json())
}

export function fetchComments (postId) {
  return fetch(`${POSTS_URL}/${postId}/comments`, OPTIONS).then(res => {
    return res.json()
  })
}

export function createPost (post) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify(post)
  }
  return fetch(POSTS_URL, options).then(res => res.json())
}

export function createComment (comment) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify(comment)
  }
  return fetch(COMMENTS_URL, options).then(res => res.json())
}

export default {
  fetchCategories,
  fetchPosts,
  fetchPost,
  fetchComments,
  createPost,
  createComment
}

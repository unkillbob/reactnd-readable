const BASE_URL = 'http://localhost:3001'
const POSTS_URL = `${BASE_URL}/posts`

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

export function fetchPosts () {
  return fetch(POSTS_URL, OPTIONS).then(res => res.json())
}

export function fetchPost (id) {
  return fetch(`${POSTS_URL}/${id}`, OPTIONS).then(res => res.json())
}

export function createPost (post) {
  const options = {
    ...POST_OPTIONS,
    body: JSON.stringify(post)
  }
  return fetch(POSTS_URL, options).then(res => res.json())
}

export default {
  fetchCategories,
  fetchPosts,
  fetchPost,
  createPost
}

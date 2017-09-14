const BASE_URL = 'http://localhost:3001'
const OPTIONS = { headers: { Authorization: 'whatever-you-want' } }

export function fetchCategories () {
  return fetch(`${BASE_URL}/categories`, OPTIONS)
    .then(res => res.json())
    .then(data => data.categories)
}

export function fetchPosts () {
  return fetch(`${BASE_URL}/posts`, OPTIONS).then(res => res.json())
}

export default {
  fetchCategories,
  fetchPosts
}

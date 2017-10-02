import API from '../utils/api'
import {
  fetchCategories,
  fetchPosts,
  fetchComments,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS
} from './'

jest.mock('../utils/api', () => {
  return {
    fetchCategories: jest.fn(() => Promise.resolve([])),
    fetchPosts: jest.fn(() => Promise.resolve([])),
    fetchComments: jest.fn(() => Promise.resolve([]))
  }
})

const dispatch = jest.fn()

afterEach(() => {
  dispatch.mockClear()
})

describe('fetchCategories', () => {
  afterEach(() => {
    API.fetchCategories.mockClear()
  })

  it('should fetch categories from the API', () => {
    fetchCategories()(dispatch)
    expect(API.fetchCategories).toHaveBeenCalledTimes(1)
  })

  it('should dispatch the RECEIVE_CATEGORIES action with the categories returned by the API', () => {
    const categories = [{ name: 'foo' }, { name: 'bar' }]
    API.fetchCategories.mockImplementationOnce(() =>
      Promise.resolve(categories)
    )

    return fetchCategories()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_CATEGORIES,
        categories
      })
    })
  })
})

describe('fetchPosts', () => {
  afterEach(() => {
    API.fetchPosts.mockClear()
  })

  it('should fetch posts from the API', () => {
    fetchPosts()(dispatch)
    expect(API.fetchPosts).toHaveBeenCalledTimes(1)
  })

  it('should fetch posts with the given category from the API', () => {
    const category = 'foo'
    fetchPosts(category)(dispatch)

    expect(API.fetchPosts).toHaveBeenCalledTimes(1)
    expect(API.fetchPosts).toHaveBeenCalledWith(category)
  })

  it('should dispatch the RECEIVE_POSTS action with the posts returned by the API', () => {
    const posts = [{ id: 1 }, { id: 3 }]
    API.fetchPosts.mockImplementationOnce(() => Promise.resolve(posts))

    return fetchPosts()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_POSTS,
        posts
      })
    })
  })
})

describe('fetchPost', () => {
  it('should fetch the post with the given ID from the API')

  it('should dispatch the receivePost action with the post returned by the API')
})

describe('createPost', () => {
  it('should create a new post with the given data via the API')

  it(
    'should dispatch the receivePost action with the created post returned by the API'
  )
})

describe('updatePost', () => {
  it('should update the post with the given ID and details via the API')

  it(
    'should dispatch the receiveUpdatedPost action with the updated post returned by the API'
  )
})

describe('deletePost', () => {
  it('should delete the given post via the API')

  it(
    'should dispatch the postDeleted action with the given post when the API resolves'
  )
})

describe('voteForPost', () => {
  it(
    'should update the voteScore of the given post with the given vote option via the API'
  )

  it(
    'should dispatch the receiveUpdatedPost action with the updated post returned by the API'
  )
})

describe('fetchComments', () => {
  afterEach(() => {
    API.fetchComments.mockClear()
  })

  it('should fetch comments with the given post ID from the API', () => {
    const postId = 123
    fetchComments(postId)(dispatch)

    expect(API.fetchComments).toHaveBeenCalledTimes(1)
    expect(API.fetchComments).toHaveBeenCalledWith(postId)
  })

  it('should dispatch the RECEIVE_COMMENTS action with the comments returned by the API', () => {
    const comments = [{ id: 1 }, { id: 3 }]
    API.fetchComments.mockImplementationOnce(() => Promise.resolve(comments))

    return fetchComments()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_COMMENTS,
        comments
      })
    })
  })
})

describe('createComment', () => {
  it('should create a new comment with the given data via the API')

  it(
    'should dispatch the receiveUpdatedComment action with the created comment returned by the API'
  )
})

describe('updateComment', () => {
  it('should update the comment with the given ID and details via the API')

  it(
    'should dispatch the receiveUpdatedComment action with the updated comment returned by the API'
  )
})

describe('deleteComment', () => {
  it('should delete the given comment via the API')

  it(
    'should dispatch the commentDeleted action with the given comment when the API resolves'
  )
})

describe('voteForComment', () => {
  it(
    'should update the voteScore of the given comment with the given vote option via the API'
  )

  it(
    'should dispatch the receiveUpdatedComment action with the updated comment returned by the API'
  )
})

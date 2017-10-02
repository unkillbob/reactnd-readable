import API from '../utils/api'
import {
  fetchCategories,
  fetchPosts,
  fetchPost,
  createPost,
  fetchComments,
  createComment,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT
} from './'

jest.mock('../utils/api', () => {
  return {
    fetchCategories: jest.fn(() => Promise.resolve([])),
    fetchPosts: jest.fn(() => Promise.resolve([])),
    fetchPost: jest.fn(() => Promise.resolve()),
    createPost: jest.fn(() => Promise.resolve()),
    createComment: jest.fn(() => Promise.resolve()),
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
  afterEach(() => {
    API.fetchPost.mockClear()
  })

  it('should fetch the post with the given ID from the API', () => {
    const postId = 123
    fetchPost(postId)(dispatch)

    expect(API.fetchPost).toHaveBeenCalledTimes(1)
    expect(API.fetchPost).toHaveBeenCalledWith(postId)
  })

  it('should dispatch the RECEIVE_POST action with the post returned by the API', () => {
    const post = { id: 13 }
    API.fetchPost.mockImplementationOnce(() => Promise.resolve(post))

    return fetchPost(post.i)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_POST,
        post
      })
    })
  })
})

describe('createPost', () => {
  afterEach(() => {
    API.createPost.mockClear()
  })

  it('should create a new post with the given data via the API', () => {
    const postDetails = { id: 13, title: 'foo' }
    createPost(postDetails)(dispatch)

    expect(API.createPost).toHaveBeenCalledTimes(1)
    expect(API.createPost).toHaveBeenCalledWith(postDetails)
  })

  it('should dispatch the RECEIVE_POST action with the created post returned by the API', () => {
    const createdPost = {
      id: 13,
      title: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    API.createPost.mockImplementationOnce(() => Promise.resolve(createdPost))

    return createPost({ id: 13, title: 'foo' })(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_POST,
        post: createdPost
      })
    })
  })
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

    return fetchComments(123)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_COMMENTS,
        comments
      })
    })
  })
})

describe('createComment', () => {
  afterEach(() => {
    API.createComment.mockClear()
  })

  it('should create a new comment with the given data via the API', () => {
    const commentDetails = { id: 13, body: 'foo' }
    createComment(commentDetails)(dispatch)

    expect(API.createComment).toHaveBeenCalledTimes(1)
    expect(API.createComment).toHaveBeenCalledWith(commentDetails)
  })

  it('should dispatch the RECEIVE_UPDATED_COMMENT action with the created comment returned by the API', () => {
    const createdComment = {
      id: 13,
      body: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    API.createComment.mockImplementationOnce(() =>
      Promise.resolve(createdComment)
    )

    return createComment({ id: 13, body: 'foo' })(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_UPDATED_COMMENT,
        comment: createdComment
      })
    })
  })
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

import API from '../utils/api'
import {
  fetchCategories,
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  voteForPost,
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  voteForComment,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  POST_CREATED,
  POST_UPDATED,
  POST_DELETED,
  RECEIVE_COMMENTS,
  COMMENT_CREATED,
  COMMENT_UPDATED,
  COMMENT_DELETED
} from './'

jest.mock('../utils/api', () => {
  return {
    fetchCategories: jest.fn(() => Promise.resolve([])),
    fetchPosts: jest.fn(() => Promise.resolve([])),
    fetchPost: jest.fn(() => Promise.resolve()),
    createPost: jest.fn(() => Promise.resolve()),
    updatePost: jest.fn(() => Promise.resolve()),
    deletePost: jest.fn(() => Promise.resolve()),
    voteForPost: jest.fn(() => Promise.resolve()),
    fetchComments: jest.fn(() => Promise.resolve([])),
    createComment: jest.fn(() => Promise.resolve()),
    updateComment: jest.fn(() => Promise.resolve()),
    deleteComment: jest.fn(() => Promise.resolve()),
    voteForComment: jest.fn(() => Promise.resolve())
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
    API.fetchComments.mockClear()
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

  it('should dispatch the fetchComments action for each post returned by the API', () => {
    const posts = [{ id: 1 }, { id: 3 }]
    API.fetchPosts.mockImplementationOnce(() => Promise.resolve(posts))

    const stubDispatch = jest.fn(action => {
      if (typeof action === 'function') {
        action(dispatch)
      }
    })

    return fetchPosts()(stubDispatch).then(() => {
      expect(API.fetchComments).toHaveBeenCalledTimes(2)
      expect(API.fetchComments).toHaveBeenCalledWith(1)
      expect(API.fetchComments).toHaveBeenCalledWith(3)
    })
  })
})

describe('fetchPost', () => {
  const post = { id: 13 }

  beforeEach(() => {
    API.fetchPost.mockImplementationOnce(() => Promise.resolve(post))
  })

  afterEach(() => {
    API.fetchPost.mockClear()
    API.fetchComments.mockClear()
  })

  it('should fetch the post with the given ID from the API', () => {
    const postId = 123
    fetchPost(postId)(dispatch)

    expect(API.fetchPost).toHaveBeenCalledTimes(1)
    expect(API.fetchPost).toHaveBeenCalledWith(postId)
  })

  it('should dispatch the RECEIVE_POST action with the post returned by the API', () => {
    return fetchPost(post.i)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_POST,
        post
      })
    })
  })

  it('should dispatch the fetchComments action for the post returned by the API', () => {
    const stubDispatch = jest.fn(action => {
      if (typeof action === 'function') {
        action(dispatch)
      }
    })

    return fetchPost(post.i)(stubDispatch).then(() => {
      expect(API.fetchComments).toHaveBeenCalledTimes(1)
      expect(API.fetchComments).toHaveBeenCalledWith(post.id)
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

  it('should dispatch the POST_CREATED action with the created post returned by the API', () => {
    const createdPost = {
      id: 13,
      title: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    API.createPost.mockImplementationOnce(() => Promise.resolve(createdPost))

    return createPost({ id: 13, title: 'foo' })(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: POST_CREATED,
        post: createdPost
      })
    })
  })
})

describe('updatePost', () => {
  afterEach(() => {
    API.updatePost.mockClear()
  })

  it('should update the post with the given ID and details via the API', () => {
    const postId = 13
    const postDetails = { title: 'foo' }
    updatePost(postId, postDetails)(dispatch)

    expect(API.updatePost).toHaveBeenCalledTimes(1)
    expect(API.updatePost).toHaveBeenCalledWith(postId, postDetails)
  })

  it('should dispatch the POST_UPDATED action with the updated post returned by the API', () => {
    const updatedPost = {
      id: 13,
      title: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    API.updatePost.mockImplementationOnce(() => Promise.resolve(updatedPost))

    return updatePost(13, { title: 'foo' })(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: POST_UPDATED,
        post: updatedPost
      })
    })
  })
})

describe('deletePost', () => {
  afterEach(() => {
    API.deletePost.mockClear()
  })

  it('should delete the given post via the API', () => {
    const post = { id: 13 }
    deletePost(post)(dispatch)

    expect(API.deletePost).toHaveBeenCalledTimes(1)
    expect(API.deletePost).toHaveBeenCalledWith(post.id)
  })

  it('should dispatch the POST_DELETED action with the given post when the API resolves', () => {
    const post = {
      id: 13,
      title: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    return deletePost(post)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: POST_DELETED,
        post
      })
    })
  })
})

describe('voteForPost', () => {
  afterEach(() => {
    API.voteForPost.mockClear()
  })

  it('should update the voteScore of the given post with the given vote option via the API', () => {
    const post = { id: 13 }
    const option = 'downVote'
    voteForPost(post, option)(dispatch)

    expect(API.voteForPost).toHaveBeenCalledTimes(1)
    expect(API.voteForPost).toHaveBeenCalledWith(post, option)
  })

  it('should dispatch the POST_UPDATED action with the updated post returned by the API', () => {
    const post = {
      id: 13,
      title: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    const updatedPost = {
      ...post,
      voteScore: 2
    }

    API.voteForPost.mockImplementationOnce(() => Promise.resolve(updatedPost))

    return voteForPost(post, 'upVote')(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: POST_UPDATED,
        post: updatedPost
      })
    })
  })
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
    const postId = 123
    const comments = [{ id: 1 }, { id: 3 }]
    API.fetchComments.mockImplementationOnce(() => Promise.resolve(comments))

    return fetchComments(postId)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: RECEIVE_COMMENTS,
        postId,
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

  it('should dispatch the COMMENT_CREATED action with the created comment returned by the API', () => {
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
        type: COMMENT_CREATED,
        comment: createdComment
      })
    })
  })
})

describe('updateComment', () => {
  afterEach(() => {
    API.updateComment.mockClear()
  })

  it('should update the comment with the given ID and details via the API', () => {
    const commentId = 13
    const commentDetails = { body: 'foo' }
    updateComment(commentId, commentDetails)(dispatch)

    expect(API.updateComment).toHaveBeenCalledTimes(1)
    expect(API.updateComment).toHaveBeenCalledWith(commentId, commentDetails)
  })

  it('should dispatch the COMMENT_UPDATED action with the updated comment returned by the API', () => {
    const updatedComment = {
      id: 13,
      body: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    API.updateComment.mockImplementationOnce(() =>
      Promise.resolve(updatedComment)
    )

    return updateComment(13, { body: 'foo' })(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: COMMENT_UPDATED,
        comment: updatedComment
      })
    })
  })
})

describe('deleteComment', () => {
  afterEach(() => {
    API.deleteComment.mockClear()
  })

  it('should delete the given comment via the API', () => {
    const comment = { id: 13 }
    deleteComment(comment)(dispatch)

    expect(API.deleteComment).toHaveBeenCalledTimes(1)
    expect(API.deleteComment).toHaveBeenCalledWith(comment.id)
  })

  it('should dispatch the COMMENT_DELETED action with the given comment when the API resolves', () => {
    const comment = {
      id: 13,
      body: 'foo',
      timestamp: Date.now(),
      voteScore: 1
    }

    return deleteComment(comment)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: COMMENT_DELETED,
        comment
      })
    })
  })
})

describe('voteForComment', () => {
  afterEach(() => {
    API.voteForComment.mockClear()
  })

  it('should update the voteScore of the given comment with the given vote option via the API', () => {
    const comment = { id: 13 }
    const option = 'downVote'
    voteForComment(comment, option)(dispatch)

    expect(API.voteForComment).toHaveBeenCalledTimes(1)
    expect(API.voteForComment).toHaveBeenCalledWith(comment, option)
  })

  it('should dispatch the COMMENT_UPDATED action with the updated comment returned by the API', () => {
    const comment = {
      id: 13,
      body: 'foo',
      timestamp: Date.now(),
      voteScore: 2
    }

    const updatedComment = {
      ...comment,
      voteScore: 1
    }

    API.voteForComment.mockImplementationOnce(() =>
      Promise.resolve(updatedComment)
    )

    return voteForComment(comment, 'downVote')(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: COMMENT_UPDATED,
        comment: updatedComment
      })
    })
  })
})

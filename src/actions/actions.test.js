describe('fetchCategories', () => {
  it('should fetch categories from the API')

  it(
    'should dispatch the receiveCategories action with the categories returned by the API'
  )
})

describe('fetchPosts', () => {
  it('should fetch posts from the API')

  it(
    'should dispatch the receivePosts action with the posts returned by the API'
  )

  it('should fetch posts with the given category from the API')
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
  it('should fetch comments with the given post ID from the API')

  it(
    'should dispatch the receiveComments action with the comments returned by the API'
  )
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

import {
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  RECEIVE_UPDATED_COMMENT,
  COMMENT_DELETED,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_UPDATED_POST,
  POST_DELETED,
  UPDATE_CATEGORY,
  UPDATE_SORT_BY,
  UPDATE_SORT_COMMENTS_BY
} from '../actions'
import reducer from './'

describe('default state', () => {
  it('should default categories, posts and comments to empty arrays', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('categories', [])
    expect(state).toHaveProperty('posts', [])
    expect(state).toHaveProperty('comments', [])
  })

  it('should default sortBy and sortCommentsBy to "voteScore"', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('sortBy', 'voteScore')
    expect(state).toHaveProperty('sortCommentsBy', 'voteScore')
  })
})

describe('RECEIVE_CATEGORIES', () => {
  it('should update the list of categories', () => {
    const state = { categories: [{ name: 'foo', path: 'foo' }] }
    const categories = [
      { name: 'bar', path: 'bar' },
      { name: 'baz', path: 'baz' }
    ]
    const updatedState = reducer(state, {
      type: RECEIVE_CATEGORIES,
      categories
    })
    expect(updatedState).toHaveProperty('categories', categories)
  })
})

describe('RECEIVE_POSTS', () => {
  it('should update the list of posts')

  it('should filter out deleted posts')
})

describe('RECEIVE_POST', () => {
  it('should update the active post')
})

describe('RECEIVE_UPDATED_POST', () => {
  it('should update the active post if it matches by ID')

  it('should not update the active post if it does not match by ID')

  it(
    'should update the post in the posts collection if it is present in the collection'
  )

  it(
    'should not update the post in the posts collection if it is not present in the collection'
  )
})

describe('POST_DELETED', () => {
  it('should set the active post to null if it matches by ID')

  it('should not update the active post if it does not match by ID')

  it(
    'should remove the post from the posts collection if it is present in the collection'
  )

  it(
    'should not change the posts collection if it is not present in the collection'
  )
})

describe('RECEIVE_COMMENTS', () => {
  it('should update the list of comments')
})

describe('RECEIVE_UPDATED_COMMENT', () => {
  it(
    'should update the comment in the comments collection if it is present in the collection'
  )

  it(
    'should add the comment to the comments collection if it is not present in the collection'
  )
})

describe('COMMENT_DELETED', () => {
  it(
    'should remove the comment from the comments collection if it is present in the collection'
  )

  it(
    'should not change the comments collection if it is not present in the collection'
  )
})

describe('UPDATE_CATEGORY', () => {
  it('should update the active category')

  it('should allow updating the active category to null')
})

describe('UPDATE_SORT_BY', () => {
  it('should update the sortBy')
})

describe('UPDATE_SORT_COMMENTS_BY', () => {
  it('should update the sortCommentsBy')
})

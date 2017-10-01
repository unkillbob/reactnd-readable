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

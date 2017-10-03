import { RECEIVE_CATEGORIES, UPDATE_CATEGORY } from '../actions'
import reducer from './category'

describe('default state', () => {
  it('should default list of categories to an empty array', () => {
    const state = reducer(undefined, { type: '' })
    expect(state).toHaveProperty('list', [])
  })
})

const list = [{ name: 'foo', path: 'foo' }, { name: 'bar', path: 'bar' }]
const active = 'foo'

const state = {
  list,
  active
}

describe('RECEIVE_CATEGORIES', () => {
  it('should update the list of categories', () => {
    const receivedCategories = [
      { name: 'bar', path: 'bar' },
      { name: 'baz', path: 'baz' }
    ]
    const updatedState = reducer(state, {
      type: RECEIVE_CATEGORIES,
      categories: receivedCategories
    })
    expect(updatedState).toEqual({
      list: receivedCategories,
      active
    })
  })
})

describe('UPDATE_CATEGORY', () => {
  it('should update the active category', () => {
    const updatedCategory = 'bar'
    const updatedState = reducer(state, {
      type: UPDATE_CATEGORY,
      category: updatedCategory
    })
    expect(updatedState).toEqual({
      list,
      active: updatedCategory
    })
  })

  it('should allow updating the active category to null', () => {
    const updatedState = reducer(state, {
      type: UPDATE_CATEGORY,
      category: null
    })
    expect(updatedState).toEqual({
      list,
      active: null
    })
  })
})

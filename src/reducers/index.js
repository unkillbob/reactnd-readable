import { combineReducers } from 'redux'
import category from './category'
import posts from './posts'
import comment from './comment'

export default combineReducers({ category, posts, comment })

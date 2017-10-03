import { combineReducers } from 'redux'
import category from './category'
import post from './post'
import comment from './comment'

export default combineReducers({ category, post, comment })

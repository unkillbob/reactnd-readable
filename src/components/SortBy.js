import React from 'react'

export default function SortBy (props) {
  return (
    <div className='d-inline-flex'>
      <div className='input-group'>
        <label className='input-group-addon mb-0' htmlFor='posts-sort-by'>
          Sort by
        </label>
        <select
          id='posts-sort-by'
          className='form-control custom-select flex-row'
          value={props.sortBy}
          onChange={event => props.onSortByChange(event.target.value)}
        >
          <option value='voteScore'>Vote Score</option>
          <option value='timestamp'>Time</option>
        </select>
      </div>
    </div>
  )
}

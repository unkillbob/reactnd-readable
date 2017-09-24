import React from 'react'

export default function SortBy (props) {
  return (
    <label htmlFor='posts-sort-by' className='mr-2'>
      Sort by
      <select
        id='posts-sort-by'
        className='form-control ml-2'
        value={props.sortBy}
        onChange={event => props.onSortByChange(event.target.value)}
      >
        <option value='voteScore'>Vote Score</option>
        <option value='timestamp'>Time</option>
      </select>
    </label>
  )
}

import React from 'react'
import moment from 'moment'

const DATE_FORMAT = 'D MMM YY HH:mm'

function formatTime (timestamp) {
  return moment(timestamp).format(DATE_FORMAT)
}

export default function PostSummary (props) {
  return (
    <div className='post-summary'>
      Submitted by
      <span className='post-author'> {props.post.author} </span>
      at
      <span className='post-timestamp'>
        {' '}{formatTime(props.post.timestamp)}
      </span>
    </div>
  )
}

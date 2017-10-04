import React from 'react'

export default function CommentCount (props) {
  const count = (props.comments || []).length
  return (
    <span className={props.className}>
      {count} comment{count !== 1 && 's'}
    </span>
  )
}

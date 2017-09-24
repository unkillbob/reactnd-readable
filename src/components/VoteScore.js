import React from 'react'
import './VoteScore.css'

export default function VoteScore (props) {
  return (
    <h4 className='post-vote-score mr-3'>
      <span className='badge badge-default'>{props.voteScore}</span>
    </h4>
  )
}

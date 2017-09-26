import React from 'react'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-up'
import './VoteScore.css'

export default function VoteScore (props) {
  return (
    <div className='vote-score-container mr-3 rounded'>
      <button
        type='button'
        className='btn btn-sm btn-success vote-up rounded-0'
        onClick={() => props.onVoteChange('upVote')}
      >
        <ArrowUpIcon />
      </button>
      <button
        type='button'
        className='btn btn-sm btn-danger vote-down rounded-0'
        onClick={() => props.onVoteChange('downVote')}
      >
        <ArrowDownIcon />
      </button>
      <h3 className='vote-score bg-faded mb-0'>
        {props.voteScore}
      </h3>
    </div>
  )
}

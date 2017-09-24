import React from 'react'
import moment from 'moment'
import './ItemSummary.css'

const DATE_FORMAT = 'D MMM YY HH:mm'

function formatTime (timestamp) {
  return moment(timestamp).format(DATE_FORMAT)
}

export default function ItemSummary (props) {
  return (
    <span>
      Submitted by
      <span className='item-author'> {props.item.author} </span>
      at
      <span className='item-timestamp'>
        {' '}{formatTime(props.item.timestamp)}
      </span>
    </span>
  )
}

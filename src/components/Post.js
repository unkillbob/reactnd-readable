import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
  render () {
    return (
      <div className='post-detail'>
        Post {this.props.match.params.id}
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

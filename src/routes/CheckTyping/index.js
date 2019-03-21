import React, { Component } from 'react'
import { connect } from 'react-redux'
import typeCheckingActions from '../../store/actions/typeChecking.action'

class CheckingTyping extends Component {
  componentDidMount() {
    this.props.fetchServerText()
  }
  render() {
    return (
      <div> test component </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    fetchServerText: () => dispatch(typeCheckingActions.fetchServerText()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckingTyping)
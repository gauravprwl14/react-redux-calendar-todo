import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import typeCheckingActions from '../../store/actions/typeChecking.action'
import DisplayText from './DisplayText'

class CheckingTyping extends Component {
  componentDidMount() {
    this.props.fetchServerText()
  }
  render() {
    return (
      <div>
        <DisplayText 
          textToDisplay={this.props.masterData.textStr}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    masterData: _.get(state.typeChecking, ['masterData'], {})
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchServerText: () => dispatch(typeCheckingActions.fetchServerText()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckingTyping)
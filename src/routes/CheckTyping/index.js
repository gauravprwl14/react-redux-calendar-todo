import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import typeCheckingActions from '../../store/actions/typeChecking.action'
import DisplayText from './DisplayText'
import InputBox from './InputBox'

function matchCharAtGivenIndex(masterStr, searchKeyword) {
  let matchedStr = ''
  let unmatchedStr = ''
  let remainingStr = masterStr
  let i =0;
  while(i<searchKeyword.length) {
    const charToMatch = searchKeyword[i]
    if (charToMatch === masterStr[i]) {
      matchedStr += charToMatch
      remainingStr = masterStr.slice(i+1)
      i++;
    } else {
      unmatchedStr = masterStr[i]
      remainingStr = masterStr.slice(i+1)
      break;
    }
  }
  return {
    matchedStr,
    unmatchedStr,
    remainingStr,
    completeMatch: matchedStr===masterStr,
    partialMatch: matchedStr !==masterStr
  }
}

const CheckingTyping = (props) => {
  const [searchKeyword, updateSearchKey] = useState('')
  useEffect(() => {
    props.fetchServerText()
  }, [])
  const validateTypeStr = (charToMatch) => {
    const strToMatch = props.masterData.tokenizedWords[props.currentMatchWordIndex] 
    const resOfMatch = matchCharAtGivenIndex(strToMatch.text, charToMatch)
    if (resOfMatch.completeMatch) {
        // all character matched
        props.updatedCurrentWordIndex(props.currentMatchWordIndex + 1)
        const nextWordToMatch = props.masterData.tokenizedWords[props.currentMatchWordIndex + 1] 
        props.updatedMatchedStr(props.matchedStr + strToMatch.text)
        props.updateCurrentWordStatus({
          matchedStr: '',
          unmatchedStr: '',
          remainingStr: nextWordToMatch.text,
        })
        const remainingStr = props.masterData.textStr.slice(nextWordToMatch.endIndex + 1)
        props.updatedRemainingStr(remainingStr)
        updateSearchKey('')
    } else {
      props.updateCurrentWordStatus({
        ...resOfMatch
      })
      updateSearchKey(charToMatch)
    }
  }
  return (
    <div>
      <DisplayText 
        textToDisplay={props.masterData.textStr}
        matchedStr={props.matchedStr}
        currentWordMatchStatus={props.currentWordMatchStatus}
        remainingStr={props.remainingStr}
      />
      <InputBox 
        validateTypeStr={validateTypeStr}
        searchStr={searchKeyword}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    masterData: _.get(state.typeChecking, ['masterData'], {}),
    lastMatchingTextIndex: _.get(state.typeChecking, ['lastMatchingTextIndex'], -1),
    currentMatchWordIndex: _.get(state.typeChecking, ['currentMatchWordIndex'], {}),
    currentWordMatchStatus: _.get(state.typeChecking, ['currentWordMatchStatus'], {}),
    matchedStr: _.get(state.typeChecking, ['matchedStr'], {}),
    remainingStr: _.get(state.typeChecking, ['remainingStr'], {})
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchServerText: () => dispatch(typeCheckingActions.fetchServerText()),
    updateCurrentWordStatus: (value) => dispatch(typeCheckingActions.updatedCurrentWordMatchStatus(value)),
    updatedMatchedStr: (value) => dispatch(typeCheckingActions.updatedMatchedStr(value)),
    updatedRemainingStr: (value) => dispatch(typeCheckingActions.updatedRemainingStr(value)),
    updatedCurrentWordIndex: (value) => dispatch(typeCheckingActions.updatedCurrentWordIndex(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckingTyping)
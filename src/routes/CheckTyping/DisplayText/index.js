import React, { Fragment } from 'react'
import './styles.scss'

const RenderText = (props) => {
    return (
        <span className={`text-${props.color}`}>
            {props.text}
        </span>
    )
}

const RenderCurrentWord =(props) => {
    return (
        <Fragment>
        { props.matchedStr && <RenderText color="green" text={props.matchedStr} /> }
        { props.unmatchedStr && <RenderText color="red" text={props.unmatchedStr} /> }
        { props.remainingStr && <RenderText color="black" text={props.remainingStr} /> }
        </Fragment>
    )
}

const DisplayText = (props) => {
    return (
        <div>
            {props.matchedStr && <RenderText color="green" text={props.matchedStr} />}
            <RenderCurrentWord {...props.currentWordMatchStatus }/>
            {props.remainingStr && <RenderText color="black" text={props.remainingStr} />}
        </div>
    )
}

DisplayText.defaultProps = {
    textToDisplay: ''
}

export default DisplayText
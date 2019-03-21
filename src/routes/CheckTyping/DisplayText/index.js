import React, { Component } from 'react'


class DisplayText extends Component {
    render() {
        return (
            <div>
                {this.props.textToDisplay}
            </div>
        )
    }
}

export default DisplayText
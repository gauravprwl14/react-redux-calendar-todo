
import React, { useState, useEffect } from 'react'

const InputBox = (props) => {
    const [userTypedStr, setTypedStr] = useState('')
    useEffect(() => {
        if (props.searchStr === null || props.searchStr === undefined) {
            setTypedStr('')
        } else {
            setTypedStr(props.searchStr)
        }

    }, [props.searchStr])
    return (
        <div>
            <input
                value={userTypedStr}
                onChange={(e) => {
                    setTypedStr(e.target.value)
                    props.validateTypeStr(e.target.value)
                }}

            />
        </div>
    )
}

export default InputBox
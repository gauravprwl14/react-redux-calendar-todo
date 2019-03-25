
import React, { useState, useEffect } from 'react'

let getInitialValue = (searchStr) => {
    console.log('%c inside getInitialValue ', 'background: aqua; color: black', searchStr);
    return searchStr || ''
}

const InputBox = (props) => {
    const [userTypedStr, setTypedStr] = useState(getInitialValue(props.searchStr))
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
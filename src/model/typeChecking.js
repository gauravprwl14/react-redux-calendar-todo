function transformServerResponse(responseObj = {}) {
    const res = {
        ...responseObj,
    }
    delete res.text_out
    let textStr  = ''
    if (responseObj.format && responseObj.text_out) {
        const patt = /<[^>]*>/g
        textStr = responseObj.text_out.replace(patt, '')
    }
    res.textStr = textStr

    return res
}

export default {transformServerResponse}
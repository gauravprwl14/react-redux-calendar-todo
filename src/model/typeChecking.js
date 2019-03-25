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
    res.textStr = textStr || ''
    res.textStrLength = textStr.length
    const tokenizedWords = textStr.split(' ')
    let cumWordLength = 0
    
    res.tokenizedWords = tokenizedWords.map((word, index) => {
        let startIndex = cumWordLength
        let endIndex = cumWordLength + word.length
        cumWordLength = endIndex + 1
        const obj =  {
            text: word + (index === tokenizedWords.length - 1 ? '' : ' '),
            startIndex: startIndex,
            endIndex: endIndex,
            textLength: word.length
        }
        return obj
    })
    return res
}

export default {transformServerResponse}
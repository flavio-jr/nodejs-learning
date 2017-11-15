exports.concatArray = (str, array) => {
    return array.map(element => {
        return str + ' ' + element
    })
}

function makeRandom(length) {
    const returnArray = []

    while (length > 0) {
        Math.random() > 0.5 ? returnArray.push(1) : returnArray.push(-1)
        length--
    }
    return returnArray
}
// console.log(makeRandom(2))

export {makeRandom};
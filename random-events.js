
function makeRandom(length) {
    const returnArray = []

    while (length > 0) {
       let x= Math.random();
       if (x > 0.5)  returnArray.push(1);
        else returnArray.push(-1)
        length--
    }
    return returnArray
}
// console.log(makeRandom(12))

export {makeRandom};
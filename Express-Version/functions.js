import readlineSync from "readline-sync";

function startGame () {
    let userResponse = readlineSync.question("Do you want to get going?")
}

export { startGame as startGame };
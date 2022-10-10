const Donkey = {
    Irritable: 70,
    Distracted: 30,
    Speed: 0,
    Turning: {
        Right: false,
        Left: false,
    },
    TimeSinceLastStop: 0
}

const Course = {
    HowLong: randomLength(),
    Turns: 0,


}

function randomLength () {
    return Math.floor(Math.random() * 10);
}

function turnsArray () {
    let array = ["Straight"];
    for (let turn = Course.HowLong; turn > 0; turn--) {
        let i = Math.random() * 3;
        let nextTurn = i < 1 ? "Straight" : (i<2? "Right":"Left");
        array.push(nextTurn)
    }
    Course.Turns = array;
    return "I worked!"
}

function getItStarted () {
    turnsArray();
    // console.log(Course.Turns)
    insertObstacles();
    console.log(Course.Turns)
    console.log('Welcome to the game!')

}

function insertObstacles () {
    for (let i = 0; i< Course.HowLong; i++) {
        let n = Math.random();
        console.log(n)
        if (n<0.25) {Course.Turns[i]="Obstacle"}
    }

}
// console.log((Course.HowLong))
// insertObstacles();
getItStarted();


console.log(Course.Turns);
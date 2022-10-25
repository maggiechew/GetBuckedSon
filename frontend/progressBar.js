// // let term = require("terminal-kit").terminal;

// import terminalkit from "terminal-kit";

// let term = terminalkit.terminal;

// let thingsToDo = [
//   "compiling course",
//   "obtaining donkey",
//   "feeding Math.random",
//   "getting asses in gear",
//   "are you ready?",
//   "LET'S GO!",
// ];
// let countDown = thingsToDo.length;

// let theBar = term.progressBar({
//   width: 80,
//   title: "Getting ready...",
//   eta: true,
//   percent: true,
//   items: thingsToDo.length,
// });

// function resetStartBar() {
//   thingsToDo = [
//     "compiling course",
//     "obtaining donkey",
//     "feeding Math.random",
//     "are you ready?",
//     "LET'S GO!",
//   ];

//   countDown = thingsToDo.length;
// }

// function startBar() {
//   if (!thingsToDo.length) {
//     return;
//   }

//   let task = thingsToDo.shift();

//   theBar.startItem(task);

//   // Finish the task in...
//   setTimeout(done.bind(null, task), 500 + Math.random() * 1200);

//   // Start another parallel task in...
//   setTimeout(startBar, 400 + Math.random() * 400);
// }

// function done(task) {
//   theBar.itemDone(task);
//   countDown--;

//   // Cleanup and exit
//   if (!countDown) {
//     setTimeout(function () {
//       term("\n");
//   // theBar.reset();

//       //   process.exit();
//     }, 200);
//   }
// }

// export { startBar };

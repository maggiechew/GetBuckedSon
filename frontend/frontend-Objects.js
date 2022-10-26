
import {clearConsoleAndScrollbackBuffer} from "./index.js"
import { mainMenu } from "./menus.js";
import readlineSync from "readline-sync";
import cfonts from 'cfonts';
import * as align from "@topcli/text-align";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// import { clearConsoleAndScrollbackBuffer } from '.';
const log = console.log;

let loserImage = `





                                            .!~!YY!^                      JBY7~.                    .~YGB^    
                                            :!Y^77P^.                    !@?7PBB5!:             ^?P##5G@7    
                                              5~  :~!!!^                  ?B^ .?#@&5^  !!^^  ^Y#@#Y! ~@B.    
                                              :57^.   .!J                  ~GP!..Y@@&5P&@@@P5@@P~   ?@G:     
                                                ~7?5?: .P                    !5GPJ&@@@@@@@@@@#~  ^JBB7     ---- HEEEEEEE HAWWWWWWWW....  
                                                    .7?J~                      .^Y##@@@@@&@@@P?5GGY~            YOU LOSE!!!!!!
                                                    J#^                        !BB  @@@&  #@@G^:            
                                                    #Y                       ..B@#@@@@@&#&&@@5              
                                                    5#.  .^!7JJJJ?!^.      :~::!7!?5B#&&GG@@@#.             
                                                      5#5B&@@@@@@@@@@#P7::^YB.   ~7!: .!Y&@@@@@Y             
                                                    ^5G55PGGPY?77JB@@@@@@@@J    .5? :!7~Y@@@@@&.            
                                                    ^!.    ;        ^P@@@@@@P:.:::~!7Y:^?#@@@@@#.            
                                                  .7      :          !&@@@@@5:J!:!7 :?!B@@@@@B~             
                                                  :!      ;           !@@@@@@J~!:^J!!5&@@@#5!               
                                                  .?      :            P@@@@@@#PPPG#@@@@G^.                 
                                                    ~~     :            Y@@@@@@@@@@@@@@B?.                   
                                                    !~      ;          :#@@@@@@@@@@@@Y^                      
                                                      ~7:   :         !#@@@@@@@@@@@@!                        
                                                      .!7:   :     ~P@@@@@@@@G&@@@Y                         
                                                        Y@G7.~^!?5#@@@@@@@@@7 G@@@~                         
                                                        :&@@@Y.!B@@@B7^^!@@@#  B@@&.                         
                                                        .&@@&^ !@@@@~   :&@@\\  B@@#.                         
                                                        B@@#.  !&@@P   .#@@^   J@@P                          
                                                        .#@@@7   :G@@G: .&@#:  Y@@G                          
                                                        5@@@B:    5@@&?:J@@&7 5@@@BY~                       
                                                        7&@@&P     J@@@&G5!~:  J@@@@&J                      
                                                          :^^:       ~JYYYJ.     :^^::.
                                                          
                                                          
                                                          `

let winnerImage = `
                                                                                                  :^^:
                                                                                                ?!.:^Y:
                                                                                                .:5JJ5^
                                                                              :7JJ?7^            J5YJ5?          :~7?J?!
                                                                            :PY?7?JYY!^:       Y5JJJYP~       ^?JJ??7JPJ
                                                                            ^G??55PYYYPJ      J5JJYYY55     :?YYYYYYY7Y5
                                                                              YYY555YY5G5J:   JYJYYYY55P?   !YY5Y?!!!P?P! 
                                                                              :5YPJ!!!!J5YY!^JP5YYYY5555G~:?YY57!!!!Y5PY^:
                                                                              :Y55?!!!!755Y^7JY5PPPP55YY?7P5Y!!!!!Y5P5YJJ?:
                                                                                ?55J!!!7JPPJ!^^^^^~~~^^^~?BY~!!!7Y55~.5YYPJ
                                                                                  !55Y?J5J75GPP5YYJJJJY55GG?YY!!J55J:..!!!~^
                                                                                  :?5GY777?PGPPPPPPPPPPGG?77JP55Y!
                                                                              ~?.^: YY777777YPGGPPPPGBGY77777?G7. 
                                                                              :JPJ.^P7777777??J5PGGGPJ???7777757.~:.: ------ HUZZAH!
                                                                                ^7^ !577777?GBYYY7JJ?75J5BP7777JJ.7Y?!
                                                                                    !577777?Y??J?!77!7JJ?JY?777JJ .JJ
                                                                        ^7?J^     .YJ!!!!!~^::^7!:^7!::^^~!!!!75:   
                                                                        7YJJ5Y:~777J?:::::::::..^^.:~:.:::::::::~5777~
                                                                        ?PJ7~?PP5Y5P:::::::::^7??7777??!::::::::.YPY5PP!
                                                                        :!. .G5YJ??P~::::::::^G#GY5PPB#J::::::::^5J?J5PP^:::
                                                                            YPYJ??YP7::::::::^?55P55Y!::::::::~55?JPYJY55Y^
                                                                              ?P5J??J5Y7~^:::::.::^^:..:::::^7J5Y??JPG??7~
                                                                              ^J55J??JYPYJ7!~^^^^^^^^^~!7?YPYJ??J55J^
                                                                                !PGP5JJGPYY5P5JJJJJJJY5P5YYBYYYYJ!:
                                                                                ~P55PPY5BJ7???YYJ????JJJ???75G~^~: 
                                                                              ?5JJY5PPGPY????J5PJ!!JPYJ????PG:.7Y?7
                                                                              :YPPPPPPG5P5YYYYPP5555P5YYYY5PG^..JJ: 
                                                                              :!?GGGGGPGPYJJJJJPJ???JYPYYYYJPB: :~7??!^
                                                                            !5J77JYPGYP5PYYYY5PP5YYYPP55555PP7?5YJ???5?
                                                                            :P!~~~~7?JGJJPJJJJJJPJJJJPJJJJJ5YJGY?!~~~~~P~
                                                                            ^P~~~~~~7?J?JP?????JP???JPJJJJJ5YJJ?7~~~~~~57 
                                                                          ^!GJ~~~~~!???JP?????JP???JPJJJJJ5Y???!~~~~~?G7^
                                                                          ^??JPY?777J555PP?????JP???JPJJJJJ5P555J777?YGY??^
                                                                          :~!?Y5555P5YYYPJ???JJP???YPYJJJJ55YY5P5555Y?!~:
                                                                              ::^~~!!!77?JJYYYY5YYYY5YYYYYJ77!!!~~^::
                                                                                            :::::::::::::
                                                                                            
                                                                                            `



let menu = ["Let's Play!", "Tutorial", "User Menu", "Credits"];

let turningLeft = `
                                         _____________________________________________________
                                        |    _______ _    _ _____  _   _ _____ _   _  _____   |
                                        |   |__   __| |  | |  __ \\| \\ | |_   _| \\ | |/ ____|  |
                                        |      | |  | |  | | |__) |  \\| | | | |  \\| | |  __   |
                                        |      | |  | |  | |  _  /| .   | | | | .   | | |_ |  |
                                        |      | |  | |__| | | \\ \\| |\\  |_| |_| |\\  | |__| |  |
                                        |      |_|   \\____/|_|  \\_\\_| \\_|_____|_| \\_|\\_____|  |
                                        |           | |    |  ____|  ____|__   __| |          |
                                        |           | |    | |__  | |__     | |  | |          |
                                        |           | |    |  __| |  __|    | |  | |          |
                                        |           | |____| |____| |       | |  |_|          |
                                        |           |______|______|_|       |_|  (_)          |
                                        |_____________________________________________________| `


let turningRight = `
                                         _____________________________________________________
                                        |    _______ _    _ _____  _   _ _____ _   _  _____   |
                                        |   |__   __| |  | |  __ \\| \\ | |_   _| \\ | |/ ____|  |
                                        |      | |  | |  | | |__) |  \\| | | | |  \\| | |  __   |
                                        |      | |  | |  | |  _  /| .   | | | | .   | | |_ |  |
                                        |      | |  | |__| | | \\ \\| |\\  |_| |_| |\\  | |__| |  |
                                        |      |_|   \\____/|_|  \\_\\_| \\_|_____|_| \\_|\\_____|  |
                                        |         |  __ \\|_   _/ ____| |  | |__   __| |       |      
                                        |         | |__) | | || |  __| |__| |  | |  | |       |     
                                        |         |  _  /  | || | |_ |  __  |  | |  | |       |     
                                        |         | | \\ \\ _| || |__| | |  | |  | |  |_|       |     
                                        |         |_|  \\_\\_____\\_____|_|  |_|  |_|  (_)       |     
                                        |_____________________________________________________|`

let leanedRight = `
                                         ---->      __         __ __    __   __     ___ 
                                          ----> |  |_  /\\ |\\ ||_ |  \\  |__)|/ _ |__| |  
                                         ---->  |__|__/--\\| \\||__|__/  | \\ |\\__)|  | |`

let leanedLeft = `
                                                    __ _     __ _        __ _____ <----
                                                |  |_ |_||\\||_ | \\   |  |_ |_  | <----
                                                |__|__| || ||__|_/   |__|__|   |  <----`
                                          
let wrong = `









                                            ██     ██ ██████   ██████  ███    ██  ██████  
                                            ██     ██ ██   ██ ██    ██ ████   ██ ██       
                                            ██  █  ██ ██████  ██    ██ ██ ██  ██ ██   ███ 
                                            ██ ███ ██ ██   ██ ██    ██ ██  ██ ██ ██    ██ 
                                              ███ ███  ██   ██  ██████  ██   ████  ██████  `





let correct = `


                                                                                  __  __
                                                  _________  _____________  _____/ /_/ /
                                                / ___/ __ \\/ ___/ ___/ _ \\/ ___/ __/ / 
                                                / /__/ /_/ / /  / /  /  __/ /__/ /_/_/  
                                                \\___/\\____/_/  /_/   \\___/\\___/\\__(_)   
                                        
`

async function credits() {
  clearConsoleAndScrollbackBuffer();
  cfonts.say(`WITH GRATITUDE`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  await console.retro(`\nWith my most profound appreciation, I would like to acknowledge the following people who helped make this game a success:\n\n` + chalk.magenta(`\nDanielle Barker`) + `, who gave me more than my fair share of her time and patience while I made dumb, obvious mistakes :D I appreciate you!!\n`)
  await console.retro(chalk.blueBright(`\nGreg Richardson`) + `, who was instrumental in helping me make my game playable at all!! Really couldn't have done this without you!\n`)
  await console.retro(chalk.green(`\nGreg Fenton`) +`, for his sage advice in our Feedback Protocol Session :)\n`)
  await console.retro(chalk.yellow(`\nGrimes`) + `, for giving me some awesome ideas on what to do next!\n`)
  await console.retro(`\n\nTo ALL my fellow ` + chalk.bgYellow.black(` C9 cohort learners `) + `, who were ALL such a huge part of my game being as good as it got!\n`)
  await console.retro(`\nA special shout-out to ` + chalk.cyan(`Vince`) + `, for all his help with the sound that I never even managed to get going... you are amazing!!\n`)
  await console.retro(`\nTo the Inception U team, `)
  await console.retro(chalk.red(`Cheryl, Carol, Margo, Greg H., Jen, Jan, Al`) + `, and literally ANYONE ELSE I forgot to include because I'm sick and it's 8 PM the night before this is due....
you are all amazing and I'm so grateful to you all!\n`)

  await console.retro(`\nI'd like to acknowledge the resources that supported the creation of this project... all the npm package makers, the programmers who came before me whose brilliance and generosity made my silly little game possible.\n`)

  await console.retro(`\nThis game was created in the traditional Treaty 7 territory, home of the Blackfoot confederacy (the ` + chalk.cyan(`Siksika, Kainai, Piikani, Îyâxe Nakoda and Tsuut'ina nations`) +`, in the place traditionally known as ` + chalk.yellow(`Moh'kinsstis`) + `.
This territory is also home to the ` + chalk.green(`Métis Nation of Alberta`) + `, Region 3.\n`)
  await console.retro(`\n\nFinally- and certainly not least of all- I would like to thank my husband, ` + chalk.magentaBright(`Brandon`) + `. Your patience and support has allowed me to spend day and night glued to my keyboard making a dumb game about riding a donkey, with you taking care of everything so I can focus on
doing my very best. You are my best friend, and I am so grateful for you, each and every single day.\n`)
  
 
  cfonts.say(`FIN`, {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["#FFBB33"], // define all colors
  });
  setTimeout(() => {
    console.log(chalk.blueBright('Press "M" to return to menu'))
    readlineSync
      .keyIn(
        '',
        { limit: "m" },
        { hideEchoback: true }
      )
      .toLowerCase();
    mainMenu();
  }, 1000);
}

// let credits = [
//   `\nWith my most profound appreciation, I would like to acknowledge the following people who helped make this game a success:`,
// chalk.magenta(`Danielle Barker`), `, who gave me more than my fair share of time and patience while I made dumb, obvious mistakes :D I appreciate you!!`]

// Greg Richardson, who was instrumental in helping me make my game playable at all!! Really couldn't have done this without you!

// Greg Fenton, for his sage advice in our Feedback Protocol Session :) 

// Grimes, for giving me some awesome ideas on what to do next!

// To ALL my fellow C9 cohort learners, who were ALL such a huge part of my game being as good as it got! 

// A special shout-out to Vince, for all his help with the sound that I never even managed to get going... you are amazing!!

// To the Inception U team, Cheryl, Carol, Margo, Greg H., Jen, Jan, Al, and literally ANYONE ELSE I forgot to include because
// I'm sick and it's 8 PM the night before this is due.... you are all amazing and I'm so grateful to you all!

// I'd like to acknowledge the resources that supported the creation of this project... all the npm package makers, the programmers who
// came before me whose brilliance and openness made my silly little game possible.

// This game was created in the traditional Treaty 7 territory, home of the Blackfoot confederacy (the Siksika, Kainai, Piikani, 
// Îyâxe Nakoda and Tsuut'ina nations), in the place traditionally known as Moh'kinsstis. 
// This territory is also home to the Métis Nation of Alberta, Region 3.

// Finally- and certainly not least of all- I would like to thank my husband, Brandon. Your patience and support has allowed me
// to spend day and night glued to my keyboard making a dumb game about riding a donkey, taking care of everything so I can
// do my very best. You are my best friend, and I am so grateful for you, each and every single day.

// FIN

// `






export { loserImage, winnerImage, menu, turningLeft, turningRight, leanedRight, leanedLeft, wrong, correct, credits}
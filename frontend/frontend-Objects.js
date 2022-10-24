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
       .7     :           !&@@@@@5:J!:!7 :?!B@@@@@B~             
       :!      ;           !@@@@@@J~!:^J!!5&@@@#5!               
       .?      :            P@@@@@@#PPPG#@@@@G^.                 
        ~~      :           Y@@@@@@@@@@@@@@B?.                   
         !~     ;          :#@@@@@@@@@@@@Y^                      
          ~7:    :        !#@@@@@@@@@@@@!                        
           .!7:   :     ~P@@@@@@@@G&@@@Y                         
             Y@G7.~^!?5#@@@@@@@@@7 G@@@~                         
            :&@@@Y.!B@@@B7^^!@@@#  B@@&.                         
            .&@@&^ !@@@@~   :&@@Y  B@@#.                         
             B@@#.  !&@@P   .#@@^  J@@P                          
            .#@@@7   :G@@G: .&@#:  Y@@G                          
             5@@@B:    5@@&?:J@@&7 5@@@BY~                       
             7&@@&P     J@@@&G5!~:  J@@@@&J                      
              :^^:       ~JYYYJ.     :^^::.`



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
                               :JPJ.^P7777777??J5PGGGPJ???7777757.~:.: ------ YOU WIN!!!!!!!!!
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
                                            :::::::::::::`

let welcomeImage = `

██████╗ ███████╗████████╗    ██████╗ ██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗        ███████╗ ██████╗ ███╗   ██╗██╗
██╔════╝ ██╔════╝╚══██╔══╝    ██╔══██╗██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗       ██╔════╝██╔═══██╗████╗  ██║██║
██║  ███╗█████╗     ██║       ██████╔╝██║   ██║██║     █████╔╝ █████╗  ██║  ██║       ███████╗██║   ██║██╔██╗ ██║██║
██║   ██║██╔══╝     ██║       ██╔══██╗██║   ██║██║     ██╔═██╗ ██╔══╝  ██║  ██║       ╚════██║██║   ██║██║╚██╗██║╚═╝
╚██████╔╝███████╗   ██║       ██████╔╝╚██████╔╝╚██████╗██║  ██╗███████╗██████╔╝▄█╗    ███████║╚██████╔╝██║ ╚████║██╗
 ╚═════╝ ╚══════╝   ╚═╝       ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝
                                                                                                                    
`


let tutorial = `Are you ready to GET BUCKED, SON????? :) 

Welcome to my game! Your mission- should you choose to accept it- is to STAY ON YOUR DONKEY!!
When your donkey leans left, you need to lean right!
When your donkey leans right, you need to lean left!
To lean left, press "A"... to lean right, press "D"
If you press the wrong key, or don't press it in time, you'll get BUCKED!

`
let menu = ["Let's Play!", "Tutorial", "User Menu", "Exit Game"];
// let userMenu = ["Let's Play!", "Tutorial", "Update Username", "Log Out", "Exit Game"];


export {loserImage, winnerImage, welcomeImage, tutorial, menu}
//                      funkcje :
// 1. functionFlag = sprawdzanie czy jest flaga zielona lub fioletowa i jeżeli jest zielona to przekierowywuje do funkcji ifGreenFlag a jeżeli fioletowa to ifVioletFlag inaczej uruchamia elseFunction.
// 2. ifGreenFlag = sprawdzanie czy jest przeciwnik i czy gotowa jest "wall-of-darkness" jeżeli tak to użyj "ściany ciemności" 
// 3. elseFunction = jeżeli ifGreen flag zwróci false to ta funkcja sprawia że hero. idzie na pozycję obok peasantów i używa funkcji attack .
// 4. attack = funkcja sprawdza czy jest przeciwnik i jeżeli jest to w wybrany sposób (w zależności od dystansu do przeciwnika i dostępności metod oprócz throw)atakuje.
// 5. ifVioletFlag = podobnie jak attack atakuje ale tylko throwem
// i jeżeli jest przeciwnik i throw jest gotowy to dopiero wtedy "rzuca".
// 6. while-true = tworzy zmienne i uruchamia funkcję functionFlag.
function ifVioletFlag(target){
 if(target && hero.isReady("throw") && hero.distanceTo(target) < 15){ 
    hero.throw(target);
}
}
function attack(target, flag) {
    if (target) {
        var distance = hero.distanceTo(target);
        if (hero.isReady("throw") && distance <= 15) {
            hero.throw(target);
        } else if (hero.isReady("punch") && distance < 5) {
            hero.punch(target);
        } else {
            hero.attack(target);
        }
    }
}
function ifGreenFlag(target, flag) {
if (target && hero.isReady("wall-of-darkness")) {
    
    hero.wallOfDarkness([
        {
            x: flag.pos.x,
            y: flag.pos.y
        },
        Vector(flag.pos.x, flag.pos.y +30),
        target.pos
    ]);
}
}
function elseFunction( target , flag) {
    hero.moveXY(30, 13);
    // hero.say("jestem obok was");
    attack(target, flag);
}
function functionFlag(target, flag) {
    // var black = hero.findFlag("black");
    var violet = hero.findFlag("violet");
    var green = hero.findFlag("green");
    if (flag) {   
        if (green) {
            ifGreenFlag(target, flag);
            hero.pickUpFlag(green);
        }
        if (violet){
         ifVioletFlag(target);
           hero.pickUpFlag(flag);
        }
    }
     else {
        elseFunction(target, flag);
    }
}
while (true) {
    // var flag = black + violet + green;
    var flag = hero.findFlag();
    var enemy = hero.findNearestEnemy();
    functionFlag(enemy, flag);
}

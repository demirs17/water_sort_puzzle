const readline = require('node:readline/promises');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var gameArea = {
    bottleCount: 12,
    bottles: [],
    filledBottles: [],
    emptyBottles: [],
    waters: [],
    bottleCapacity: 4,
};




class Stack{
    constructor(array){
        this.stack = array;
    }
    push(data){
        if(this.stack.length < gameArea.bottleCapacity){
            this.stack.push(data);
        }
    }
    pop(){
        return this.stack.pop();
    }
    peek(){
        return this.stack[this.stack.length - 1];
    }
    peekAsType(){
        var peek = this.stack[this.stack.length - 1];
        var arr = [peek];
        // console.log(this.stack , "peek:", this.peek());
        for(var i = this.size() - 1 - 1;i>=0;i--){
            // console.log("index: ", i, " için bakılıyor");
            if(this.stack[i] == peek){
                // console.log("stack[i] ", " eklendi");
                arr.push(this.stack[i]);
            }else{
                // console.log("break;");
                break;
            }
        }
        return arr;
    }
    size(){
        return this.stack.length;
    }
    isEmpty(){
        return this.stack.length === 0;
    }
}


// gameArea.bottles.forEach((item) => console.log(item.peekAsType()));


setWaterTypes();
fillAtStart();


prettyPrint();

start();


async function start(){
    var bitir = false;
    while(!bitir){
// gameArea.bottles.forEach((item) => {
//     // console.log(item.peekAsType());
//     // console.log("*************************");

// });
        var bottle1 = await rl.question("?");
        var bottle2 = await rl.question("?");
        if(bottle1 === "bitir" || bottle2 === "bitir"){bitir = true;break;}
        if(bottle1 >= 0 && bottle1 < gameArea.bottleCount && bottle2 >= 0 && bottle2 < gameArea.bottleCount){
            bottle1 = gameArea.bottles[bottle1];
            bottle2 = gameArea.bottles[bottle2];
            if(bottle2.peek() == bottle1.peek() || bottle2.peek() === undefined){

                if(gameArea.bottleCapacity - bottle2.size() >= bottle1.peekAsType().length){
                    console.log("peekAsType returns: ", bottle1.peekAsType());
                    // console.log("length: ", bottle1.peekAsType().length);
                    var len = bottle1.peekAsType().length;
                    for(var i = 0;i<len;i++){
                        // console.log("i: ", i);
                        bottle2.push(bottle1.pop());
                        
                    }
                    
                }
            }
            // if(bottle2.peek() == bottle1.peekAsType() || bottle2.peek() === undefined){
            // }
            prettyPrint();
        }
    }
    rl.close();
}





function setWaterTypes(){
    // şişe sayısından iki eksik su çeşidi
    for(var i = 0;i<gameArea.bottleCount - 2;i++){
        gameArea.waters.push(i);
    }
}
function fillAtStart(){
    //hangi çeşit sudan daha önce kaç tane kullanılmış tutmak için
    var filledWatersByIndex = new Array(gameArea.bottleCount - 2).fill().map(() => 0);
    
    for(var i = 0;i<gameArea.bottleCount - 2;i++){
        var arr = [];
        while (arr.length < gameArea.bottleCapacity) {
            var random = Math.floor(Math.random() * (gameArea.bottleCount - 2)/** water types-colors*/);
            // console.log("a : ", arr.length);
            if(filledWatersByIndex[random] < gameArea.bottleCapacity){
                // console.log("b");
                arr.push(random);
                filledWatersByIndex[random]++;
            }
        }

        gameArea.bottles.push(new Stack(arr));
    }
    // 2 tane boş şişe
    for(var i = 0;i<2;i++){
        gameArea.bottles.push(new Stack([]));
    }
}
function prettyPrint(){
    // console.log(gameArea.bottles);

    console.log("0   1   2   3   4   5   6   7   8   9  10  11");
    for(var i = gameArea.bottleCapacity - 1;i>=0;i--){
        // console.log("i: ", i);
        var row = "";
        for(var j = 0;j<gameArea.bottles.length;j++){
            row += gameArea.bottles[j].stack[i] ?? ".";
            row += " | ";
        }
        console.log(row);
    }
}


class Game {
    constructor(createElement){
        this.player = null;
        this.createElement = createElement;
    }

    start(){
        this.player = new Player();
        this.createElement("player"); //create a dom element with the class "player"
    }

    movePlayer(direction){
        if(direction === "left"){
            this.player.moveLeft();
        } else if (direction === "right"){
            this.player.moveRight();
        }
    }
}


class Player {
    constructor() {
        this.positionX = 0;
    }

    moveLeft() {
        this.positionX--;
        console.log(`moving left... ${this.positionX}`)
        
    }

    moveRight() {
        this.positionX++;
        console.log(`moving right... ${this.positionX}`)
    }
}



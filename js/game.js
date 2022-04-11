console.log("hello world!");
/*
info:
 - position
functionality:
- moveLeft()
- moveRight()
*/

class Game {
  constructor(create, draw) {
    this.player = null;
    this.create = create;
    this.draw = draw;
    this.obstacleArr = [];
    this.bonusArr = [];
    this.shootArr =[];
    this.timer = 0;
    this.intervalId = this.intervalId
    this.run = false
  }

      start() {
        this.player = new Player();
        this.player.domElement = this.create("player");
        this.draw(this.player);
        this.displayLife();
        this.displayLScore();
      }

      runGame(){
        this.intervalId = setInterval(() => {
            this.obstacleArr.forEach((obstacle) => {
            obstacle.moveDown();
            this.draw(obstacle);
            this.detectCollision(obstacle);
            this.deleteObstacle(obstacle);

          });
    
          if (this.timer % 5 === 0) {
             const newObstacle = new Obstacle();
                    newObstacle.domElement = this.create("obstacle");
                    this.obstacleArr.push(newObstacle);
          }

            this.bonusArr.forEach((bonus) => {
            bonus.moveDown();
            this.draw(bonus);
            this.detectBonus(bonus);
            this.deleteObstacle(bonus);

          });
    
          if (this.timer % 300 === 0) {
             const newBonus = new Bonus();
                    newBonus.domElement = this.create("bonus");
                    this.bonusArr.push(newBonus);
          }
            this.timer++   
        }, 100)
      }

  movePlayer(direction) {
    if (direction === "left" && this.player.positionX > 0) {
      this.player.moveLeft();
      console.log("we moved to the left");
    } else if (direction === "right" && this.player.positionX < 95) {
      this.player.moveRight();
      console.log("we moved to the right");
    }
    this.draw(this.player);
  }

  detectCollision(obstacle,bonus) {
    if (this.player.positionX < obstacle.positionX + obstacle.width &&
        this.player.positionX + this.player.width > obstacle.positionX &&
        this.player.positionY < obstacle.positionY + obstacle.height &&
        this.player.height + this.player.positionY > obstacle.positionY) {
            this.obstacleArr.splice(this.obstacleArr.indexOf(obstacle),1);
            obstacle.domElement.remove();            
            this.player.life--
            this.displayLife()
            this.gameOver();
        }
    }
  
  detectBonus(bonus){
    if (this.player.positionX < bonus.positionX + bonus.width &&
        this.player.positionX + this.player.width > bonus.positionX &&
        this.player.positionY < bonus.positionY + bonus.height &&
        this.player.height + this.player.positionY > bonus.positionY) {
            this.bonusArr.splice(this.bonusArr.indexOf(bonus),1);
            bonus.domElement.remove();            
            this.player.life++
            this.displayLife()
        }
  }

  deleteObstacle(obstacle){
    if(obstacle.positionY === 0){
        this.obstacleArr.splice(this.obstacleArr.indexOf(obstacle),1);
        obstacle.domElement.remove();
        }
    }

displayLife(){
    document.getElementById('life').textContent = this.player.life;
}

displayLScore(){
    document.getElementById('score').textContent = this.player.score;
}

pauseGame(){
clearInterval(this.intervalId);
}

gameOver(){
    if (this.player.life === 0){
        clearInterval(this.intervalId)
        setTimeout(()=> {
            alert("game over");
            location.reload();
            this.runGame();
        },300)
    }
}

weaponShoot(){
    this.shootArr.forEach((shoot) => {
        shoot.moveUp();
        this.draw(shoot);
        //this.detectBonus(shoot);
        this.deleteObstacle(shoot);

      });

      if (this.timer % 250 === 3) {
         const newShoot = new Shoot();
                newShoot.domElement = this.create("shoot");
                this.shootArr.push(newShoot);
      }
}

}

class Player {
  constructor(positionX,positionY) {
    this.positionX = 50;
    this.positionY = 0;
    this.domElement = null;
    this.width = 5;
    this.height = 5;
    this.life = 3;
    this.score = 0;
  }

  moveLeft() {
    this.positionX--;
  }

  moveRight() {
    this.positionX++;
  }
}

class Obstacle {
  constructor() {
    this.positionX = Math.floor(Math.random() * 100); // if we want the obstacles to be random this needs to be a random number
    this.positionY = 97;
    this.domElement = null;
    this.width = Math.floor(5 + Math.random() * 5);
    this.height = 5;
  }

  moveDown() {
    this.positionY--;
  }
}

class Bonus {
    constructor() {
        this.positionX = Math.floor(Math.random() * 100); // if we want the obstacles to be random this needs to be a random number
        this.positionY = 97;
        this.domElement = null;
        this.width = 5;
        this.height = 5;
    }

    moveDown() {
        this.positionY--;
    }
}

class Shoot extends Player{
    constructor(positionX,positionY) {
        super();
        this.domElement = null;
        this.width = 1;
        this.height = 1;
      }
    
    moveUp() {
        this.positionY++;
    }
}
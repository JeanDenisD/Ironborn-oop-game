


function createDomElement(className){
    const board = document.getElementById("board");
    const newElm = document.createElement("div");
    newElm.className = className;

    board.appendChild(newElm);
}


const game = new Game(createDomElement);
game.start();


document.addEventListener("keydown", function(event){
    console.log(event)
    switch(event.key){
        case "ArrowRight":
            game.movePlayer("right");
            break;
        case "ArrowLeft":
            game.movePlayer("left");
            break;
    }
});
const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

import('./menu.js')
  .then((module) => {
    const menu = new module.Menu();
    menu.update();
  })
  .catch((error) => {
    console.error(error);
  });

const menuScreen = new Menu();

var options = {
    mode: 'static',
    color: 'grey',
    maxNumberOfNipples: 0,
    zone: document.getElementById('joystick-area'),
    position: {left: '89%', top: '95%'},
};

let backgroundImg = new Image();
backgroundImg.src = "assets/img/canvas-background.png";

function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

class Vector
{
    constructor(x, y)
    {
    this.x = x;
    this.y = y;
    }   
}

let playerMoveVector = new Vector(0,0);

let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);

let gamerInput = new GamerInput("None"); //No Input

function clickableDpadReleased() {
    console.log(event);
}
function clickDpadYellow(){
    console.log(event);

}
function clickDpadBlue(){
    console.log(event);
}
function clickDpadRed(){
    console.log(event);
}
function clickDpadGreen(){
    console.log(event);
}
let yellowButton = document.getElementsByClassName("yellow")[0];
let blueButton = document.getElementsByClassName("blue")[0];
let redButton = document.getElementsByClassName("red")[0];
let greenButton = document.getElementsByClassName("green")[0];



var dynamic = nipplejs.create(options);

dynamic.on('start', function (evt, nipple) {
    //nipple.on('start move end dir plain', function (evt) {
        console.log(options.maxNumberOfNipples);
    //move mario not just vertically and horizontally
     nipple.on('move', function (evt, data) {
        
        playerMoveVector.x = data.vector.x;
        playerMoveVector.y = data.vector.y;
     });

     nipple.on('end', function (evt, data) {

        playerMoveVector.x = 0;
        playerMoveVector.y = 0;
     });
});

function input(event) {
        if (event.type === "keydown") {
        switch (event.keyCode) {
            case 65: // A Key// blue
                blueButton.classList.add("pressed");
                break; 
            case 87: // W Key // yellow
                yellowButton.classList.add("pressed");            
                break; 
            case 68: // D Key // red
                redButton.classList.add("pressed");   
                break; 
            case 83: // S Key // green
                greenButton.classList.add("pressed");
                break; 

            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        //gamerInput = new GamerInput("None");
        redButton.classList.remove("pressed");
        blueButton.classList.remove("pressed");
        yellowButton.classList.remove("pressed");
        greenButton.classList.remove("pressed");
        gamerInput = new GamerInput("None"); //No Input
    }
}


function update() {

    menuScreen.update();
    // console.log("Update");
    // Check Input
    if (gamerInput.action === "Up") {
        console.log("Move Up");
        player.y -= 5; // Move Player Up      
    } 
    if (gamerInput.action === "Down") {
        console.log("Move Down");
        player.y += 5; // Move Player Down
    } 
     if (gamerInput.action === "Left") {
        console.log("Move Left");
        player.x -= 5; // Move Player Left
    } 
     if (gamerInput.action === "Right") {
        console.log("Move Right");
        player.x += 5; // Move Player Right
    }
             
    //update other objects
    checkBounds();
}

function draw() {
    context.clearRect(0,0, canvas.width, canvas.height);
    menuScreen.draw()
   
}

function gameloop() {
    update();
    animate();
    draw();
    
    window.requestAnimationFrame(gameloop);
}

window.requestAnimationFrame(gameloop);

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);
const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

let frameTimeLimit = 14;

const screenStates = Object.freeze({ 
    MenuState: 0,
    GamePlayState: 1,
    InventoryState: 2,
  });

let currentScreenState = screenStates.GamePlayState;

class MenuScreen
{
    update()
    {
        //console.log("Update from Menu");
    };
    draw()
    {
        context.font = "80px serif";
        context.fillText("MenuScreen",context.canvas.width - (context.canvas.width / 2), context.canvas.height - (context.canvas.height / 2));
    };
}

let playerImg = new Image();
playerImg.src = "assets/img/detective.png";

let playerObject = new GameObject(playerImg, 300, 100, 100, 150);
class Player{
    constructor(playerImg, playerObject)
    {
        this.playerImg = playerImg;
        this.playerObject = playerObject;
        this.playerFrameTimer = 0;
        this.playerXFrame = 0;
        this.playerYFrame = 0;
        this.playerScale = 1;
    }
    drawPlayer()
    {
        //context.drawImage(this.playerObject.spritesheet,this.playerObject.x,this.playerObject.y);
        let playerWidth = 48;
        let playerHeight = 64;
        let playerScaledWidth = this.playerScale * playerWidth;
        let playerScaledHeight = this.playerScale * playerHeight;
        player.width = playerScaledWidth;
        player.height = playerScaledHeight;

    context.drawImage(playerObject.spritesheet,
        this.playerXFrame * playerWidth, this.playerYFrame * playerHeight, playerWidth, playerHeight,
        playerObject.x, playerObject.y, playerScaledWidth, playerScaledHeight);
    }
    animatePlayer()
    {
        playerFrameTimer+= 1;
        if(playerFrameTimer > frameTimeLimit)
        {
            playerFrameTimer = 0;
            playerXFrame += 1;
            if(playerXFrame > 4)
            {
                playerXFrame = 0;
            }
        }

        if(playerMovingRight)
        {
            playerYFrame = 0;
        }
        if(playerMovingLeft)
        {
            playerYFrame = 1;
        }
        if(playerIdle)
        {
            playerYFrame = 0;
            playerXFrame = 1;
        }
    }
}

let player = new Player(playerImg,playerObject);

class GamePlayScreen
{
    update()
    {
        if (gamerInput.action === "Up") {
            console.log("Move Up");
            playerObject.y -= 5; // Move Player Up      
        } 
        if (gamerInput.action === "Down") {
            console.log("Move Down");
            playerObject.y += 5; // Move Player Down
        } 
         if (gamerInput.action === "Left") {
            console.log("Move Left");
            playerObject.x -= 5; // Move Player Left
        } 
         if (gamerInput.action === "Right") {
            console.log("Move Right");
            playerObject.x += 5; // Move Player Right
        }

        playerObject.x += playerMoveVector.x;
        playerObject.y -= playerMoveVector.y;
    };
    draw()
    {
        context.drawImage(backgroundImg,0,0,context.canvas.width,context.canvas.height);
        player.drawPlayer();
    };
}
class InventoryScreen
{
    update()
    {
        //console.log("Update from Inventory");
    };
    draw()
    {

    };
}

const menuScreen = new MenuScreen();
const gameplayScreen = new GamePlayScreen();
const inventoryScreen = new InventoryScreen();



var options = {
    mode: 'static',
    color: 'grey',
    maxNumberOfNipples: 0,
    zone: document.getElementById('joystick-area'),
    position: {left: '89%', top: '95%'},
};

let backgroundImg = new Image();
backgroundImg.src = "assets/img/groundFloor.png";



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
                //blueButton.classList.add("pressed");
                gamerInput = new GamerInput("Left");  
                break; 
            case 87: // W Key // yellow
                //yellowButton.classList.add("pressed"); 
                gamerInput = new GamerInput("Up");           
                break; 
            case 68: // D Key // red
                //redButton.classList.add("pressed");
                gamerInput = new GamerInput("Right");     
                break; 
            case 83: // S Key // green
                //qgreenButton.classList.add("pressed");
                gamerInput = new GamerInput("Down");  
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
    switch(currentScreenState)
    {
        case screenStates.MenuState:
            menuScreen.update();
            break;
        case screenStates.GamePlayState:
            gameplayScreen.update();
            break;
        case screenStates.InventoryState:
            inventoryScreen.update();
            break;
    }        
}

function draw() {
    context.clearRect(0,0, canvas.width, canvas.height);

    switch(currentScreenState)
    {
        case screenStates.MenuState:
            menuScreen.draw();
            break;
        case screenStates.GamePlayState:
            gameplayScreen.draw();
            break;
        case screenStates.InventoryState:
            inventoryScreen.draw();
            break;
    }
}

function gameloop() {
    update();
    draw();
    
    window.requestAnimationFrame(gameloop);
}

window.requestAnimationFrame(gameloop);

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);
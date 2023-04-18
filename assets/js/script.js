const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

class Grid
{
    constructor()
    {
        this.grid;
        this.tileWidth = 0;
        this.tileWidth = 0;
        this.rows = 0;
        this.collums = 0;
        this.numOfTiles = 0;
    }
    setUpGrid(canvasWidth,canvasHeight,collums,rows)
    {
        this.rows = rows;
        this.collums = collums;

        this.numOfTiles = rows * collums;

        this.tileWidth = canvasWidth / collums;
        this.tileHeight = canvasHeight / rows;

        this.grid = [0,0,0,1,1,1,0,0,0,
                    0,0,0,1,1,1,0,0,0,
                    0,0,0,1,1,1,0,0,0,
                    0,0,0,1,1,1,0,0,0,
                    1,0,0,0,0,0,0,0,1,
                    1,0,0,0,0,0,0,0,1
                    ]; //grid set up from image
    }
}

const screenStates = Object.freeze({ 
    MenuState: 0,
    GamePlayState: 1,
    InventoryState: 2,
  });

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

function GamePlayArea(area)
{
    this.area = area; //held as string
}

class CollisionManager
{
    checkCollision(areaType)
    {
        switch(areaType)
        {
            case AREA_TYPES.NOTE_ROOM:

                break;

            case AREA_TYPES.SINK_ROOM:

                break;

            case AREA_TYPES.TILED_ROOM:
                
                break;

            default:
                break;
        }
    }
    checkAreaCollision(gridArea)
    {
        for(let i = 0; i < gridArea.numOfTiles; i++)
        {
            if(gridArea.grid[i] == 1)
            {
                let tileRow = i / gridArea.collums;
                let tileCol = i % gridArea.collums;

                let tileXPos = tileCol * gridArea.tileWidth;
                let tileYPos = tileRow * gridArea.tileHeight;

                // console.log("Row: " + tileRow);
                // console.log("Col: " + tileCol);

                // console.log("X: " + tileXPos);
                // console.log("Y: " + tileYPos);

                let collisionTile = new GameObject(playerImg,tileXPos,tileYPos,gridArea.tileWidth,gridArea.tileHeight);
                

                if(this.checkCollision(player.playerObject,collisionTile))
                {
                    return true;
                }
            }
        }
    }
    getTileRect(index)
    {
        
    }
    
    checkCollision(object1, object2)
    {
    let xOverlap = false;
    let yOverlap = false;


     xOverlap = valueInRange(object1.x,object2.x, object2.x + object2.width) || valueInRange(object2.x,object1.x, object1.x + object1.width);
     yOverlap = valueInRange(object1.y,object2.y, object2.y + object2.height) || valueInRange(object2.y,object1.y, object1.y + object1.height);
    
    
     return xOverlap && yOverlap;
    }

    
}

function valueInRange(value, min, max)
{
        return (value>=min) && (value <= max);
}

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

class GamePlayScreen
{
    update()
    {
        if (gamerInput[INPUT_TYPES.UP].action === "Up") {
            playerObject.y -= 5; // Move Player Up      
        } 
        if (gamerInput[INPUT_TYPES.DOWN].action === "Down") {
            playerObject.y += 5; // Move Player Down
        } 
         if (gamerInput[INPUT_TYPES.LEFT].action === "Left") {
            playerObject.x -= 5; // Move Player Left
        } 
         if (gamerInput[INPUT_TYPES.RIGHT].action === "Right") {
            playerObject.x += 5; // Move Player Right
        }
        if(collisionManger.checkAreaCollision(tileGridArea))
        {
            console.log("Collision");
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

var options = {
    mode: 'static',
    color: 'grey',
    maxNumberOfNipples: 0,
    zone: document.getElementById('joystick-area'),
    position: {left: '87.5%', top: '47.5%'},
};

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

//Instances
let tileGridArea = new Grid();
tileGridArea.setUpGrid(context.canvas.width,context.canvas.height,9,6);

let collisionManger = new CollisionManager();

const menuScreen = new MenuScreen();
const gameplayScreen = new GamePlayScreen();
const inventoryScreen = new InventoryScreen();
let currentScreenState = screenStates.GamePlayState;

let frameTimeLimit = 14;

let backgroundImg = new Image();
backgroundImg.src = "assets/img/groundFloor.png";
let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);

const AREA_TYPES = Object.freeze({ 
    SINK_ROOM: "sinkRoom",
    NOTE_ROOM: "noteRoom",
    TILED_ROOM: "tiledRoom",
  }); //different game areas
  
let currentGameArea = new GamePlayArea(AREA_TYPES.SINK_ROOM);


let numberOfInputs = 4;
const INPUT_TYPES = Object.freeze({ 
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
  }); //WASD

  let gamerInput = [
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None")
];

//Player
let playerImg = new Image();
playerImg.src = "assets/img/detective.png";
let playerObject = new GameObject(playerImg, 300, 100, 100, 150);
let player = new Player(playerImg,playerObject);
let playerMoveVector = new Vector(0,0);

//HTML/CSS Buttons
let yellowButton = document.getElementsByClassName("yellow")[0];
let blueButton = document.getElementsByClassName("blue")[0];
let redButton = document.getElementsByClassName("red")[0];
let greenButton = document.getElementsByClassName("green")[0];

//Joystick
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

//Related functions

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

function input(event) {
        if (event.type === "keydown") {
            checkKeyDown(event);
        }
        if (event.type === "keyup") {
            checkKeyUp(event);
        }
}

function checkKeyDown(event)
{
    if(event.keyCode == 87)
    {
        //yellowButton.classList.add("pressed"); 
        gamerInput[INPUT_TYPES.UP] = new GamerInput("Up"); 
    }
    if(event.keyCode == 65)
    {
        //blueButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.LEFT] = new GamerInput("Left"); 
    }
    if(event.keyCode == 83)
    {
        //qgreenButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.DOWN] = new GamerInput("Down"); 
    }
    if(event.keyCode == 68)
    {
        //redButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.RIGHT] = new GamerInput("Right");
    }
}

function checkKeyUp(event)
{
    //gamerInput = new GamerInput("None");
    redButton.classList.remove("pressed");
    blueButton.classList.remove("pressed");
    yellowButton.classList.remove("pressed");
    greenButton.classList.remove("pressed");

    if(event.keyCode == 87)
    {
        //yellowButton.classList.add("pressed"); 
        gamerInput[INPUT_TYPES.UP] = new GamerInput("None"); 
    }
    if(event.keyCode == 65)
    {
        //blueButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.LEFT] = new GamerInput("None"); 
    }
    if(event.keyCode == 83)
    {
        //qgreenButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.DOWN] = new GamerInput("None"); 
    }
    if(event.keyCode == 68)
    {
        //redButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.RIGHT] = new GamerInput("None");
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
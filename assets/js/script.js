const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

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

class GamePlayScreen
{
    update()
    {
        if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
        {
            if (gamerInput[INPUT_TYPES.UP].action === "Up") {
                player.playerPreviousPosition.y = playerObject.y;
                playerObject.y -= 5; // Move Player Up      
            } 
            if (gamerInput[INPUT_TYPES.DOWN].action === "Down") {
                player.playerPreviousPosition.y = playerObject.y;
                playerObject.y += 5; // Move Player Down
            } 
             if (gamerInput[INPUT_TYPES.LEFT].action === "Left") {
                player.playerPreviousPosition.x = playerObject.x;
                playerObject.x -= 5; // Move Player Left
            } 
             if (gamerInput[INPUT_TYPES.RIGHT].action === "Right") {
                player.playerPreviousPosition.x = playerObject.x;
                playerObject.x += 5; // Move Player Right
            }
        }
        if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
        {
            player.playerPreviousPosition.x = playerObject.x;
            player.playerPreviousPosition.y = playerObject.y;
            playerObject.x += playerMoveVector.x;
            playerObject.y -= playerMoveVector.y;
        }

        if(collisionManger.checkRoomCollision(currentGameArea.area))
        {
            playerObject.x = player.playerPreviousPosition.x;
            playerObject.y = player.playerPreviousPosition.y;
        }
        if(player.checkPlayerBounds())
        {
            playerObject.x = player.playerPreviousPosition.x;
            playerObject.y = player.playerPreviousPosition.y;
        }
        
        
    };
    draw()
    {
        context.drawImage(backgroundImg,0,0,context.canvas.width,context.canvas.height);
        player.drawPlayer();
        

         for(let i = 0; i < tileGridArea.numOfTiles; i++)
         {
                 let tileRow = Math.trunc(i / noteGridArea.collums);
                 let tileCol = Math.trunc(i % noteGridArea.collums);

                 let tileXPos = tileCol * noteGridArea.tileWidth;
                 let tileYPos = tileRow * noteGridArea.tileHeight;

                 collisionTile = new GameObject(backgroundImg,tileXPos,tileYPos,noteGridArea.tileWidth,noteGridArea.tileHeight);

                 context.drawImage(collisionTile.spritesheet,tileXPos,tileYPos,50,50);
         }
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



//Instances
const menuScreen = new MenuScreen();
const gameplayScreen = new GamePlayScreen();
const inventoryScreen = new InventoryScreen();
let currentScreenState = screenStates.GamePlayState;

let frameTimeLimit = 14;

let backgroundImg = new Image();
backgroundImg.src = "assets/img/noteRoom.png";
let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);
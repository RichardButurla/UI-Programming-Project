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
            if (gamerInput[INPUT_TYPES.SPACE].action === "SpaceUp") {
                console.log("sapce");
                if(atAreaExit)
                {
                    collisionManger.changeGrid(areaExitCell);
                    console.log("x:" + areaEnterancePos.x);
                    console.log("y" + areaEnterancePos.y);
                    player.playerPreviousPosition.x = areaEnterancePos.x;
                    player.playerPreviousPosition.y = areaEnterancePos.y;
                    playerObject.x = areaEnterancePos.x;
                    playerObject.y = areaEnterancePos.y;
                    console.log("Player x:" + player.playerPreviousPosition.x);
                    console.log("Player y" + player.playerPreviousPosition.y);
                }
                gamerInput[INPUT_TYPES.SPACE] = new GamerInput("None"); 

            }
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
        if(collisionManger.checkAreaCollision())
        {
            console.log("collision");
            playerObject.x = player.playerPreviousPosition.x;
            playerObject.y = player.playerPreviousPosition.y;
        }
        if(player.checkPlayerBounds())
        {
            playerObject.x = player.playerPreviousPosition.x;
            playerObject.y = player.playerPreviousPosition.y;
        }
        if(collisionManger.atAreaExit())
        {
            atAreaExit = true;
        }
        else{
            atAreaExit = false;
        }
       
        
        
    };
    draw()
    {
        context.drawImage(backgroundImg,0,0,context.canvas.width,context.canvas.height);
        player.drawPlayer();
        

         for(let i = 0; i < currentGridArea.numOfTiles; i++)
         {
                 let tileRow = Math.trunc(i / currentGridArea.collums);
                 let tileCol = Math.trunc(i % currentGridArea.collums);

                 let tileXPos = tileCol * currentGridArea.tileWidth;
                 let tileYPos = tileRow * currentGridArea.tileHeight;

                 collisionTile = new GameObject(backgroundImg,tileXPos,tileYPos,currentGridArea.tileWidth,currentGridArea.tileHeight);

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

let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);
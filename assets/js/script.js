const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

const screenStates = Object.freeze({ 
    MenuState: 0,
    GamePlayState: 1,
    InventoryState: 2,
    ClueInspectState: 3
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
            if (gamerInput[INPUT_TYPES.E].action === "E-Up") {
                if(interactAvailable)
                {
                    console.log("swapped to CLUE");
                    currentScreenState = screenStates.ClueInspectState;
                }
                gamerInput[INPUT_TYPES.E] = new GamerInput("None");
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
        switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                noteRoomScreen.update();
                break;
            case AREA_TYPES.SINK_ROOM:
                sinkRoomScreen.update();
                break;
            case AREA_TYPES.TILED_ROOM:
                tileRoomScreen.update();
                break;
            case AREA_TYPES.HALL_ROOM:
                hallWayScreen.update();
                break;
        }
        
        
        
    };
    draw()
    {
        context.drawImage(backgroundImg,0,0,context.canvas.width,context.canvas.height);
        player.drawPlayer();
        if(atAreaExit)
        {
            let imagePos = new Vector();
            imagePos = collisionManger.getCellPos(areaExitId);
            context.drawImage(enterAreaButtonImage,imagePos.x,imagePos.y,enterAreaButtonImageWidth,enterAreaButtonImageHeight);
        }
        
        //  for(let i = 0; i < currentGridArea.numOfTiles; i++)
        //  {
        //          let tileRow = Math.trunc(i / currentGridArea.collums);
        //          let tileCol = Math.trunc(i % currentGridArea.collums);

        //          let tileXPos = tileCol * currentGridArea.tileWidth;
        //          let tileYPos = tileRow * currentGridArea.tileHeight;

        //          collisionTile = new GameObject(backgroundImg,tileXPos,tileYPos,currentGridArea.tileWidth,currentGridArea.tileHeight);

        //          context.drawImage(collisionTile.spritesheet,tileXPos,tileYPos,50,50);
        //  }

         switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                noteRoomScreen.draw();
                break;
            case AREA_TYPES.SINK_ROOM:
                sinkRoomScreen.draw();
                break;
            case AREA_TYPES.TILED_ROOM:
                tileRoomScreen.draw();
                break;
            case AREA_TYPES.HALL_ROOM:
                hallWayScreen.draw();
                break;
        }
    };
}

class ClueInspectScreen
{
    update()
    {
        if (gamerInput[INPUT_TYPES.E].action === "E-Up") 
        {
            console.log("swapped to game");
            currentScreenState = screenStates.GamePlayState;
        }
        gamerInput[INPUT_TYPES.E] = new GamerInput("None");
    }
    draw()
    {
        context.drawImage(clueInspectBackgroundImg,0,0,context.canvas.width,context.canvas.height);
        let clueInfoText = "";
        let textLines = [];
        switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                clueInfoText = noteRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                textLines = correctTextLength(clueInfoText);     
                break;
            case AREA_TYPES.SINK_ROOM:
                clueInfoText = sinkRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                textLines = correctTextLength(clueInfoText);
                break;
            case AREA_TYPES.TILED_ROOM:
                clueInfoText = tileRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                textLines = correctTextLength(clueInfoText);
                break;
            case AREA_TYPES.HALL_ROOM:
                clueInfoText = hallWayScreen.cluesArray[interactableClueIndex].clueDetail;
                textLines = correctTextLength(clueInfoText);
                break;
        }
        context.font = "30px serif";
        for(let i = 0; i < textLines.length; i++)
        {
            context.fillText(textLines[i],270, context.canvas.height - 100 - (30 * (textLines.length - 1)) + (50 * i));
        }
        
    }
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
        case screenStates.ClueInspectState:
            clueDetailScreen.update();
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
        case screenStates.ClueInspectState:
            clueDetailScreen.draw();
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
const clueDetailScreen = new ClueInspectScreen();
console.log(hallGridArea.grid[0]);
console.log(hallGridArea.numOfTiles);
const noteRoomScreen = new NoteRoomScreen(setUpClueLocations(noteGridArea));
const sinkRoomScreen = new SinkRoomScreen(setUpClueLocations(sinkGridArea));
const tileRoomScreen = new TileRoomScreen(setUpClueLocations(tileGridArea));
const hallWayScreen = new HallWayScreen(hallGridArea);

setUpClueDialogue(noteRoomScreen.cluesArray);
setUpClueDialogue(sinkRoomScreen.cluesArray);
setUpClueDialogue(tileRoomScreen.cluesArray);

let currentScreenState = screenStates.GamePlayState;

let frameTimeLimit = 14;

let clueInspectBackgroundImg = new Image();
clueInspectBackgroundImg.src = "assets/img/clueInspect.png"

let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);


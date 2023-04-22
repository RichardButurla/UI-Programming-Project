const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

const screenStates = Object.freeze({ 
    MenuState: 0,
    GamePlayState: 1,
    InventoryState: 2,
    ClueInspectState: 3,
    DialogueState: 4,
    NotesInspection: 5
  });

let notesTextArray = [];

class NotesScreen
{
    
    update()
    {
        if (gamerInput[INPUT_TYPES.Q].action === "Q-Up") {
            currentScreenState = screenStates.GamePlayState;
            gamerInput[INPUT_TYPES.Q] = new GamerInput("None");
        }

        console.log("updating noteScreen");
    }
    draw()
    {
        context.font = "30px serif";
        context.drawImage(blackBackground,0,0,context.canvas.width,context.canvas.height);
        context.drawImage(notePageImage,0,0,context.canvas.width,context.canvas.height);
        console.log(notesTextArray.length);
        for(let i = 0; i < notesTextArray.length; i++)
        {
            context.fillText(notesTextArray[i],230, 110  + (46 * i));
        }
    }
}

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
                if(interactableClueAvailable)
                {
                    console.log("swapped to CLUE");
                    currentScreenState = screenStates.ClueInspectState;
                }
                if(interactableNPCAvailable)
                {
                    currentScreenState = screenStates.DialogueState;
                }
                gamerInput[INPUT_TYPES.E] = new GamerInput("None");
            }
            if (gamerInput[INPUT_TYPES.Q].action === "Q-Up") {
                currentScreenState = screenStates.NotesInspection;
                console.log("NoteScreen")
                gamerInput[INPUT_TYPES.Q] = new GamerInput("None");
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
        //Background
        context.drawImage(clueInspectBackgroundImg,0,0,context.canvas.width,context.canvas.height);

        //Text
        let clueInfoText = "";
        let clueImageSrc = "";
        let textLines = [];
        switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                clueInfoText = noteRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = noteRoomScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText); 
                
                if(interactableClueIndex != markedClueValues[0][interactableClueIndex])
                {
                    markedClueValues[0][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        addClueToNotes(textLines[i]);
                    }               
                }
                break;
            case AREA_TYPES.SINK_ROOM:
                clueInfoText = sinkRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = sinkRoomScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText);

                if(interactableClueIndex != markedClueValues[1][interactableClueIndex])
                {
                    markedClueValues[1][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        addClueToNotes(textLines[i]);
                    } 
                }
                break;
            case AREA_TYPES.TILED_ROOM:
                clueInfoText = tileRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = tileRoomScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText);

                if(interactableClueIndex != markedClueValues[2][interactableClueIndex])
                {
                    markedClueValues[2][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        addClueToNotes(textLines[i]);
                    } 
                }
                break;
            case AREA_TYPES.HALL_ROOM:
                clueInfoText = hallWayScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = hallWayScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText);

                if(interactableClueIndex != markedClueValues[3][interactableClueIndex])
                {
                    markedClueValues[3][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        addClueToNotes(textLines[i]);
                    } 
                }
                break;
        }
        context.font = "30px serif";
        for(let i = 0; i < textLines.length; i++)
        {
            context.fillText(textLines[i],270, context.canvas.height - 100 - (30 * (textLines.length - 1)) + (50 * i));
        }

        //Clue image
        clueDetailImg.src = clueImageSrc;
        context.drawImage(clueDetailImg,context.canvas.width - context.canvas.width / 1.66 ,context.canvas.height / 6.1, 210 ,192);
        
    }
}

class DialogueScreen
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
        let npcInfoText = "";
        let npcImageSrc = "";

        context.drawImage(blackBackground,0,0,context.canvas.width,context.canvas.height);
        
        switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                npcInfoText = noteRoomScreen.npc.npcDialogue;
                npcImageSrc = noteRoomScreen.npc.npcObject.spritesheet;
                break;
            case AREA_TYPES.SINK_ROOM:

                break;
            case AREA_TYPES.TILED_ROOM:

                break;
            case AREA_TYPES.HALL_ROOM:
                npcInfoText = hallWayScreen.npc.npcDialogue;
                npcImageSrc = hallWayScreen.npc.npcObject.spritesheet;
                break;
        }
        context.font = "30px serif";
        context.drawImage(npcImageSrc,75 ,100, context.canvas.width - 150,600);
        context.drawImage(dialogueBoxImage,75 ,context.canvas.height / 1.5, context.canvas.width - 150,192);
        context.fillText(npcInfoText,270, context.canvas.height - 150);

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
        case screenStates.NotesInspection:
            notesScreen.update();
            break;
        case screenStates.DialogueState:
            dialgueScreen.update();
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
        case screenStates.DialogueState:
            dialgueScreen.draw();
            break;
        case screenStates.NotesInspection:
            notesScreen.draw();
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

function addClueToNotes(string)
{
    notesTextArray.push(string);   
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
const dialgueScreen = new DialogueScreen();
const notesScreen = new NotesScreen();
console.log(hallGridArea.grid[0]);
console.log(hallGridArea.numOfTiles);
npcImg.src = npcImageFiles[0];
const noteRoomScreen = new NoteRoomScreen(setUpClueLocations(noteGridArea),setUpNPCLocations(noteGridArea,npcImg));
const sinkRoomScreen = new SinkRoomScreen(setUpClueLocations(sinkGridArea));
const tileRoomScreen = new TileRoomScreen(setUpClueLocations(tileGridArea));
let npcImg2 = new Image();
npcImg2.src = npcImageFiles[1];
const hallWayScreen = new HallWayScreen(hallGridArea,setUpNPCLocations(noteGridArea,npcImg2));

setUpClueDetails(noteRoomScreen.cluesArray);
setUpClueDetails(sinkRoomScreen.cluesArray);
setUpClueDetails(tileRoomScreen.cluesArray);

setUpNpcDetails(noteRoomScreen.npc);
setUpNpcDetails(hallWayScreen.npc);

let currentScreenState = screenStates.GamePlayState;

let frameTimeLimit = 14;

let clueInspectBackgroundImg = new Image();
clueInspectBackgroundImg.src = "assets/img/clueInspect.png"

let blackBackground = new Image();
blackBackground.src = "assets/img/blackScreen.png";

let dialogueBoxImage = new Image();
dialogueBoxImage.src = "assets/img/textBar.png"

let clueDetailImg = new Image();

let notePageImage = new Image();
notePageImage.src = "assets/img/notePage.png"

let markedClueValues = [
    [-1,-1,-1],
    [-1],
    [-1],
    [-1]
]

let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);


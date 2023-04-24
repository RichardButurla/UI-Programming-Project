const canvas = document.getElementById("the_canvas");
const context = canvas.getContext("2d");

const screenStates = Object.freeze({ 
    MenuState: 0,
    GamePlayState: 1,
    InventoryState: 2,
    ClueInspectState: 3,
    DialogueState: 4,
    NotesInspection: 5,
    SuspectInspection: 6,
    EndScreen: 7
  });


const storedArrayString = localStorage.getItem('notes');
// Parse the string back into an array
const storedArray = JSON.parse(storedArrayString);


let notesTextArray = storedArray;
let textArray = [];

let gulitySuspect = 3;
let selectedSuspect = 0; //used to index thorugh y pos array for positioning;
let confirmPopUp = false;

class EndScreen
{
    constructor()
    {
        this.endText = "";
    }
    update()
    {
        if(selectedSuspect == 2)
        {
            this.endText = "Suspect was Guilty!";
        }
        else{
            this.endText = "Suspect was Innocent!";
        }
    }
    draw()
    {
        context.font = "30px serif";
        context.drawImage(blackBackground,0,0,context.canvas.width,context.canvas.height);
        context.drawImage(dialogueBoxImage,context.canvas.width - context.canvas.width / 1.35,context.canvas.height - context.canvas.height / 1.5,context.canvas.width - context.canvas.width / 2,300);
        context.drawImage(dialogueBoxImage,context.canvas.width - context.canvas.width / 1.25,0,600,100);
        context.fillText(this.endText,context.canvas.width - (context.canvas.width / 1.65), context.canvas.height - (context.canvas.height / 2.2));
        context.font = "40px serif";
        context.fillText("Game Over",context.canvas.width - (context.canvas.width / 1.70), 55);
    }
}

class SuspectInspectScreen
{
    constructor()
    {
        this.keyboardInstructionTextArray = [
            "Press Space to accuse,",
            "Scroll between suspects with W/S keys,",
            "Press 'A' key for Note Screen "
        ];
        this.joystickInstructionTextArray = [
            "Press A to accuse,",
            "Scroll between suspects with Stick-Up/Down,",
            "Left-Stick-Scroll: Note Screen"
        ];
        this.keyboardConfirmTextArray = [
            "Are you sure you want to accuse this suspect ",
             "Space - Yes",
             "Esc - No"
        ];
        this.joystickConfirmTextArray = [
            "Are you sure you want to accuse this suspect ",
             "A - Yes",
             "B - No"
        ]
        this.suspectInfo1 = ["Relation: Relative", "Alibi: Visiting ", "Possible Motive: Family Issues?" ];
        this.suspectInfo2 = ["Relation: None ", "Alibi: Passerby", "Possible Motive: Unknown"];
        this.suspectInfo3 = ["Relation: Business Partner", "Alibi: Meetings", "Possible Motive: Profits?"];
        this.suspectInfos = [3];

        this.suspectInfos[0] = this.suspectInfo1;
        this.suspectInfos[1] = this.suspectInfo2;
        this.suspectInfos[2] = this.suspectInfo3;   
        
    }
    update()
    {
        if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
        {
            if(!confirmPopUp)
            {
                //Swapping bewtten Note/this screen
                if (gamerInput[INPUT_TYPES.LEFT].action === "Left") 
                {
                    console.log("swapped to game");
                    selectedSuspect = 0
                    currentScreenState = screenStates.NotesInspection;
                    gamerInput[INPUT_TYPES.LEFT] = new GamerInput("None");
                }
                if (gamerInput[INPUT_TYPES.Q].action === "Q-Up") 
                {
                    console.log("swapped to game");
                    currentScreenState = screenStates.GamePlayState;
                    selectedSuspect = 0;
                    gamerInput[INPUT_TYPES.Q] = new GamerInput("None");
                }

            //Suspect select
                if (gamerInput[INPUT_TYPES.UP].action === "Up") {
                    if(selectedSuspect > 0)
                    {
                        selectedSuspect--;
                    }
                    
                    gamerInput[INPUT_TYPES.UP] = new GamerInput("None");
                }
                if (gamerInput[INPUT_TYPES.DOWN].action === "Down") {
                    if(selectedSuspect < 2)
                    {
                        selectedSuspect++;
                    }
                    gamerInput[INPUT_TYPES.DOWN] = new GamerInput("None");
                }
                if (gamerInput[INPUT_TYPES.SPACE].action === "SpaceUp") {
                    if(talkedToSuspect[selectedSuspect])
                    {
                        confirmPopUp = true;
                        console.log("selected suspect");
                        
                    }
                    gamerInput[INPUT_TYPES.SPACE] = new GamerInput("None");
                }

            }
            
            
            console.log(confirmPopUp);
            //Confirm PopUp
            if(confirmPopUp)
            {
                if(gamerInput[INPUT_TYPES.ESCAPE].action === ("Esc-Up")){
                    confirmPopUp = false;
                    
                }
                if (gamerInput[INPUT_TYPES.SPACE].action === "SpaceUp") {
                    console.log("accused suspect" + selectedSuspect);
                    currentScreenState = screenStates.EndScreen;
                }
            }
            gamerInput[INPUT_TYPES.ESCAPE] = new GamerInput("None");

        }
        if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
        {
            if(!confirmPopUp)
            {
                if (gamerInput[INPUT_TYPES.B_BUTTON].action === "B-Button-Up") 
                {
                    console.log("swapped to game");
                    selectedSuspect = 0;
                    currentScreenState = screenStates.GamePlayState;
                    gamerInput[INPUT_TYPES.B_BUTTON] = new GamerInput("None");
                }
                if (gamerInput[INPUT_TYPES.A_BUTTON].action === "A-Button-Up") 
                {
                    if(talkedToSuspect[selectedSuspect])
                    {
                        confirmPopUp = true;
                        console.log("selected suspect");   
                    }
                    gamerInput[INPUT_TYPES.A_BUTTON] = new GamerInput("None");
                }
                if(joystickInteractVector.x < -0.5)
                {
                    selectedSuspect = 0;
                    currentScreenState = screenStates.NotesInspection;
                }
                if(joystickUpwardSelect == true)
                {
                    if(selectedSuspect > 0)
                        {
                            selectedSuspect--;
                        }
                    joystickUpwardSelect = false;
                }
                if(joystickDownwardSelect == true)
                {
                    if(selectedSuspect < 2)
                    {
                        selectedSuspect++;
                    }
                    joystickDownwardSelect = false;
                }
            }
            if(confirmPopUp)
            {
                if (gamerInput[INPUT_TYPES.B_BUTTON].action === "B-Button-Up") 
                {
                    confirmPopUp = false;
                    gamerInput[INPUT_TYPES.B_BUTTON] = new GamerInput("None");
                }
                if (gamerInput[INPUT_TYPES.A_BUTTON].action === "A-Button-Up") 
                {
                    console.log("accused suspect" + selectedSuspect);
                    currentScreenState = screenStates.EndScreen;
                    gamerInput[INPUT_TYPES.A_BUTTON] = new GamerInput("None");
                }
            }
        }
    }
    draw()
    {
        let suspectImgXPos = 590;
        let susepctImgYPositions = [95,248,407];
        let maxCharsPerLine = 43;
        
        
        context.drawImage(suspectListBackground,0,0,context.canvas.width,context.canvas.height);
        //Scarf guy
        context.font = "35px serif";
        context.fillText("Suspect List",context.canvas.width - context.canvas.width / 1.73, 50) ;
        context.font = "26px serif";

        if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
        {
            for(let i = 0; i < this.keyboardInstructionTextArray.length; i++)
            {
                context.fillText(this.keyboardInstructionTextArray[i],context.canvas.width - context.canvas.width / 1.25, 640 + (30 * i));
            }
        }
        if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
        {
            for(let i = 0; i < this.joystickInstructionTextArray.length; i++)
            {
                context.fillText(this.joystickInstructionTextArray[i],context.canvas.width - context.canvas.width / 1.25, 640 + (30 * i));
            }
        }

        context.font = "17px serif";

        if(talkedToSuspect[0])
        {
            context.drawImage(suspectImg1,suspectImgXPos ,susepctImgYPositions[0], 100,135);

            for(let i = 0; i < this.suspectInfos[0].length; i++)
            {
                context.fillText(this.suspectInfos[0][i],350, 150 + (30 * i));
            }
        }
        else{
            context.drawImage(suspectUnknownImage,suspectImgXPos ,susepctImgYPositions[0], 100,135);      
        }
        if(talkedToSuspect[1])
        {
            context.drawImage(suspectImg2,suspectImgXPos ,susepctImgYPositions[1] + 5, 100,135);

            for(let i = 0; i < this.suspectInfos[1].length; i++)
            {
                context.fillText(this.suspectInfos[1][i],350, 300 + (30 * i));
            }  
            
        }
        else{
            context.drawImage(suspectUnknownImage,suspectImgXPos ,susepctImgYPositions[1], 100,135);      
        }
        if(talkedToSuspect[2])
        {
            context.drawImage(suspectImg3,suspectImgXPos ,susepctImgYPositions[2] + 5, 100,135);      

            for(let i = 0; i < this.suspectInfos[2].length; i++)
            {
                context.fillText(this.suspectInfos[2][i],350, 450 + (30 * i));
            }     
        }
        else{
            context.drawImage(suspectUnknownImage,suspectImgXPos ,susepctImgYPositions[2], 100,135);      
        }
        
        
        context.drawImage(redBorder,suspectImgXPos - 1 ,susepctImgYPositions[selectedSuspect], 105,140);

        if(confirmPopUp)
        {
            context.font = "35px serif";
            context.drawImage(dialogueBoxImage,context.canvas.width - context.canvas.width / 1.05,context.canvas.height - context.canvas.height / 1.35 ,900,300);

            if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
            {
                for(let i = 0; i < this.keyboardConfirmTextArray.length; i++)
                {
                    context.fillText(this.keyboardConfirmTextArray[i],context.canvas.width - context.canvas.width / 1.2, 300 + (50 * i));
                }
            }
            if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
            {
                for(let i = 0; i < this.joystickConfirmTextArray.length; i++)
                {
                    context.fillText(this.joystickConfirmTextArray[i],context.canvas.width - context.canvas.width / 1.2, 300 + (50 * i));
                }
            }
            
        }

    }
}

class NotesScreen
{
    constructor()
    {
        this.keyboardNotesInstructions = [
            "Collection of information on clues.",
            "D Key: Suspect screen",
            "Q Key: Exit"
        ]
        this.joystickNotesInstructions = [
            "Collection of information on clues.",
            "Right-Stick-Scroll: Suspect Screen",
            "B-Button: Exit"
        ]
    }
    update()
    {
        if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
        {
            if (gamerInput[INPUT_TYPES.Q].action === "Q-Up") {
                currentScreenState = screenStates.GamePlayState;
                gamerInput[INPUT_TYPES.Q] = new GamerInput("None");
            }
            if (gamerInput[INPUT_TYPES.RIGHT].action === "Right") 
        {
            console.log("swapped to game");
            currentScreenState = screenStates.SuspectInspection;
            gamerInput[INPUT_TYPES.RIGHT] = new GamerInput("None");
        }
        }
        if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
        {
            if (gamerInput[INPUT_TYPES.B_BUTTON].action === "B-Button-Up") 
            {
                console.log("swapped to game");
                currentScreenState = screenStates.GamePlayState;
                gamerInput[INPUT_TYPES.B_BUTTON] = new GamerInput("None");
            }
            if(joystickInteractVector.x > 0.8)
            {
                currentScreenState = screenStates.SuspectInspection;
            }
            
        }
        
        
        
        console.log("updating noteScreen");
    }
    draw()
    {
        context.font = "35px serif";
        context.drawImage(blackBackground,0,0,context.canvas.width,context.canvas.height);
        context.drawImage(notePageImage,40,0,context.canvas.width - 100,context.canvas.height - 100);
        context.drawImage(dialogueBoxImage,context.canvas.width - context.canvas.width / 1.15,context.canvas.height - context.canvas.height / 4,750,175);

        context.drawImage(dialogueBoxImage,context.canvas.width - context.canvas.width / 1.55,10,290,60);

        context.fillText("Notes Screen",423, 52);
        context.font = "26px serif";
        if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
        {
            for(let i = 0; i < this.keyboardNotesInstructions.length; i++)
            {
                context.fillText(this.keyboardNotesInstructions[i],203, 642  + (30 * i));
            }
        }
        if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
        {
            for(let i = 0; i < this.joystickNotesInstructions.length; i++)
            {
                context.fillText(this.joystickNotesInstructions[i],203, 642  + (30 * i));
            }
        }
        for(let i = 0; i < notesTextArray.length; i++)
        {
            context.fillText(notesTextArray[i],230, 95  + (40 * i));
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
        
        player.animatePlayer();

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
                playerMovingRight = false;
                playerMovingLeft = false;
                playerIdle = false;
                playerMovingDown = false;
                playerMovingUp = true;
                playerObject.y -= 5; // Move Player Up    
                moved = true;  
            } 
            if (gamerInput[INPUT_TYPES.DOWN].action === "Down") {
                playerMovingRight = false;
                playerMovingLeft = false;
                playerIdle = false;
                playerMovingDown = true;
                playerMovingUp = false;
                player.playerPreviousPosition.y = playerObject.y;
                playerObject.y += 5; // Move Player Down
                moved = true;
            } 
             if (gamerInput[INPUT_TYPES.LEFT].action === "Left") {
                playerMovingRight = false;
                playerMovingLeft = true;
                playerIdle = false;
                playerMovingDown = false;
                playerMovingUp = false;
                player.playerPreviousPosition.x = playerObject.x;
                playerObject.x -= 5; // Move Player Left
                moved = true;
            } 
             if (gamerInput[INPUT_TYPES.RIGHT].action === "Right") {
                playerMovingRight = true;
                playerMovingLeft = false;
                playerIdle = false;
                playerMovingDown = false;
                playerMovingUp = false;
                player.playerPreviousPosition.x = playerObject.x;
                playerObject.x += 5; // Move Player Right
                moved = true;
            }
            if(gamerInput[INPUT_TYPES.RIGHT].action === "None" && gamerInput[INPUT_TYPES.LEFT].action === "None" 
            && gamerInput[INPUT_TYPES.UP].action === "None" && gamerInput[INPUT_TYPES.DOWN].action === "None")
            {
                playerIdle = true;
                playerMovingLeft = false;
                playerMovingRight = false;
                moved = false;
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
            if (gamerInput[INPUT_TYPES.A_BUTTON].action === "A-Button-Up")
            {
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
                gamerInput[INPUT_TYPES.A_BUTTON] = new GamerInput("None"); 

            }
            if (gamerInput[INPUT_TYPES.X_BUTTON].action === "X-Button-Up") {
                if(interactableClueAvailable)
                {
                    console.log("swapped to CLUE");
                    currentScreenState = screenStates.ClueInspectState;
                }
                if(interactableNPCAvailable)
                {
                    currentScreenState = screenStates.DialogueState;
                }
                gamerInput[INPUT_TYPES.X_BUTTON] = new GamerInput("None");
            }
            if (gamerInput[INPUT_TYPES.Y_BUTTON].action === "Y-Button-Up") {
                currentScreenState = screenStates.NotesInspection;
                console.log("NoteScreen")
                gamerInput[INPUT_TYPES.Y_BUTTON] = new GamerInput("None");
            }

            player.playerPreviousPosition.x = playerObject.x;
            player.playerPreviousPosition.y = playerObject.y;
            playerObject.x += playerMoveVector.x * playerSpeed;
            playerObject.y -= playerMoveVector.y * playerSpeed;
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
        
        if(moved)
        {
            playerXPos = playerObject.x;
            playerYPos = playerObject.y;
            localStorage.setItem("player.x", playerXPos);
            localStorage.setItem("player.y", playerYPos);
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
            if(currentControls == CONTROLS_TYPE.JOYSTICK_BUTTONS)
            enterAreaButtonImage.src = "assets/img/Xbox One/XboxOne_A.png";
            else if(currentControls == CONTROLS_TYPE.MOUSE_KEYBOARD)
            enterAreaButtonImage.src = "assets/img/Keyboard & Mouse/Dark/Space_Key_Dark.png";
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
        if (gamerInput[INPUT_TYPES.B_BUTTON].action === "B-Button-Up") 
        {
            console.log("swapped to game");
            currentScreenState = screenStates.GamePlayState;
        }
        gamerInput[INPUT_TYPES.E] = new GamerInput("None");
        gamerInput[INPUT_TYPES.B_BUTTON] = new GamerInput("None");
    }
    draw()
    {
        //Background
        context.drawImage(clueInspectBackgroundImg,0,0,context.canvas.width,context.canvas.height);

        //Text
        let clueInfoText = "";
        let clueImageSrc = "";
        let textLines = [];
        let maxCharsPerLine = 48;
        switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                clueInfoText = noteRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = noteRoomScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText,maxCharsPerLine); 
                
                if(interactableClueIndex != markedClueValues[0][interactableClueIndex])
                {
                    markedClueValues[0][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        if(i == 0 )
                            addClueToNotes("• " + textLines[i]);
                        else
                        addClueToNotes(textLines[i]);
                    }               
                }
                break;
            case AREA_TYPES.SINK_ROOM:
                clueInfoText = sinkRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = sinkRoomScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText,maxCharsPerLine);

                if(interactableClueIndex != markedClueValues[1][interactableClueIndex])
                {
                    markedClueValues[1][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        if(i == 0 )
                            addClueToNotes("• " + textLines[i]);
                        else
                        addClueToNotes(textLines[i]);
                    }
                }
                break;
            case AREA_TYPES.TILED_ROOM:
                clueInfoText = tileRoomScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = tileRoomScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText,maxCharsPerLine);

                if(interactableClueIndex != markedClueValues[2][interactableClueIndex])
                {
                    markedClueValues[2][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        if(i == 0 )
                            addClueToNotes("• " + textLines[i]);
                        else
                        addClueToNotes(textLines[i]);
                    }
                }
                break;
            case AREA_TYPES.HALL_ROOM:
                clueInfoText = hallWayScreen.cluesArray[interactableClueIndex].clueDetail;
                clueImageSrc = hallWayScreen.cluesArray[interactableClueIndex].clueSrcImage;
                textLines = correctTextLength(clueInfoText,maxCharsPerLine);

                if(interactableClueIndex != markedClueValues[3][interactableClueIndex])
                {
                    markedClueValues[3][interactableClueIndex] = interactableClueIndex;
                    for(let i = 0; i < textLines.length; i++)
                    {
                        if(i == 0 )
                            addClueToNotes("• " + textLines[i]);
                        else
                        addClueToNotes(textLines[i]);
                    }
                }
                break;
        }
        context.font = "30px serif";
        for(let i = 0; i < textLines.length; i++)
        {
            context.fillText(textLines[i],230, context.canvas.height - 100 - (30 * (textLines.length - 1)) + (40 * i));
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
        if (gamerInput[INPUT_TYPES.B_BUTTON].action === "B-Button-Up") 
        {
            console.log("swapped to game");
            currentScreenState = screenStates.GamePlayState;
        }
        gamerInput[INPUT_TYPES.E] = new GamerInput("None");
        gamerInput[INPUT_TYPES.B_BUTTON] = new GamerInput("None");
    }
    draw()
    {
        let npcInfoText = "";
        let npcImageSrc = "";
        let npcInfoArray = [];
        let maxCharsPerLine = 60;

        context.drawImage(blackBackground,0,0,context.canvas.width,context.canvas.height);
        
        switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                npcInfoText = noteRoomScreen.npc.npcDialogue;
                npcImageSrc = noteRoomScreen.npc.npcObject.spritesheet;
                talkedToSuspect[0] = true;
                break;
            case AREA_TYPES.SINK_ROOM:

                break;
            case AREA_TYPES.TILED_ROOM:
                npcInfoText = tileRoomScreen.npc.npcDialogue;
                npcImageSrc = tileRoomScreen.npc.npcObject.spritesheet;
                talkedToSuspect[2] = true;
                break;
            case AREA_TYPES.HALL_ROOM:
                npcInfoText = hallWayScreen.npc.npcDialogue;
                npcImageSrc = hallWayScreen.npc.npcObject.spritesheet;
                talkedToSuspect[1] = true;
                break;
        }
        npcInfoArray = correctTextLength(npcInfoText,maxCharsPerLine);
        localStorage.setItem('npcsInteracted',JSON.stringify(talkedToSuspect));
        context.font = "30px serif";
        context.drawImage(npcImageSrc,75 ,100, context.canvas.width - 150,600);
        context.drawImage(dialogueBoxImage,75 ,context.canvas.height / 1.5, context.canvas.width - 150,192);
        for(let i = 0; i < npcInfoArray.length; i++)
        {
            context.fillText(npcInfoArray[i],150, context.canvas.height - 200 + (30 * i));
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
        case screenStates.NotesInspection:
            notesScreen.update();
            break;
        case screenStates.SuspectInspection:
            suspectScreen.update();
            break;
        case screenStates.DialogueState:
            dialgueScreen.update();
            break;
        case screenStates.InventoryState:
            inventoryScreen.update();
            break;
        case screenStates.EndScreen:
            endScreen.update();
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
        case screenStates.SuspectInspection:
            suspectScreen.draw();
            break;
        case screenStates.EndScreen:
            endScreen.draw();
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
    localStorage.setItem('notes', JSON.stringify(notesTextArray));
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
const suspectScreen = new SuspectInspectScreen();
const endScreen = new EndScreen();


npcImg.src = npcImageFiles[0];

let npcImg3 = new Image();
npcImg3.src = npcImageFiles[2];

const noteRoomScreen = new NoteRoomScreen(setUpClueLocations(noteGridArea),setUpNPCLocations(noteGridArea,npcImg));
const sinkRoomScreen = new SinkRoomScreen(setUpClueLocations(sinkGridArea));
const tileRoomScreen = new TileRoomScreen(setUpClueLocations(tileGridArea),setUpNPCLocations(tileGridArea,npcImg3));
let npcImg2 = new Image();
npcImg2.src = npcImageFiles[1];
const hallWayScreen = new HallWayScreen(hallGridArea,setUpNPCLocations(hallGridArea,npcImg2));

setUpClueDetails(noteRoomScreen.cluesArray);
setUpClueDetails(sinkRoomScreen.cluesArray);
setUpClueDetails(tileRoomScreen.cluesArray);

setUpNpcDetails(noteRoomScreen.npc);
setUpNpcDetails(hallWayScreen.npc);
setUpNpcDetails(tileRoomScreen.npc);

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

let suspectListBackground = new Image();
suspectListBackground.src = "assets/img/suspectListBackground.png"

let suspectUnknownImage = new Image();
suspectUnknownImage.src = "assets/img/questionMark.png"

let suspectImg1 = new Image();
suspectImg1.src = "assets/img/scarfFaceGuy.png"
let suspectImg2 = new Image();
suspectImg2.src = "assets/img/weirdGuyFace.png"
let suspectImg3 = new Image();
suspectImg3.src = "assets/img/poshFrogFace.png"

let redBorder = new Image();
redBorder.src = "assets/img/redBorder.png"

const npcsInteractedString = localStorage.getItem('npcsInteracted');
const npcsInteracted = npcsInteractedString ? JSON.parse(npcsInteractedString) : [];

let talkedToSuspect = npcsInteracted;

let markedClueValues = [
    [-1,-1,-1],
    [-1],
    [-1],
    [-1]
]

let background = new GameObject(backgroundImg,0,0,context.canvas.width,context.canvas.height);


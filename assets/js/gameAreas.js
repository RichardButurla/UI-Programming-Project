let interactableClueAvailable = false;
let interactableClueIndex =  - 1;

let interactableNPCAvailable = false;

function withinRange(object1,object2)
{
    let range = 100;
    let xOrigin1 = object1.x + object1.width;
    let xOrigin2 = object2.x + object2.height;
    let yOrigin1 = object1.y + object1.width;
    let yOrigin2 = object2.y + object2.height;

    let xDistance = (xOrigin1 - xOrigin2 ) *  (xOrigin1 - xOrigin2 );
    let yDistance = (yOrigin1 - yOrigin2) * (yOrigin1 - yOrigin2);
     if(Math.sqrt( xDistance  + yDistance) < range)
     {
         return true;
     }
}
class NoteRoomScreen{
    constructor(cluesArray,npc)
    {
        this.cluesArray = cluesArray;
        this.npc = npc;
        this.npc.npcObject.spritesheet.src = npcImageFiles[0];
    }
    update()
    {
        
    };
    draw()
    {
        interactableClueIndex = checkInteractAvailable(this.cluesArray);
        if(interactableClueIndex != -1)
        {
            interactableClueAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactableClueAvailable = false;
        }

        if(checkNPCInteractAvailable(this.npc))
        {
            interactableNPCAvailable = true;

            let shiftedClueXPos = this.npc.npcObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.npc.npcObject.y - interactButtonHeight / 1.5;
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactableNPCAvailable = false;
        }
        
        for(let i = 0; i < this.cluesArray.length; i++)
        {
            this.cluesArray[i].drawClue();
        }
        this.npc.drawNPC();
    };
    

}
class SinkRoomScreen{
    constructor(cluesArray)
    {
        this.cluesArray = cluesArray;
    }
    update()
    {

    };
    draw()
    {
        interactableClueIndex = checkInteractAvailable(this.cluesArray);
        if(interactableClueIndex != -1)
        {
            interactableClueAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactableClueAvailable = false;
        }

        for(let i = 0; i < this.cluesArray.length; i++)
        {
            this.cluesArray[i].drawClue();
        }
    };
}
class TileRoomScreen{
    constructor(cluesArray)
    {
        this.cluesArray = cluesArray;
    }
    update()
    {      
        
    };
    draw()
    {
        interactableClueIndex = checkInteractAvailable(this.cluesArray);
        if(interactableClueIndex != -1)
        {
            interactableClueAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactableClueAvailable = false;
        }

        for(let i = 0; i < this.cluesArray.length; i++)
        {
            this.cluesArray[i].drawClue();
        }
    };
    
}
class HallWayScreen {
    constructor(gridArea,npc) {
        this.cluesArray = setUpClueLocations(gridArea);
        this.npc = npc;
    }
  
    update() {

    }
  
    draw() {
         checkInteractAvailable(this.cluesArray);
        if(interactableClueIndex != -1)
        {
            interactableClueAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactableClueAvailable = false;
        }

        if(checkNPCInteractAvailable(this.npc))
        {
            interactableNPCAvailable = true;

            let shiftedClueXPos = this.npc.npcObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.npc.npcObject.y - interactButtonHeight / 1.5;
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactableNPCAvailable = false;
        }

      for (let i = 0; i < this.cluesArray.length; i++)
       {
        this.cluesArray[i].drawClue();
        }
        this.npc.drawNPC();
    }
  }


function checkInteractAvailable(cluesArray) //returns index of clue that is in range
{
    for(let i = 0; i < cluesArray.length; i++)
    {
        if(withinRange(player.playerObject,cluesArray[i].clueObject))
        {          
            return i;
        }
        
    }
    return -1;
};

function checkNPCInteractAvailable(npc)
{
        if(withinRange(player.playerObject,npc.npcObject))
        {          
            return true;
        }
        else{
            return false;
        }
}

  function setUpClueLocations(gridArea) {
    let numOfClues = 0;
    let cluesArray = [];
    console.log("cell amount" + gridArea.numOfTiles)
    for (let j = 0; j < gridArea.numOfTiles; j++) {
      if (gridArea.grid[j] == 7) {
        
        let tileRow = Math.trunc(j / gridArea.collums);
        let tileCol = Math.trunc(j % gridArea.collums);
  
        let tileXPos = tileCol * gridArea.tileWidth;
        let tileYPos = tileRow * gridArea.tileHeight;
  
        let clueObject = new GameObject(clueImg, tileXPos, tileYPos, 50, 50);
        cluesArray[numOfClues] = new ClueInteractable(clueImg, clueObject);
        numOfClues++;
      }
    }
    console.log("Clue Num: " + numOfClues);
    return cluesArray;
  }
  function setUpClueDetails(cluesArray)
  {
    for(let i = 0; i < cluesArray.length; i++)
    {
        cluesArray[i].clueDetail = clueDetails[clueDialogueIndex];
        cluesArray[i].clueSrcImage = clueImageFiles[clueDialogueIndex];
        clueDialogueIndex++;
        console.log(cluesArray[i].clueDetail);
    }
  }


  function setUpNPCLocations(gridArea,npcImage) {
    let npc;
    console.log("cell amount" + gridArea.numOfTiles)
    for (let j = 0; j < gridArea.numOfTiles; j++) {
      if (gridArea.grid[j] == 6) {
        
        let tileRow = Math.trunc(j / gridArea.collums);
        let tileCol = Math.trunc(j % gridArea.collums);
  
        let tileXPos = tileCol * gridArea.tileWidth;
        let tileYPos = tileRow * gridArea.tileHeight;
  
        let npcObject = new GameObject(npcImage, tileXPos, tileYPos, 200, 200);
        npc = new NPC(npcImage, npcObject);
      }
    }
    return npc;
  }

  function setUpNpcDetails(npc)
  {
    npc.npcDialogue = clueDetails[npcDialogueIndex];
    npc.npcSrcImage = npcImageFiles[npcDialogueIndex];
    //npc.npcObject.spritesheet.src = npc.npcSrcImage;
    npcDialogueIndex++;
    console.log(npcDialogueIndex);
  }
let interactAvailable = false;
let interactableClueIndex =  - 1;

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
            interactAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactAvailable = false;
        }
        
        for(let i = 0; i < this.cluesArray.length; i++)
        {
            this.cluesArray[i].drawClue();
        }
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
            interactAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactAvailable = false;
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
            interactAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactAvailable = false;
        }

        for(let i = 0; i < this.cluesArray.length; i++)
        {
            this.cluesArray[i].drawClue();
        }
    };
    
}
class HallWayScreen {
    constructor(gridArea) {
        this.cluesArray = setUpClueLocations(gridArea);
        
    }
  
    update() {

    }
  
    draw() {
         checkInteractAvailable(this.cluesArray);
        if(interactableClueIndex != -1)
        {
            interactAvailable = true; 

            let shiftedClueXPos = this.cluesArray[interactableClueIndex].clueObject.x - interactButtonWidth / 1.5;
            let shiftedClueYPos = this.cluesArray[interactableClueIndex].clueObject.y - interactButtonHeight / 1.5;
            
            context.drawImage(interactButtonImage,shiftedClueXPos,shiftedClueYPos,interactButtonWidth,interactButtonHeight);
        }
        else{
            interactAvailable = false;
        }

      for (let i = 0; i < this.cluesArray.length; i++)
       {
        this.cluesArray[i].drawClue();
        }
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

function withinRange(object1,object2)
{
    let range = 200;
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
        for(let i = 0; i < this.cluesArray.length; i++)
        {
            if(withinRange(player.playerObject,this.cluesArray[i].clueObject))
            {
                console.log("collision with star");
            }
        }
        
    };
    draw()
    {
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
        //console.log("Update from Menu");
    };
    draw()
    {
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
        //console.log("Update from Menu");
    };
    draw()
    {
        for(let i = 0; i < this.cluesArray.length; i++)
        {
            this.cluesArray[i].drawClue();
        }
    };
}
class HallWayScreen {
    constructor(gridArea) {
        console.log(gridArea.grid[0]);
        this.cluesArray = setUpClueLocations(gridArea);
        
    }
  
    update() {
      //console.log("Update from Menu");
    }
  
    draw() {
      for (let i = 0; i < this.cluesArray.length; i++) {
        this.cluesArray[i].drawClue();
      }
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
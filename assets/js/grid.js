context = canvas.getContext("2d");


class Grid
{
    constructor()
    {
        this.grid = [];
        this.tileWidth = 0;
        this.tileWidth = 0;
        this.rows = 0;
        this.collums = 0;
        this.numOfTiles = 0;
    }
    setUpGrid(canvasWidth,canvasHeight,collums,rows,t_grid) {
        this.rows = rows;
        this.collums = collums;
        this.numOfTiles = rows * collums;
        this.tileWidth = canvasWidth / collums;
        this.tileHeight = canvasHeight / rows;
        this.grid = t_grid;

        console.log("Rows: " + this.rows + "Cols: " + this.collums);
      }
}
let currentGridArea = new Grid();
var collisionTile;

class AreaManager
{
 checkAreaCollision()
    {
        for(let i = 0; i < currentGridArea.numOfTiles; i++)
        {
            if(currentGridArea.grid[i] == 9) //If we collide into a wall
            {
                let tileRow = Math.trunc(i / currentGridArea.collums);
                let tileCol = Math.trunc(i % currentGridArea.collums);

                let tileXPos = tileCol * currentGridArea.tileWidth;
                let tileYPos = tileRow * currentGridArea.tileHeight;

                collisionTile = new GameObject(playerImg,tileXPos,tileYPos,currentGridArea.tileWidth,currentGridArea.tileHeight);

                if(this.checkCollision(player.playerObject,collisionTile))
                {
                    return true;
                }
            }
 
        }
    }
    atAreaExit()
    {
        
        for(let i = 0; i < currentGridArea.numOfTiles; i++)
        {
           
            if(currentGridArea.grid[i] != 0 && currentGridArea.grid[i] != 9 && currentGridArea.grid[i] != 8 && currentGridArea.grid[i] != 7 && currentGridArea.grid[i] != 6) //If we found the next room cell
            {
                let tileRow = Math.trunc(i / currentGridArea.collums);
                let tileCol = Math.trunc(i % currentGridArea.collums);

                let tileXPos = tileCol * currentGridArea.tileWidth;
                let tileYPos = tileRow * currentGridArea.tileHeight;

                collisionTile = new GameObject(playerImg,tileXPos,tileYPos,currentGridArea.tileWidth,currentGridArea.tileHeight);

                if(this.checkCollision(player.playerObject,collisionTile))
                {
                    //Draw ui
                    console.log("colliding with cell: " + currentGridArea.grid[i]);
                    areaExitCell = currentGridArea.grid[i];
                    areaExitId = i;
                    return true;
                }
            }
        }
        areaExitCell = -1;
        return false;
    }
    changeGrid(gridId)
    {
        switch(gridId)
        {
            case 1:
                currentGridArea = noteGridArea;
                currentGameArea.area = AREA_TYPES.NOTE_ROOM;
                break;

            case 2:
                currentGridArea = sinkGridArea;
                currentGameArea.area = AREA_TYPES.SINK_ROOM;
                break;
                
            case 3:
                currentGridArea = tileGridArea;
                currentGameArea.area = AREA_TYPES.TILED_ROOM;
                break;

            case 4:
                currentGridArea = hallGridArea;
                currentGameArea.area = AREA_TYPES.HALL_ROOM;
                break;
        }
        localStorage.setItem("area", currentGameArea.area);
        backgroundImg.src = "assets/img/" + currentGameArea.area + ".png";
        this.getNewAreaSpawnPos();
    }
    getNewAreaSpawnPos()
    {
        for(let i = 0; i < currentGridArea.numOfTiles; i++)
        {
            console.log("looping gird for spawn");
            if(currentGridArea.grid[i] == 8) //If we found the cell which is the spawn entrance
            {
                let tileRow = Math.trunc(i / currentGridArea.collums);
                let tileCol = Math.trunc(i % currentGridArea.collums);

                let tileXPos = tileCol * currentGridArea.tileWidth;
                let tileYPos = tileRow * currentGridArea.tileHeight;

                areaEnterancePos.x = tileXPos;
                areaEnterancePos.y = tileYPos;
                
                break;
            }
        }
    }

    checkCollision(object1, object2)
    {
    let xOverlap = false;
    let yOverlap = false;

     xOverlap = valueInRange(object1.x,object2.x, object2.x + object2.width) || valueInRange(object2.x,object1.x, object1.x + object1.width);
     yOverlap = valueInRange(object1.y,object2.y, object2.y + object2.height) || valueInRange(object2.y,object1.y, object1.y + object1.height);
    
    
     return xOverlap && yOverlap;
    }
    getCellPos(cellID)
    {
        let tileRow = Math.trunc(cellID / currentGridArea.collums);
        let tileCol = Math.trunc(cellID % currentGridArea.collums);

        let tileXPos = tileCol * currentGridArea.tileWidth;
        let tileYPos = tileRow * currentGridArea.tileHeight;

        return new Vector(tileXPos,tileYPos);
    }
    
}

function valueInRange(value, min, max)
{
        return (value>=min) && (value <= max);
}

function GamePlayArea(area)
{
    this.area = area; //held as string
}

function getStartGrid()
{
    console.log(currentGameArea.area);
    let startGrid;
    switch(currentGameArea.area)
        {
            case AREA_TYPES.NOTE_ROOM:
                startGrid = noteGridArea;
                break;
            case AREA_TYPES.SINK_ROOM:
                startGrid = sinkGridArea;
                break;
            case AREA_TYPES.TILED_ROOM:
                startGrid = tileGridArea;
                break;
            case AREA_TYPES.HALL_ROOM:
                startGrid = hallGridArea;
                break;
        }
        return startGrid;
}

const AREA_TYPES = Object.freeze({ 
    SINK_ROOM: "sinkRoom",
    NOTE_ROOM: "noteRoom",
    TILED_ROOM: "tiledRoom",
    HALL_ROOM: "verticalHall"
  }); //different game areas
  
const startArea = localStorage.getItem('area');
let currentGameArea = new GamePlayArea(startArea);




let tileGridArea = new Grid();
tileGridArea.setUpGrid(context.canvas.width,context.canvas.height,9,6,tileRoomGrid);

let sinkGridArea = new Grid();
sinkGridArea.setUpGrid(context.canvas.width,context.canvas.height,7,6,sinkRoomGrid);

let noteGridArea = new Grid();
noteGridArea.setUpGrid(context.canvas.width,context.canvas.height,7,6,noteRoomGrid);

let hallGridArea = new Grid();
hallGridArea.setUpGrid(context.canvas.width,context.canvas.height,8,6,verticalHallGrid);

currentGridArea = getStartGrid();

let areaEnterancePos = new Vector(120,500);
let atAreaExit = false;
let areaExitCell = -1;
let areaExitId = -1;

let collisionManger = new AreaManager();
let backgroundImg = new Image();
backgroundImg.src = "assets/img/" + currentGameArea.area + ".png";
console.log("assets/img/" + currentGameArea.area + ".png");

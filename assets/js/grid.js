canvas = document.getElementById("the_canvas");
context = canvas.getContext("2d");

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

var collisionTile;

class AreaManager
{
    checkRoomCollision(areaType)
    {
        switch(areaType)
        {
            case AREA_TYPES.NOTE_ROOM:
                if(this.checkAreaCollision(noteGridArea))
                return true;
                break;

            case AREA_TYPES.SINK_ROOM:
                if(this.checkAreaCollision(sinkGridArea))
                return true;
                break;

            case AREA_TYPES.TILED_ROOM:
                if(this.checkAreaCollision(tileGridArea))
                return true;
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
                let tileRow = Math.trunc(i / gridArea.collums);
                let tileCol = Math.trunc(i % gridArea.collums);

                let tileXPos = tileCol * gridArea.tileWidth;
                let tileYPos = tileRow * gridArea.tileHeight;

                collisionTile = new GameObject(playerImg,tileXPos,tileYPos,gridArea.tileWidth,gridArea.tileHeight);

                if(this.checkCollision(player.playerObject,collisionTile))
                {
                    return true;
                }
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

    
}

function valueInRange(value, min, max)
{
        return (value>=min) && (value <= max);
}

function GamePlayArea(area,zone)
{
    this.area = area; //held as string
    this.zone = zone;
}

const AREA_TYPES = Object.freeze({ 
    SINK_ROOM: "sinkRoom",
    NOTE_ROOM: "noteRoom",
    TILED_ROOM: "tiledRoom",
    HALL_ROOM: "verticalHall"
  }); //different game areas
  
let currentGameArea = new GamePlayArea(AREA_TYPES.HALL_ROOM);

let tileGridArea = new Grid();
tileGridArea.setUpGrid(context.canvas.width,context.canvas.height,9,6,tileRoomGrid);

let sinkGridArea = new Grid();
sinkGridArea.setUpGrid(context.canvas.width,context.canvas.height,7,6,sinkRoomGrid);

let noteGridArea = new Grid();
noteGridArea.setUpGrid(context.canvas.width,context.canvas.height,7,6,noteRoomGrid);

let hallGridArea = new Grid();
hallGridArea.setUpGrid(context.canvas.width,context.canvas.height,7,6,verticalHallGrid);


let collisionManger = new AreaManager();
let backgroundImg = new Image();
backgroundImg.src = "assets/img/" + currentGameArea.area + ".png";
console.log("assets/img/" + currentGameArea.area + ".png");

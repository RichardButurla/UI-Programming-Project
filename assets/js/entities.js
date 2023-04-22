function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

class Player{
    constructor(playerImg, playerObject)
    {
        this.playerImg = playerImg;
        this.playerObject = playerObject;
        this.playerFrameTimer = 0;
        this.playerXFrame = 0;
        this.playerYFrame = 0;
        this.playerScale = 3;
        this.playerScaledWidth = 1;
        this.playerScaledHeight = 1;
        this.playerPreviousPosition = new Vector(playerObject.x,playerObject.y);
    }
    drawPlayer()
    {
        //context.drawImage(this.playerObject.spritesheet,this.playerObject.x,this.playerObject.y);
        let playerWidth = 48;
        let playerHeight = 64;
        this.playerScaledWidth = this.playerScale * playerWidth;
        this.playerScaledHeight = this.playerScale * playerHeight;
        player.width = this.playerScaledWidth;
        player.height = this.playerScaledHeight;

    context.drawImage(playerObject.spritesheet,
        this.playerXFrame * playerWidth, this.playerYFrame * playerHeight, playerWidth, playerHeight,
        playerObject.x, playerObject.y, this.playerScaledWidth, this.playerScaledHeight);
    }
    animatePlayer()
    {
        playerFrameTimer+= 1;
        if(playerFrameTimer > frameTimeLimit)
        {
            playerFrameTimer = 0;
            playerXFrame += 1;
            if(playerXFrame > 4)
            {
                playerXFrame = 0;
            }
        }

        if(playerMovingRight)
        {
            playerYFrame = 0;
        }
        if(playerMovingLeft)
        {
            playerYFrame = 1;
        }
        if(playerIdle)
        {
            playerYFrame = 0;
            playerXFrame = 1;
        }
    }
    checkPlayerBounds()
    {
        if(player.playerObject.x > context.canvas.width - this.playerScaledWidth || player.playerObject.x < 0  ||
            player.playerObject.y < 0 || player.playerObject.y > context.canvas.height - this.playerScaledHeight)
            {
                return true;
            }
    }
}

class ClueInteractable
{
    constructor(clueImg, clueObject,clueDetail,clueSrcImage)
    {
        this.clueImg = clueImg;
        this.clueObject = clueObject;
        this.clueDetail = clueDetail;
        this.clueSrcImage = clueSrcImage;
    }
    drawClue()
    {
        context.drawImage(this.clueObject.spritesheet,this.clueObject.x,this.clueObject.y,this.clueObject.width,this.clueObject.height);  
    }
}

///If clue has not been interacted with before, add it to array and mark it

function checkClueInteracted()
{
    
}

class NPC
{
    constructor(npcImg, ncpObject,npcDialogue,npcSrcImage)
    {
        this.npcImg = npcImg;
        this.npcObject = ncpObject;
        this.npcDialogue = npcDialogue;
        this.npcSrcImage = npcSrcImage;
    }
    drawNPC()
    {
        context.drawImage(this.npcObject.spritesheet,this.npcObject.x,this.npcObject.y,this.npcObject.width,this.npcObject.height);  
    }
}

//Player
let playerImg = new Image();
playerImg.src = "assets/img/detective.png";
let playerObject = new GameObject(playerImg, 120, 500, 100, 150);
let player = new Player(playerImg,playerObject);
let playerMoveVector = new Vector(0,0);

let clueImg = new Image();
clueImg.src = "assets/img/shine.png"

let npcImg = new Image();
npcImg.src = "assets/img/shine.png";

let maxClueDialogue = 6;
let clueDialogueIndex = 0;
let npcDialogueIndex = 0;



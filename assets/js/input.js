
class Vector
{
    constructor(x, y)
    {
    this.x = x;
    this.y = y;
    }   
}

function clickableDpadBlueReleased() {
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
    gamerInput[INPUT_TYPES.X_BUTTON] = new GamerInput("X-Button-Up");
    console.log("release blue pad");
}

function clickableDpadGreenReleased() {
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
    gamerInput[INPUT_TYPES.A_BUTTON] = new GamerInput("A-Button-Up");
    console.log("release green pad");
}

function clickableDpadYellowReleased() {
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
    gamerInput[INPUT_TYPES.Y_BUTTON] = new GamerInput("Y-Button-Up");
    console.log("release yellow pad");
}

function clickableDpadRedReleased() {
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
    gamerInput[INPUT_TYPES.B_BUTTON] = new GamerInput("B-Button-Up");
    console.log("release red pad");
}

function clickDpadYellow(){
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;

}
function clickDpadBlue(){
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
}
function clickDpadRed(){
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
    console.log("d pad red");
}
function clickDpadGreen(){
    currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
}

function input(event) {
        if (event.type === "keydown") {
            currentControls = CONTROLS_TYPE.MOUSE_KEYBOARD;
            checkKeyDown(event);
        }
        if (event.type === "keyup") {
            currentControls = CONTROLS_TYPE.MOUSE_KEYBOARD;
            checkKeyUp(event);
        }
}

function checkKeyDown(event)
{
    if(event.keyCode == 87)
    {
        //yellowButton.classList.add("pressed"); 
        gamerInput[INPUT_TYPES.UP] = new GamerInput("Up"); 
    }
    if(event.keyCode == 65)
    {
        //blueButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.LEFT] = new GamerInput("Left"); 
    }
    if(event.keyCode == 83)
    {
        //qgreenButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.DOWN] = new GamerInput("Down"); 
    }
    if(event.keyCode == 68)
    {
        //redButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.RIGHT] = new GamerInput("Right");
    }
    if(event.keyCode == 32)
    {
        gamerInput[INPUT_TYPES.SPACE] = new GamerInput("SpaceDown");
    }
    if(event.keyCode == 69)
    {
        gamerInput[INPUT_TYPES.E] = new GamerInput("E-Down");
    }
    if(event.keyCode == 81)
    {
        gamerInput[INPUT_TYPES.Q] = new GamerInput("Q-Down");
    }
    if(event.keyCode == 27)
    {
        gamerInput[INPUT_TYPES.ESCAPE] = new GamerInput("Esc-Down");
    }
}

function checkKeyUp(event)
{
    //gamerInput = new GamerInput("None");
    redButton.classList.remove("pressed");
    blueButton.classList.remove("pressed");
    yellowButton.classList.remove("pressed");
    greenButton.classList.remove("pressed");

    if(event.keyCode == 87)
    {
        //yellowButton.classList.add("pressed"); 
        gamerInput[INPUT_TYPES.UP] = new GamerInput("None"); 
    }
    if(event.keyCode == 65)
    {
        //blueButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.LEFT] = new GamerInput("None"); 
    }
    if(event.keyCode == 83)
    {
        //qgreenButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.DOWN] = new GamerInput("None"); 
    }
    if(event.keyCode == 68)
    {
        //redButton.classList.add("pressed");
        gamerInput[INPUT_TYPES.RIGHT] = new GamerInput("None");
    }
    if(event.keyCode == 32)
    {
        gamerInput[INPUT_TYPES.SPACE] = new GamerInput("SpaceUp");
        console.log("up");
    }
    if(event.keyCode == 69)
    {
        gamerInput[INPUT_TYPES.E] = new GamerInput("E-Up");
    }
    if(event.keyCode == 81)
    {
        gamerInput[INPUT_TYPES.Q] = new GamerInput("Q-Up");
    }
    if(event.keyCode == 27)
    {
        gamerInput[INPUT_TYPES.ESCAPE] = new GamerInput("Esc-Up");
    }
}

function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

const CONTROLS_TYPE = Object.freeze({ 
    MOUSE_KEYBOARD: 0,
    JOYSTICK_BUTTONS: 1
  });

const INPUT_TYPES = Object.freeze({ 
UP: 0,
LEFT: 1,
DOWN: 2,
RIGHT: 3,
SPACE: 4,
E: 5,
Q: 6,
X_BUTTON: 7,
Y_BUTTON: 8,
B_BUTTON: 9,
A_BUTTON: 10,
ESCAPE: 11
}); //WASD,Spacebar

let gamerInput = [
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None"),
    new GamerInput("None")
];

let currentControls = CONTROLS_TYPE.MOUSE_KEYBOARD;
let numberOfInputs = 12;
let moved = false;

//Joystick
var options = {
    mode: 'static',
    color: 'grey',
    maxNumberOfNipples: 0,
    zone: document.getElementById('joystick-area'),
    position: {left: '50%', top: '47.5%'},
};


var dynamic = nipplejs.create(options);

dynamic.on('start', function (evt, nipple) {
    //nipple.on('start move end dir plain', function (evt) {
        joystickRefresh = true;
        console.log(options.maxNumberOfNipples);
    //move mario not just vertically and horizontally
     nipple.on('move', function (evt, data) {
        currentControls = CONTROLS_TYPE.JOYSTICK_BUTTONS;
        moved = true;
        playerMoveVector.x = data.vector.x;
        playerMoveVector.y = data.vector.y;

        joystickInteractVector.x = data.vector.x;
        joystickInteractVector.y = data.vector.y;

        if(joystickRefresh == true)
        {
            if(joystickInteractVector.y > 0.9)
            {
                joystickUpwardSelect = true;
                joystickRefresh = false;           
            }
            if(joystickInteractVector.y < -0.9)
            {
                joystickDownwardSelect = true;
                joystickRefresh = false;
            }
        }
        

        if(playerMoveVector.x > 0)
        {
            playerMovingRight = true;
            playerMovingLeft = false;
            playerIdle = false;
        }
        if(playerMoveVector.x < 0)
        {
            playerMovingRight = false;
            playerMovingLeft = true;
            playerIdle = false;
        }

     });

     nipple.on('end', function (evt, data) {
        //So we only interact once using joystick and not constantly

        moved = false;
        joystickInteractVector.x = 0;
        joystickInteractVector.y = 0;
        playerMoveVector.x = 0;
        playerMoveVector.y = 0;
        playerIdle = true;
        playerMovingLeft = false;
        playerMovingRight = false;
     });
});

let joystickInteractVector = new Vector(0,0);
let joystickDownwardSelect = false;
let joystickUpwardSelect = false;
let joystickRefresh = false;

//HTML/CSS Buttons
let yellowButton = document.getElementsByClassName("yellow")[0];
let blueButton = document.getElementsByClassName("blue")[0];
let redButton = document.getElementsByClassName("red")[0];
let greenButton = document.getElementsByClassName("green")[0];

let interactButtonImage = new Image();
interactButtonImage.src = "assets/img/Keyboard & Mouse/Dark/E_Key_Dark.png";
var interactButtonWidth = 100;
var interactButtonHeight = 100;

let enterAreaButtonImage = new Image();
enterAreaButtonImage.src = "assets/img/Keyboard & Mouse/Dark/Space_Key_Dark.png";
var enterAreaButtonImageWidth = 100;
var enterAreaButtonImageHeight = 100;


 
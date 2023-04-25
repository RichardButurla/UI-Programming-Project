var vid = document.getElementById("menuVideo");
let validateButton = document.getElementsByClassName("saved-data-accept")[0];
let dismissButton = document.getElementsByClassName("saved-data-refusal")[0];

const username = localStorage.getItem('username');
const notes = localStorage.getItem('notes');
const notesAarray = JSON.parse(notes);
const playerX = localStorage.getItem('player.x');
const playerY = localStorage.getItem('player.y');
const canvas = document.getElementById("the_canvas");
let form = document.forms["helloForm"];
let header = document.getElementById("main-header");
var video = document.getElementById("menuVideo");

validateButton.onclick = function(){
    modal.style.display = "none";
    canvas.classList.add("showed");
    vid.pause();
}
dismissButton.onclick = function(){
    modal.style.display = "none";
    form.style.display = "block";
    canvas.classList.remove("showed");
    //the following is not necessary in this case, but I'll leave it here in case you need it later
    localStorage.clear();
    moved = false;
    console.log("startFresh");
    vid.play();
    vid.style.display = "block";
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("mobile");
    // Code to execute if the website is being accessed from a mobile device
  } else {
    // Code to execute if the website is being accessed from a desktop device
    console.log("desktop");
    const dPad = document.getElementById("dPad");  
    const joyStickArea = document.getElementById("joystick-area");
    joyStickArea.style.display = "none";
    dPad.style.display = "none";
  }

if(typeof(Storage) !== "undefined") {
   
    // console.log("Local storage is supported.");
    // Local storage is available on your browser
    

   
        
    if(username)
    {
        vid.pause();
        video.style.display = "none"
        canvas.classList.add("showed");
        header.innerHTML = "Detective: " + username;
        header.style.marginLeft = "0%"
        form.style.display = "none";
        if (username && notes ){

            if((notesAarray.length / 2) > 0)
            {
                vid.pause();
                video.style.display = "none"
                header.innerHTML = "Detective: " + username;
                header.style.marginLeft = "0%"
                form.style.display = "none";
                let modal = document.getElementById("modal");
                console.log(playerX);
                let modalContent = modal.children[0].children[2];
                    console.log(playerX);
                    canvas.classList.remove("showed");
                    header.innerHTML = "";
                    modal.style.display = "block";
                    modalContent.style.fontSize = "36px";
                    modalContent.style.color = "aliceblue"
                    modalContent.innerHTML = "Detective: " + username + "<br>" + "Notes Collected:" + (notesAarray.length / 2);   
            }
        }
        else{
            localStorage.setItem("player.x", 50);
        localStorage.setItem("player.y", 450);
        localStorage.setItem("area", "noteRoom");
        const noteTest = [];
        localStorage.setItem('notes', JSON.stringify(noteTest));
        const npcsInteracted = [false, false, false];
        localStorage.setItem('npcsInteracted',JSON.stringify(npcsInteracted));
        moved = false;
        }
    }  
    else{

        localStorage.setItem("player.x", 50);
        localStorage.setItem("player.y", 450);
        localStorage.setItem("area", "noteRoom");
        const noteTest = [];
        localStorage.setItem('notes', JSON.stringify(noteTest));
        const npcsInteracted = [false, false, false];
        localStorage.setItem('npcsInteracted',JSON.stringify(npcsInteracted));
        moved = false;
        console.log("no data in localStorage, loading new session")
    }
  } else {
    console.log("Local storage is not supported.");
    // The condition isn't met, meaning local storage isn't supported
  }

// Stores the item data



function validateForm(){

    var x = document.forms["helloForm"]["name"].value;
    if (x == "") {
        alert("Please input a name");
        return false;
    }
    else{
        alert("Welcome " + document.forms["helloForm"]["name"].value);
        canvas.style.visibility = "visible";
        //more advanced pt2: make a system that changes the webpage based on the inputted name 
    }
    localStorage.setItem("username", x);
}

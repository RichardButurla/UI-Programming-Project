if(typeof(Storage) !== "undefined") {
   
    // console.log("Local storage is supported.");
    // Local storage is available on your browser
    const username = localStorage.getItem('username');
    const score = localStorage.getItem('score');
    const canvas = document.getElementById("the_canvas");
    let form = document.forms["helloForm"];
    let header = document.getElementById("main-header");
    if(username)
    {   
        canvas.classList.add("showed");
        form.style.display = "none";
        header.innerHTML = "Player: " + username;
    }
    if (username && score){
        
        
        form.style.display = "none";
        let modal = document.getElementById("modal");
        let modalContent = modal.children[0].children[2];
        if(score > 0)
        {
            canvas.classList.remove("showed");
            header.innerHTML = "";
            modal.style.display = "block";
            modalContent.innerHTML = "username: " + username + "<br>" + "score: " + score;
        }
        

        let validateButton = document.getElementsByClassName("saved-data-accept")[0];
        let dismissButton = document.getElementsByClassName("saved-data-refusal")[0];
        validateButton.onclick = function(){
            modal.style.display = "none";
            canvas.classList.add("showed");
        }
        dismissButton.onclick = function(){
            modal.style.display = "none";
            form.style.display = "block";
            localStorage.setItem("score", 0)
            console.log("dismiss called");
            localStorage.setItem('score',0);
            canvas.classList.add("showed");
            //the following is not necessary in this case, but I'll leave it here in case you need it later
            // localStorage.clear();
        }
    }
    else{
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

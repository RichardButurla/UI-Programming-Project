

const clueDetails = 
[
    "There seems to be a room down here..",
    "Victim didnt finish preparing food..",
    "Theres is an axe missing here. Mabye it was the murder weapon?",
    "Someone searched this chest in a hurry. Perhaps they wanted some valuebles",
    "Damage to tiles on the ground, someone was struggling to run away while being attacked.",
    

]
const clueImageFiles = 
[
    "assets/img/Clue-Images/holeInFloor1.png",
    "assets/img/Clue-Images/unfinishedFood.png",
    "assets/img/Clue-Images/missingAxe.png",
    "assets/img/Clue-Images/openedChest.png",
    "assets/img/Clue-Images/damagedTile.png",
]

function correctTextLength(clueInfoText)
{
    let maxCharsPerLine = 40;
    let lineOneText = "";
    let detailsTextLines = [];

    console.log("Length of text" + clueInfoText.length);
    if(clueInfoText.length > maxCharsPerLine)
    {
        
        for(let i = 0; i < maxCharsPerLine; i++)
        {
            lineOneText += clueInfoText[i];
            console.log(clueInfoText[i]);
        }
        detailsTextLines[0] = lineOneText;
        lineOneText = "";
        for(let i = maxCharsPerLine; i < clueInfoText.length; i++)
        {
            lineOneText += clueInfoText[i];
        }    
        detailsTextLines[1] = lineOneText;  
    }
    else
    {
        detailsTextLines[0] = clueInfoText;
    }
    return detailsTextLines;
        
}
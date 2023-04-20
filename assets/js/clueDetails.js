

const clueDetails = 
[
    "There seems to be a room down here..",
    "Victim didnt finish preparing food..",
    "Hole in the floor board here",
    "Theres is an axe missing here. Mabye it was the murder weapon?",
    "Someone searched this chest in a hurry. Perhaps they wanted some valuebles",
    "Damage to tiles on the ground, someone was struggling to run away while being attacked.",

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
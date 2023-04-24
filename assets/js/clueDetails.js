

const clueDetails = 
[
    "You notice a decently-sized hole in the wooden floorboards.",
    "There are vegetables on the cutting board, in the middle of being chopped. A knife lies beside them.",
    "You see that one of the axes is missing from the wall.",
    "There are two chests in the storage room. One of them is open and empty.",
    "You notice that the tiles on the ground in the storage room are damaged, revealing the old concrete beneath.",
    

]
const clueImageFiles = 
[
    "assets/img/Clue-Images/holeInFloor1.png",
    "assets/img/Clue-Images/unfinishedFood.png",
    "assets/img/Clue-Images/missingAxe.png",
    "assets/img/Clue-Images/openedChest.png",
    "assets/img/Clue-Images/damagedTile.png",
]

const npcImageFiles = 
[
    "assets/img/scarfGuy.png",
    "assets/img/weirdGuy.png",
    "assets/img/poshFrog.png"
]

const npcDialogue = 
[
    "I was in the storage room earlier today, but I didn't see anything out of the ordinary. I swear!",
    "I was passing through the area and saw nothing of interest. Now leave me alone.",
    "I've been in meetings all day. I couldn't have had anything to do with this."
]

function correctTextLength(clueInfoText, maxCharsPerLine) {
    let detailsTextLines = [];
    
    if (clueInfoText.length <= maxCharsPerLine) {
      // If the input string is shorter than or equal to maxCharsPerLine,
      // simply return it as the only element in the array
      detailsTextLines.push(clueInfoText);
    } else {
      // If the input string is longer than maxCharsPerLine, split it into
      // an array of substrings of length maxCharsPerLine
      for (let i = 0; i < clueInfoText.length; i += maxCharsPerLine) {
        detailsTextLines.push(clueInfoText.substr(i, maxCharsPerLine));
      }
    }
  
    return detailsTextLines;
  }
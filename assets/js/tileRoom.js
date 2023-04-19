//Grids for room, 0 indicate free space,
// 9 indicates walls, 8 indicates spawn location tiles
// and 7 is clue spawn Locarions
//Room numbers for travel between them:
// NoteRoom - 1
// SinkRoom - 2
// TileRoom - 3
// VerticalHall - 4
// HorisontalHall - 5
// LoungeRoom - 6


const noteRoomGrid = [
    9,9,9,9,9,9,9,
    9,9,9,9,9,9,9,
    9,9,9,9,9,9,9,
    0,0,0,0,0,0,0,
    0,0,0,0,0,8,0,
    0,7,0,0,3,3,3,
    ]

const sinkRoomGrid = [
    9,9,9,9,9,9,9,
    9,9,9,9,9,9,9,
    0,0,0,7,0,0,0,
    0,0,0,0,0,0,0,
    0,8,0,9,0,0,9,
    3,3,3,9,0,0,9,
    
]        

const tileRoomGrid = [
1,1,1,9,9,9,2,2,2,
0,0,0,9,9,9,0,0,0,
0,0,0,9,9,9,0,0,0,
0,0,0,0,0,7,0,0,9,
9,0,0,0,8,0,0,0,9,
9,0,0,4,4,4,0,7,9
]

const verticalHallGrid = [
    3,3,3,3,3,3,3,3,
    0,0,0,8,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,7,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,5,
    ]
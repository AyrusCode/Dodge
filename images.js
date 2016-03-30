//Theme ideas include asteroids, pacman, kim jong un and tomatoes
//Make a theme selector here and then:

var theme = "Baseball"; //NOT pacman or PacMan or PACMAN
var themelength;

if (theme == "Nintendo") {
    themelength = 3;
} else if (theme == "SouthPark") {
    themelength = 5;
} else if (theme == "Baseball") {
    themelength = 5;
} else if (theme == "StarWars") {
    themelength = 4;
}

//For this to work, the theme name needs to be the EXACT SAME
//as the word you use in the html:
//this way it is playerImgPacman like in the html instead of
//playerImgpacman or playerImgPacMan which don't work
var playerImg = document.getElementById("playerImg"+theme);
var monsterImgs = []
for (var i = 0; i < themelength; i++) {
    console.log("monsterImg"+theme+toString(i+1));
    monsterImgs.push(document.getElementById("monsterImg"+theme+(i+1).toString()));
}

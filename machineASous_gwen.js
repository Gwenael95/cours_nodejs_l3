const crypto = require("crypto")
const nbIcoDisplayed = 3
const icons = ["♠", "♥", "♦", "♣"]
const sep = "|"


function isPlayerWin(arr) {
    arr.sort();
    return arr[0] == arr[arr.length -1]
}

function randomIco(){
	return icons[crypto.randomInt(0, icons.length )]
}


//console.log(sep + randomIco() + sep + randomIco() + sep + randomIco() + sep)

function launchMachine(){
	let result = "";
	let allIco = []
	for (let i=0; i<nbIcoDisplayed; i++){
		const ico = randomIco();
		allIco.push(ico)
		result += sep + ico
	}
	result += sep

	return {result, win : isPlayerWin(allIco)}
}


const play1 = launchMachine();
console.log(play1.result + "\n" + (play1.win? "you win" : "you loose"))



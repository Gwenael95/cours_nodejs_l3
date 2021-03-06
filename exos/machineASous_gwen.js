const crypto = require("crypto")
const nbIcoDisplayed = 3
const icons = ["♠", "♥", "♦", "♣", "A", "V", "<", ">"]
const sep = "|"


/**
 * Check if the player win, by checking if all icons are same in the array
 * @param arr {array} array containing icons randomly generated
 * @return {Boolean}
 **/
function isPlayerWin(arr) {
	arr.sort();
	return arr[0] == arr[arr.length -1]
}

/**
 * return a random icon
 * @return {String}
 **/
function randomIco(){
	return icons[crypto.randomInt(0, icons.length )]
}


//console.log(sep + randomIco() + sep + randomIco() + sep + randomIco() + sep)

/**
 * launch a slot machineGame
 * @return {Object} the result displayed on the machine as a string (key : result), and a boolean if player win (key : win)
 **/
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


const proba = 1/Math.pow(icons.length, (nbIcoDisplayed-1))*100
console.log("Avec " + icons.length + " symboles, quelle chance (sur 100) avons-nous d’avoir " + nbIcoDisplayed + " fois le même = " + proba + "%")

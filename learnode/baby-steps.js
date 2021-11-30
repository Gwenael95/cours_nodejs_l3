const args = process.argv.slice(2)


/**
 * return the result as float, even with number with spaces (ex : '10 000' => 10000)
 * 
 * */
function parsingToFloat(str){
    return parseFloat(str.toString().replace(/\s/g,''))
}

/**
 * add 'b' value to 'a' value
 * @param a {Number}
 * @param b {Number}
 * @return float
 * */
function calculate(a, b){
	return parsingToFloat(a) + parsingToFloat(b)
}

const firstCalc = calculate(args[0], args[1]);


let lastResult = firstCalc;
for (var i = 2; i < args.length; i++) {
	lastResult = calculate(lastResult, args[i])
}

console.log(lastResult)



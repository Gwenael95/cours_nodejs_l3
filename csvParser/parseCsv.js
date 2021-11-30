// package.json => ajouté   "type": "module",

const fs = require("fs") 
const csv = require('csv-parser')
const ss = require('simple-statistics')


const args = process.argv.slice(2)
const csvFilename = args[0]
const statFilename = 'stat.txt'
let csvContent = []

/**
 * Return the value as float, even with number containing spaces (ex : '10 000' => 10000)
 * @return {Number}
 * */
function parsingToFloat(str){
    return parseFloat(str.toString().replace(/\s/g,''))
}

/**
 * Check if the file is a CSV
 * @param filename {String} : file's name
 * @return {Boolean}
 * */
function isCsvFile(filename){
	return filename.match(/(.)+.csv/) !==null 
}

//region read/write file
/**
 * Write some content in a given file
 * @param filename {String} : filename , where to write content
 * @param content {String} : content to insert in file
 * */
function writeFile(filename, content){
	fs.writeFile(filename, content, err => {
	  if (err) {
	    console.error(err)
	    return
	  }
	  //file written successfully
	})
}

/**
 * Read a file and return a promise
 * @param path {String} : filepath of the file to read
 * @param options {Object} : object
 * @return {Promise}
 * */
function readFile(path, options={}){
	return new Promise((resolve,reject) =>{
		fs.readFile(path, options, (err, data)=>{
			if(err) return reject(err);
			resolve(data)

		})
	})
}
//endregion

/**
 * Read a csv and parse it as an array of array
 * @param filename {String} : name of the file to read and parse
 * @return {Promise}
 * */
async function readCsv(filename){
	let data
	try{
	 	data = await readFile(filename, {encoding: "utf-8"})
	 	console.log(data)
	 	
	 	csvContent = parseCsvAsArray(data)
	 	console.log(csvContent)

	}catch(err){
		console.error(err)
	}
	return data
}

/**
 * Parse a Csv as an array of array
 * @param dataString {String} : data from a csv as string
 * @return {Array<Array>}
 * */
function parseCsvAsArray(dataString){ // #4.4
	let content = []
	let rows = dataString.split("\r\n")
 	rows.forEach(row=>{
 		if(row.length>0){
	 		cols = row.split(";")
	 		content.push(cols)
	 	}
 	})

 	return content
}

/* try to parse as an array of object, not working for now
function parseCsvAsObject(dataString){ // #4.4
	let content = []
	let rows = dataString.split("\r\n")
	let firsRow = []

	for(let i=0; i<rows.length ;i++){
		if(rows[i].length>0){
	 		cols = rows[i].split(";")
	 		if(i==0){
	 			firsRow.push(cols)
	 		}
	 		else{
		 		result = cols.forEach((key, i) =>key = firsRow[i]);

		 		content.push(result)
	 		}
	 	}
	}
 	return content
}
*/



console.log("filename = " + csvFilename) //#4.1
console.log(isCsvFile(csvFilename) ? "file is a CSV" : "file is not a CSV") //#4.2


readCsv(csvFilename) //#4.3



//------------------- Part 2 -------------------



const COL_NOTES_JS = "Notes JS"
const TYPE = {float:"float", int:"int"}
let csvLibContent = [];

/**
 * Calculate average of an array at a given column
 * @param csvContent {Array<Object>} : an array containing an object, typically a parsed csv 
 * @return {Number}
 * */
function average(csvContent, column){
	let average = 0
	csvContent.forEach(el=>{
		average += parseFloat(el[column])
	})
	return (average/csvContent.length)
}

/**
 * Extract a column into an array of object
 * @param csvContent {Array<Object>} : an array containing an object, typically a parsed csv 
 * @param col {String} : a column name from the given array
 * @param type {String} : a defined type to parse value as int, float, string ...
 * @return {Array}
 * */
function extractColAsArray(csvContent, col, type){
	let arr = []
	csvContent.forEach(row=>{
		let val;
		if (TYPE.int === type) {
			val = parseInt(row[col])
		}
		else if (TYPE.float === type) {
			val = parsingToFloat(row[col])
		}
		else{
			val = row[col].toString()
		}
		arr.push(val)
	})
	return arr
}

/**
 * Read a csv using csv-parser lib, and write a stat file format '.txt'.
 * */
async function readCsvWithLibAndSaveStatsFile(){
	fs.createReadStream(csvFilename)
	  	.pipe(csv({ separator: ';' }))
	  	.on('data', (data) => csvLibContent.push(data))
		.on('end', () => {
		console.log(csvLibContent);

		let averageJs = average(csvLibContent, COL_NOTES_JS)

		//region stat with lib
		let notesJsArray = extractColAsArray(csvLibContent, COL_NOTES_JS, TYPE.float)
		const extentJs = ss.extent(notesJsArray)
		const varianceJs = ss.variance(notesJsArray)
		const mean = ss.mean(notesJsArray)		
		//endregion

		writeFile(statFilename, "own average js notes = " + averageJs + "\n" 
			+ "extent js notes = " + extentJs + "\n" 
			+ "variance js notes = " + varianceJs + "\n" 
			+ "mean js notes = " + mean  )
	});
}



readCsvWithLibAndSaveStatsFile()




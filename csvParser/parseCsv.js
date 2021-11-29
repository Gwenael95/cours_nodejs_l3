// package.json => ajouté   "type": "module",

const fs = require("fs") 


const args = process.argv.slice(2)
const csvFilename = args[0]
let csvContent = []

function isCsvFile(filename){
	return filename.match(/(.)+.csv/) !==null 
}

function readFile(path, options={}){
	return new Promise((resolve,reject) =>{
		fs.readFile(path, options, (err, data)=>{
			if(err) return reject(err);
			resolve(data)

		})
	})
}

async function readCsv(filename){
	let data
	try{
	 	data = await readFile(filename, {encoding: "utf-8"})
	 	console.log(data)
	 	
	 	let csvContent = parseCsv(data)
	 	console.log(csvContent)

	}catch(err){
		console.error(err)
	}
	return data
}

function parseCsv(dataString){ // #4.4
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


console.log(csvFilename) //#4.1
console.log(isCsvFile(csvFilename)) //#4.2


readCsv(csvFilename) //#4.3



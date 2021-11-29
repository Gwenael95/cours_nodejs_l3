// package.json => ajouté   "type": "module",

const fs = require("fs") 


const args = process.argv.slice(2)
const csvFilename = args[0]

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
	let content = []
	try{
	 	data = await readFile(filename, {encoding: "utf-8"})
	 	console.log(data)
	 	let rows = data.split("\r\n")
	 	rows.forEach(row=>{
	 		cols = row.split(";")
	 		content.push(cols)
	 	})

	 	console.log(content)
	}catch(err){
		console.error(err)
	}
	return data
}


console.log(csvFilename) //#4.1
console.log(isCsvFile(csvFilename)) //#4.2


const csvContent = readCsv(csvFilename) //#4.3



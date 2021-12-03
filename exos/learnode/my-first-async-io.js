const args = process.argv.slice(2)
const fs = require('fs');


function readFile(path, options={}){
	return new Promise((resolve,reject) =>{
		fs.readFile(path, options, (err, data)=>{
			if(err) return reject(err);
			resolve(data)

		})
	})
}

const promise = readFile(args[0], {encoding: "utf-8"})
promise.then(data=>{
	countNewlines = (data.split("\n")).length -1
console.log(countNewlines)
}).catch(err=>{
	console.error(err)
})
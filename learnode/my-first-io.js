const args = process.argv.slice(2)
const fs = require('fs');

const data = fs.readFileSync( args[0], {encoding:'utf8', flag:'r'} )
countNewlines = (data.split("\n")).length -1
console.log(countNewlines)
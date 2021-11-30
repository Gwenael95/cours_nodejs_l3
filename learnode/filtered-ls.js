const args = process.argv.slice(2)
const fs = require("fs") 


function isFileExtCorrect(filename){
  const reg = new RegExp("(.)+." + args[1])
  return filename.match(reg) !==null 
}

const callback = (err, list) =>{ // list = files list
  list.forEach(el=>{
      if(isFileExtCorrect(el)){
        console.log(el)
      }
  })
}

fs.readdir(args[0], callback) 
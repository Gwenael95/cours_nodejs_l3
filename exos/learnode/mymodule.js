const fs = require("fs") 
const args = process.argv.slice(2)

function isFileExtCorrect(filename, ext){
  const reg = new RegExp("(.)+." + ext)
  return filename.match(reg) !==null 
}

const readDirFiltered = (dirName, ext, callback) => {
  fs.readdir(dirName, function (err, list) { 
  if (err) { return callback(err, list) } 

  let filteredList  = []
  list.forEach(el=>{
      if(isFileExtCorrect(el, ext)){
        filteredList.push(el)
      }
  })

  callback(null, filteredList)
}) 
}

module.exports = function (dirName, ext, callback) {
  readDirFiltered(dirName, ext, callback)

}


//solution
/*
const fs = require('fs')
const path = require('path')

module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}*/
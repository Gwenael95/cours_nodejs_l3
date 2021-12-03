const args = process.argv.slice(2)
const mymodule = require('./mymodule.js');

function callBack(err, list) {  
   if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
 }  

mymodule(args[0], args[1], callBack)

//solution
/*
const filterFn = require('./solution_filter.js')
const dir = args[0]
const filterStr = args[1]

filterFn(dir, filterStr, function (err, list) {
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
})*/
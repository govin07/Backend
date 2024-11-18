  const fs = require('fs')
  const os = require('os')

  const data1 = async () => {
     const data2 = fs.readFileSync('./abc.txt', 'utf-8')
     console.log(data2) 
  } 

  data1()

fs.readFile('./abc.txt', 'utf-8',(err, data)=> {
    console.log(data);
    console.log(err)

} )

console.log("inside in index.js")

   fs.writeFileSync("./product.txt", "aditya")
   fs.writeFile('./product.txt', "sachin", (err) => {
    console.log(err)
   })
   fs.appendFile('./product.txt', "\nAditya", (err)=>{
    console.log(err)

   })
fs.unlinkSync('./product.txt')
console.log(os.platform())


  


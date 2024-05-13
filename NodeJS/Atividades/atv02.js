const os = require('os')

setTimeout(()=>{
  console.log('Informações do precessador:',os.cpus())
},2000)
const os = require('os')

setTimeout(()=>{
    console.log('Sistema operacional:',os.type())
    console.log('Arquitetura:', os.arch())
},2000)
const os = require('os')


    console.log('informações da memória:',os.totalmem(),'byte')
    const conversao = (os.totalmem() / 1024)
    console.log(conversao,'KiloByte')

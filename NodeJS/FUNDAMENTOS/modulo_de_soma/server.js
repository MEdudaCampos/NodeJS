const minimist = require('minimist');

const soma = require('./soma').soma

const args = minimist(process.argv.splice(2))
const a = args["numero1"]
const b = args["numero2"]

console.log(`A soma de ${a} + ${b} = ${soma(a,b)}`)
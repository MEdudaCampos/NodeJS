const meuModulo = require('./criei_um_modulo')
console.log(meuModulo)

const soma = meuModulo.soma
soma(2,2)

const aoQuadrado = meuModulo.aoQuadrado
aoQuadrado(2)

const subtracao = meuModulo.subtracao
subtracao(2,0)


const divisao = meuModulo.divisao
divisao(2,0)

const multiplicacao = meuModulo.multiplicacao
multiplicacao(2,10)

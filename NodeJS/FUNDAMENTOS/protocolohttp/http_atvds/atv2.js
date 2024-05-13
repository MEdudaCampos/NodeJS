const url = require ('url')
const adress = 'https://www.exemple.com/data?exem1=Duda'
const parseUrl = new url.URL(adress);

console.log(parseUrl.host)
console.log(parseUrl.pathname)
console.log(parseUrl.search)
console.log(parseUrl.searchParams.get('exem1'))
const file = {
    name: 'tuananh',
    children: ['com', 'ngo'],
    age: 31
}

const queryString = require('querystring');
const obj = queryString.stringify(file);
console.log(obj);





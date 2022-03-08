const getBirthDay = require('./hw2-getBirthDay');

function dateFormat(date) {
    const birthDay = getBirthDay(date);
    const dd = birthDay.getDate();
    const mm = birthDay.getMonth() + 1;
    const yyyy = birthDay.getFullYear();

    const dateFormatted = dd + '/' + mm + '/' + yyyy;
    return dateFormatted;
}

console.log(dateFormat('2022-3-8'));
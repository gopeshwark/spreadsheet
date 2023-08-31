const str1 = "I love Javascript";
const str2 = "hello world";
const removeDups = str => {
    const obj = {};
    let strToPrint = "";
    for (let i = 0; i < str.length; i++) {
        if (obj.hasOwnProperty(str[i].toLowerCase())) {
            obj[str[i].toLowerCase()] = parseInt(obj[str[i]]) + 1;
        } else {
            obj[str[i].toLowerCase()] = 1;
        }
    }
    for (let j = 0; j < str.length; j++) {
        if (obj[str[j].toLowerCase()] === 1) {
            strToPrint = strToPrint + str[j].toLowerCase()
        }
    }
    return strToPrint;
}
console.log(removeDups(str1)); // output should be ‘loejscrpt’
console.log(removeDups(str2)); // output should be ‘he wrd’


// Write a fat arrow function that reverse a number. For example: 123 > 321

const reverseNumber = num => parseInt((num + "")?.split("")?.reverse()?.join(""))

console.log(reverseNumber(123))
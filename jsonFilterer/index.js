const fs = require('fs');
const path = require('path');

let fileToRead = process.argv[2];
let fileToWrite = process.argv[3];

if(!fileToRead || !fileToWrite){
    console.log("Usage : node index.js FILETOREAD FILETOWRITE");
}

let toConvert = JSON.parse(fs.readFileSync(fileToRead));  

if(!Array.isArray(toConvert)){
    console.log("toread.json is not an array");
    return
}



var limitDate = new Date("2017-30-01")
var currentDate = new Date("2000-01-04T06:50:00+01:00")
var currentVal = 0;
var valCount = 1;

var toConvertVal = 0
var toConvertValCount = 1
var toConvertCurrentDate = new Date(0)

let el;
toConvert.sort((a,b)=>{
    return (new Date(a.fields.timestamp)) > (new Date(b.fields.timestamp))
})

toWrite = [];

for (let i = 0; i < toConvert.length; i++) {
    el = toConvert[i];
    if (include(el))
        toWrite.push(convert(el))
}

fs.writeFileSync(fileToWrite,JSON.stringify(toWrite));

function include(el){
    //if day is the same, just another hour
    let date = new Date(el.fields.timestamp)
    if(limitDate > date)
        return false

    if(currentDate.getDay() == date.getDay() ){
        currentVal += el.fields.value
        valCount++

        return false
    }else{
        toConvertVal = currentVal
        toConvertValCount = valCount
        toConvertCurrentDate = currentDate

        currentVal = el.fields.value
        valCount = 1
        currentDate = new Date(el.fields.timestamp)

        return true
    }
}

function convert(el){
    return {
        timestamp : toConvertCurrentDate.toLocaleDateString("fr-FR"),
        value : toConvertVal/toConvertValCount
    }
}
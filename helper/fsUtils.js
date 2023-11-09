const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
//promise to read the file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
//reads and appends new notes. parsing the db json, pushing the new note and writing it to the new db file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    }else{
        const parsedData= JSON.parse(data)
        parsedData.push(content);
        writeToFile(file, parsedData);
    }
});
};

  
  module.exports = {writeToFile, readAndAppend, readFromFile}

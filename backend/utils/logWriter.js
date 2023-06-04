const fs = require('fs');
const path = require('path');

function writeLog(error) {
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const filepath = path.join(__dirname, '../logs', `${dateString}.log`);
  const jsonString = JSON.stringify({ error });
  fs.appendFile(filepath, `${jsonString} \n`, (err) => {
    if (err) throw err;
  });
}

module.exports = { writeLog };

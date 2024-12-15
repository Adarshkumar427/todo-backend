const crypto = require('crypto')
const fs = require('fs')

function getHash(password) {
  const hash = crypto.pbkdf2Sync(password, '', 10000, 64, 'sha512');
  return hash.toString('hex');
}

function deleteFile(file) {
  try {
    if (typeof file === 'string') {
      fs.unlinkSync(file.slice(1));
      console.log(`File ${file} deleted!`);
    } else {
      fs.unlinkSync(file.path);
      console.log(`File ${file.filename} deleted!`);
    }
  } catch(error) {
    console.log(error)
  }
}

const helpers = {
  getHash,
  deleteFile
}

module.exports = helpers
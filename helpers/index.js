const dbValidators = require('./db-validators');
const generateJTW = require('./generate-JWT');
const googleVerify = require('./google-verify');
const hashPassword = require('./hash-password');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generateJTW,
    ...googleVerify,
    ...hashPassword,
    ...uploadFile
}
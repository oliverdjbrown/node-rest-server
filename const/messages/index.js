const httpResponses = require('./http-responses');
const categoryMessages = require('./messages');

module.exports = {
    ...httpResponses,
    ...categoryMessages
}
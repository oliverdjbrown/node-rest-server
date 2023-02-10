const httpResponses = require('./http-responses');
const messages = require('./messages');

module.exports = {
    ...httpResponses,
    ...messages
}
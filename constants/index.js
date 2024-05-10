const api = require('./api/api.url');
const httpResponses = require('./messages/http-responses');

module.exports = {
    api,
    ...httpResponses,
}
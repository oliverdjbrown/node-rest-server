const api = require('./base_url');

const path = {
    auth: `${api}/auth`,
    categories: `${api}/categories`,
    products: `${api}/products`,
    search: `${api}/search`,
    users: `${api}/users`,
    uploads: `${api}/uploads`,
};


module.exports = path
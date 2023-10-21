// router for api

// scan api folder for apis
const fs = require('fs');
const path = require('path');
const apis = {};
const apiPath = path.join(__dirname, 'api');
fs.readdirSync(apiPath).forEach(file => {
    const importName = file.split('.')[0];
    apis[importName] = require('./api/' + file);
});

module.exports = function(router){
    for (let api in apis) {
        if(apis[api].get) {
            router.get('/api/'+api, apis[api].get);
        }
        if(apis[api].post) {
            router.post('/api/'+api, apis[api].post);
        }
    }
};
// express js imports
const express = require('express');
const app = express();
app.use(express.json());
const expressListEndpoints = require('express-list-endpoints');
const port = 4646;

// import routes
const routes = require('./routes');

async function main() {
    // express js server
    app.use('/', routes);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    console.log(expressListEndpoints(app))
}

main().catch(console.error).then(() => {
    console.log('listening...');
});
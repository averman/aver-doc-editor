// express router imports
const express = require('express');
const router = express.Router();

const controllers = {};

// express controller for home
controllers.home = (req, res) => {
    res.send('Hello World!');
}

// express controller for api
controllers.api = (req, res) => {
}

// routes
router.get('/', controllers.home);
require('./api')(router);


// export router
module.exports = router;

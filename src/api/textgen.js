const novelai = require('../services/connector/novelai');

const textGen = {
    post : async (req, res) => {
        res.json(await novelai(req.body.prompt, req.body.options));
    }
}

module.exports = textGen;
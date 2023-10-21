const storageService = require('../services/storage')
const storage = {
    get: async (req, res) => {
        try{
            res.json(await storageService.get(req.query.key));
        } catch(e) {
            res.status(404);
            res.json({error: e.message});
        }
    },
    post: async (req, res) => {
        const key = req.body.key;
        const value = req.body.value;
        await storageService.put(key, value);
        res.json({status: 'ok'});
    }
}
module.exports = storage;
// novel ai api connector
require('dotenv').config();
const APIKEY = process.env.NOVELAI_APIKEY;

function populateOptions(options) {
    if(!options) options = {};
    if(!options.use_string) options.use_string = true;
    if(!options.temperature) options.temperature = 0.9;
    if(!options.min_length) options.min_length = 10;
    if(!options.max_length) options.max_length = 160;
    return options;
}

async function novelai(prompt, options) {
    const url = 'https://api.novelai.net/ai/generate';
    const data = {
        input: prompt,
        model: 'kayra-v1',
        parameters: populateOptions(options)
    };
    const config = {
        headers: {
            'Authorization': `Bearer ${APIKEY}`,
            'Content-Type': 'application/json'
        }
    };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: config.headers
    }).then(res => res.json());
}

module.exports = novelai;
const fs = require('fs');
const path = require('path');

function insertRecursive(obj, keys, value) {
    const tempKeys = Array.from(keys);
    if(typeof keys === 'string') {
        obj[keys] = value;
    } else if(Array.isArray(keys)) {
        let key = tempKeys.shift();
        if(!obj[key]) {
            obj[key] = {};
        }
        if(tempKeys.length === 0) {
            obj[key] = value;
        } else {
            insertRecursive(obj[key], tempKeys, value);
        }
    } else {
        throw new Error('Invalid key type');
    }
}

class PlainFileStorage {
    storagePath;
    constructor(storagePath) {
        this.storagePath = storagePath;
    }
    async put(key, value) {
        let extension, storedValue;
        if (typeof value === 'object') {
            extension = '.json';
            storedValue = JSON.stringify(value);
        } else {
            extension = '.txt';
            storedValue = value;
        }
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(this.storagePath, key + extension), storedValue, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    async get(key) {
        let extension;
        if(fs.existsSync(path.join(this.storagePath, key + '.json'))) {
            extension = '.json';
        } else if(fs.existsSync(path.join(this.storagePath, key + '.txt'))) {
            extension = '.txt';
        } else {
            throw new Error('Key not found');
        }
        let rawData = fs.readFileSync(path.join(this.storagePath, key + extension));
        if(extension === '.json') {
            return JSON.parse(rawData);
        } else {
            return rawData.toString();
        }
    }
    async list(key) {
        return new Promise((resolve, reject) => {
            fs.readdir(this.storagePath, (err, files) => {
                if(err) reject(err);
                let result = files.filter(file => file.startsWith(key)).reduce((acc, file) => {
                    let keys = file.split('.');
                    // remove extension
                    keys.pop();
                    insertRecursive(acc, keys, file);
                },{});
                resolve(result);
            });
        });
    }
}

module.exports = PlainFileStorage;
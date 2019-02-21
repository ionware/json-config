const fs = require('fs');
const path = require('path');
const process = require('process');

class ConfigFileNotFound extends Error {

}

const configContent = fs.readFileSync(path.join(__dirname, 'config.json'), function(err) {
    if (err) {
        throw new ConfigFileNotFound("Cannot read configuration file.");
    }
});
const env = process.env.NODE_ENV || 'development';
const configs = JSON.parse(configContent.toString());

function config(propChain, fallback = null) {
    let props = propChain.split('.');
    let configObject = configs[env];
    for (let prop of props) {
        if (!configObject.hasOwnProperty(prop))
            return fallback;
            
        configObject = configObject[prop];
    }

    return configObject;
}

module.exports = config;
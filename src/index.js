const fs = require('fs');
const process = require('process');

/**
 * Custom error thrown when config file required cannot be read
 * by the Filesystem
 */
class ConfigFileNotFound extends Error {

}


/**
 * The Configuration Loader and Getter Class.
 */
class Config {
    /**
     * Initilize the class.
     */
    constructor() {
        this.configs = {};
    }
    /**
     * Loads the configuration file and store in config object.
     * 
     * @param {string} filePath resolved path to config JSON file.
     */
    load(filePath) {
        const env = process.env.NODE_ENV || 'development';
        this.configs = JSON.parse(this._readConfig(filePath).toString())[env];

        return this;
    }

    /**
     * Read the configuration JSON file and pass back to load to read.
     * 
     * @param {string} filePath resolved path to config JSON file as passed in load.
     */
     _readConfig(filePath) {
        return fs.readFileSync(filePath, function(err) {
            if (err) {
                throw new ConfigFileNotFound("Cannot read configuration file.");
            }
        });
    }

    /**
     * Get the specified segment of the configuration.
     * 
     * @param {string} propChain the property to get in the loaded config object.
     * @param {any} fallback The default value to return if required property not exist.
     */
    get(propChain, fallback = null) {
        let props = propChain.split('.');
        let configObject = this.configs;
        for (let prop of props) {
            if ( !configObject.hasOwnProperty(prop))
                return fallback;
                
            configObject = configObject[prop];
        }
    
        return configObject;
    }
}

module.exports = new Config;
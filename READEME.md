![Travis Build](https://img.shields.io/travis/ionware/json-config.svg)
![NPM](https://img.shields.io/npm/v/flyconfig.svg)
![MIT](https://img.shields.io/github/license/ionware/json-config.svg)
# Flyconfig
Simple package to read JSON stored configuration in Node.js environment. The configuration are read based
on the current **NODE_ENV** environment variable.

## Setup
The package can be installed directly from NPM by running
```npm
npm install flyconfig
```

## How to use
Using the package is obviously simple and straightforward, require the package, load the file, and get the config you need.

A typical use case.
```javascript
// Returns an instance of Flyconfig
const Config = require('flyconfig');
const path = require('path');

// Loads the configuration JSOn file.
const config = Config.load(path.join(__dirname, 'config.json'));

// Get a portion from the loaded configuration
let dbUser = config.get('database.host.username');
```

An Example of the JSON stored config file *config.json*
```json
{
    "development": {
        "database": {
            "host": {
                "username": "cloud234",
                "password": "oct_093",
                "port": 4628
            }
        }
    }
    "production": {
        "database": {
            "host": {
                "username": "cloud234",
                "password": "oct_093",
                "port": 4628
            }
        },
        "mail": {
            "host": "smtp.mailtrap.io",
            "port": 53,
            "username": "geek44",
            "password": "orange_24"
        }
    }
}
```
Configuration files are loaded based on the current **NODE_ENV**, if it is not set, it defaults to *development*, therefore the developement portion of the *config.json* is loaded for reference.

## API

- Load: 
The load API is use to load configuration. The load must be called first on the returned instance of Flyconfig object (returned when required) before trying to get any config.
```javascript
...
config.load('path/to/config');
```
It required as argument, the resolved path to the location of config JSON file, and return a chainable instance of itself.

- Get: 
It returns a portion of the requested configuration, or returns undefined if not found. Alternatively, it returns the second optional arguments if it is not found.
```javascript
config.get(string, [, optional (any)]);
```
    - string: the portion of the loaded configuration required e.g *"database.port"*
    - optional argument is returned if the portion is not available within the loaded config.
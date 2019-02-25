const expect = require('chai').expect;
const config = require('../src/index');
const path = require('path');
const configPath = path.join(__dirname, 'config.test.json');

describe('Flyconfig', function() {
    it('should load config', function() {
        expect(config.load(configPath)).to.not.throw;
    });

    it('should throw error if config path not exist', function() {
        expect(config.load(configPath)).to.throw;
    });

    it('should load configuration based on environment', function() {
        expect(config.load(configPath).configs)
            .to.have.own.property("database");
    });

    describe("Get API", function() {
        _config = config.load(configPath);

        it("should read a config", function() {
            expect(_config.get('database.host')).to.equal('localhost');
        });

        it('should get any section of the config as required', function() {
            let clusters = _config.get('database.username.cluster');
            expect(clusters).to.be.an('array')
                .that.include.members(['cl1', 'cl2', 'cl3'])
                .but.not.include('cl4');
        });

        it('should return default if property not found', function() {
            expect(_config.get('database.host.port.number', 27017)).to.equal(27017)
        });
    });
});
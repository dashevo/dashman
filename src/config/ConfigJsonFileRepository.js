const fs = require('fs');

const Config = require('./Config');
const ConfigCollection = require('./ConfigCollection');

const ConfigFileNotFoundError = require('./errors/ConfigFileNotFoundError');
const InvalidConfigFileFormatError = require('./errors/InvalidConfigFileFormatError');

class ConfigJsonFileRepository {
  /**
   * @param configFilePath
   */
  constructor(configFilePath) {
    this.configFilePath = configFilePath;
  }

  /**
   * Load configs from file
   *
   * @returns {Promise<ConfigCollection>}
   */
  async read() {
    if (!fs.existsSync(this.configFilePath)) {
      throw new ConfigFileNotFoundError(this.configFilePath);
    }

    const configFileJSON = fs.readFileSync(this.configFilePath, 'utf8');

    let configFileData;
    try {
      configFileData = JSON.parse(configFileJSON);
    } catch (e) {
      throw new InvalidConfigFileFormatError(this.configFilePath, e);
    }

    const configs = Object.entries(configFileData.configs)
      .map(([name, options]) => new Config(name, options));

    return new ConfigCollection(configs, configFileData.currentConfigName);
  }

  /**
   * Save configs to file
   *
   * @param {ConfigCollection} configCollection
   * @returns {Promise<void>}
   */
  async write(configCollection) {
    const configFileData = {
      currentConfigName: configCollection.getCurrentConfigName(),
    };

    configFileData.configs = configCollection.getAllConfigs().reduce((configsMap, config) => {
      // eslint-disable-next-line no-param-reassign
      configsMap[config.getName()] = config.getOptions();

      return configsMap;
    }, {});

    const configFileJSON = JSON.stringify(configFileData);

    fs.writeFileSync(this.configFilePath, configFileJSON, 'utf8');
  }
}

module.exports = ConfigJsonFileRepository;

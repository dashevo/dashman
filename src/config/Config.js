const Ajv = require('ajv');

const lodashGet = require('lodash.get');
const lodashSet = require('lodash.set');
const lodashCloneDeep = require('lodash.clonedeep');

const configJsonSchema = require('./configJsonSchema');

const convertObjectToEnvs = require('./convertObjectToEnvs');

const applyTemplateToFile = require('./applyTemplateToFile');

const InvalidOptionPathError = require('./errors/InvalidOptionPathError');
const InvalidOptionError = require('./errors/InvalidOptionError');
const InvalidOptionsError = require('./errors/InvalidOptionsError');
const OptionIsNotSetError = require('./errors/OptionIsNotSetError');

class Config {
  /**
   * @param {string} name
   * @param {Object} options
   */
  constructor(name, options = {}) {
    this.name = name;

    this.setOptions(options);
  }

  /**
   * Get name
   */
  getName() {
    return this.name;
  }

  /**
   * Get config option
   *
   * @param {string} path
   * @param {boolean} [isRequired=false]
   */
  get(path, isRequired = false) {
    const value = lodashGet(this.options, path);

    if (value === undefined) {
      throw new InvalidOptionPathError(path);
    }

    if (isRequired && value === null) {
      throw new OptionIsNotSetError(this, path);
    }

    return value;
  }

  /**
   * Set config option
   */
  set(path, value) {
    const clonedOptions = lodashCloneDeep(this.options);

    lodashSet(clonedOptions, path, value);

    const isValid = Config.ajv.validate(configJsonSchema, clonedOptions);

    if (!isValid) {
      if (Config.ajv.errors[0].keyword === 'additionalProperties') {
        throw new InvalidOptionPathError(path);
      }

      const message = Config.ajv.errorsText(undefined, { dataVar: 'config' });

      throw new InvalidOptionError(
        path,
        value,
        Config.ajv.errors,
        message,
      );
    }

    this.options = clonedOptions;

    return this;
  }

  /**
   * Get options
   *
   * @returns {Object}
   */
  getOptions() {
    return this.options;
  }

  /**
   * Set options
   *
   * @param {Object} options
   * @returns {Config}
   */
  setOptions(options) {
    const clonedOptions = lodashCloneDeep(options);

    const isValid = Config.ajv.validate(configJsonSchema, clonedOptions);

    if (!isValid) {
      const message = Config.ajv.errorsText(undefined, { dataVar: 'config' });

      throw new InvalidOptionsError(
        clonedOptions,
        Config.ajv.errors,
        message,
      );
    }

    this.options = clonedOptions;

    return this;
  }

  toEnvs() {
    return {
      COMPOSE_PROJECT_NAME: `dash_masternode_${this.getName()}`,
      ...convertObjectToEnvs(this.getOptions()),
    };
  }

  renderConfigs() {
    applyTemplateToFile('./configs/evonet/dapi/insight/dashcore-node.jsont');
    return('done');
  }
}

Config.ajv = new Ajv({ coerceTypes: true });

module.exports = Config;

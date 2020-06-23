const Listr = require('listr');

const { flags: flagTypes } = require('@oclif/command');

const BaseCommand = require('../oclif/command/BaseCommand');
const UpdateRendererWithOutput = require('../oclif/renderer/UpdateRendererWithOutput');
const MuteOneLineError = require('../oclif/errors/MuteOneLineError');

const PRESETS = require('../presets');
const wait = require('../util/wait');

class SetupForLocalDevelopmentCommand extends BaseCommand {
  /**
   *
   * @param {Object} args
   * @param {Object} flags
   * @param {generateToAddressTask} generateToAddressTask
   * @param {registerMasternodeTask} registerMasternodeTask
   * @param {initTask} initTask
   * @param {DockerCompose} dockerCompose
   * @return {Promise<void>}
   */
  async runWithDependencies(
    { port: coreP2pPort, 'external-ip': externalIp },
    {
      'drive-image-build-path': driveImageBuildPath,
      'dapi-image-build-path': dapiImageBuildPath,
    },
    generateToAddressTask,
    registerMasternodeTask,
    initTask,
    dockerCompose,
  ) {
    const preset = PRESETS.LOCAL;
    const network = 'testnet';
    const amount = 2000;

    const tasks = new Listr([{
      title: 'Setup masternode for local development',
      task: () => (
        new Listr([
          {
            title: `Generate ${amount} dash to address`,
            task: () => (
              generateToAddressTask(
                preset,
                amount,
              )
            ),
          },
          {
            title: 'Wait core to stop',
            task: async () => {
              const stopAllContainers = this.container.resolve('stopAllContainers');
              const startedContainers = this.container.resolve('startedContainers');

              await stopAllContainers(startedContainers.getContainers());
            },
          },
          {
            title: 'Register masternode',
            task: () => (
              registerMasternodeTask(preset)
            ),
          },
          {
            title: 'Wait core to stop',
            task: async () => {
              const stopAllContainers = this.container.resolve('stopAllContainers');
              const startedContainers = this.container.resolve('startedContainers');

              await stopAllContainers(startedContainers.getContainers());
            },
          },
          {
            title: 'Initialize platform',
            task: () => (
              initTask(
                preset,
                network,
                driveImageBuildPath,
                dapiImageBuildPath,
              )
            ),
          },
        ])
      ),
    },
    ],
    { collapse: false, renderer: UpdateRendererWithOutput });

    try {
      await tasks.run({
        externalIp,
        coreP2pPort,
      });
    } catch (e) {
      throw new MuteOneLineError(e);
    } finally {
      await dockerCompose.down(preset);
    }
  }
}

SetupForLocalDevelopmentCommand.description = `Setup for development
...
Setup masternode for local development
`;

SetupForLocalDevelopmentCommand.args = [{
  name: 'external-ip',
  required: true,
  description: 'masternode external IP',
}, {
  name: 'port',
  required: true,
  description: 'masternode P2P port',
}];

SetupForLocalDevelopmentCommand.flags = {
  'drive-image-build-path': flagTypes.string({ description: 'drive\'s docker image build path', default: null }),
  'dapi-image-build-path': flagTypes.string({ description: 'dapi\'s docker image build path', default: null }),
};

module.exports = SetupForLocalDevelopmentCommand;

const { Listr } = require('listr2');
const { PRESET_LOCAL } = require('../../../constants');

const wait = require('../../../util/wait');

/**
 * @param {registerMasternodeTask} registerMasternodeTask
 * @param {generateToAddressTask} generateToAddressTask
 * @param {tenderdashInitTask} tenderdashInitTask
 * @param {initTask} initTask
 * @param {startNodeTask} startNodeTask
 * @param {ConfigFile} configFile
 * @param {writeServiceConfigs} writeServiceConfigs
 * @param {renderServiceTemplates} renderServiceTemplates
 * @param {DockerCompose} dockerCompose
 */
function setupLocalPresetTaskFactory(
  registerMasternodeTask,
  generateToAddressTask,
  tenderdashInitTask,
  initTask,
  startNodeTask,
  configFile,
  writeServiceConfigs,
  renderServiceTemplates,
  dockerCompose,
) {
  /**
   * @typedef {setupLocalPresetTask}
   * @return {Listr}
   */
  function setupLocalPresetTask() {
    const amount = 10000;

    return new Listr([
      {
        title: 'Set the number of nodes',
        enabled: (ctx) => ctx.nodeCount === null,
        task: async (ctx, task) => {
          ctx.nodeCount = await task.prompt({
            type: 'Numeral',
            message: 'Enter the number of nodes',
            initial: 2,
            float: false,
            min: 1,
            max: 6,
            validate: (state) => {
              if (+state.value < 1 || +state.value > 6) {
                return 'You must set from 1 up to 6 nodes';
              }

              return true;
            },
          });

          // TODO: make sure validation works
        },
      },
      {
        // hidden task to dynamically create
        // multinode tasks listr
        task: (ctx) => {
          const subTasks = [];

          for (let i = 0; i < ctx.nodeCount; i++) {
            const configRefernce = `config_${i + 1}`;

            subTasks.push({
              title: `Setup node #${i + 1}`,
              task: () => new Listr([
                {
                  title: 'Create config',
                  task: () => {
                    const configName = `${ctx.preset}_${i + 1}`;

                    if (configFile.isConfigExists(configName)) {
                      ctx[configRefernce] = configFile.getConfig(configName);
                    } else {
                      ctx[configRefernce] = configFile.createConfig(configName, PRESET_LOCAL);
                    }

                    const config = ctx[configRefernce];

                    config.set('description', `config for local node #${i + 1}`);
                    config.set('core.p2p.port', 20001 + (i * 100));
                    config.set('core.rpc.port', 20002 + (i * 100));

                    const p2pSeeds = [];
                    for (let n = 0; n < ctx.nodeCount; n++) {
                      if (n === i) {
                        continue;
                      }

                      p2pSeeds.push({
                        host: 'host.docker.internal',
                        port: 20001 + (n * 100),
                      });
                    }

                    config.set('core.p2p.seeds', p2pSeeds);

                    config.set('platform.dapi.nginx.http.port', 3000 + (i * 100));
                    config.set('platform.dapi.nginx.grpc.port', 3010 + (i * 100));
                    config.set('platform.drive.tenderdash.p2p.port', 26656 + (i * 100));
                    config.set('platform.drive.tenderdash.rpc.port', 26657 + (i * 100));
                    config.set('platform.drive.abci.log.prettyFile.path', `/tmp/drive_pretty_${i}.log`);
                    config.set('platform.drive.abci.log.jsonFile.path', `/tmp/drive_json_${i}.log`);

                    const configFiles = renderServiceTemplates(ctx[configRefernce]);
                    writeServiceConfigs(ctx[configRefernce].getName(), configFiles);
                  },
                },
                {
                  title: `Generate ${amount} dash to local wallet`,
                  task: () => generateToAddressTask(ctx[configRefernce], amount),
                },
                {
                  title: 'Register masternode',
                  task: () => registerMasternodeTask(ctx[configRefernce]),
                },
                {
                  title: 'Initialize Tenderdash',
                  task: () => tenderdashInitTask(ctx[configRefernce]),
                },
              ]),
            });
          }

          return new Listr(subTasks);
        },
      },
      {
        title: 'Interconnect Tenderdash nodes',
        task: (ctx) => {
          for (let i = 0; i < ctx.nodeCount; i++) {
            const configRefernce = `config_${i}`;

            const p2pPeers = [];
            const validators = [];
            for (let n = 0; n < ctx.nodeCount; n++) {
              if (n === i) {
                continue;
              }

              p2pPeers.push({
                // TOOD: get from show_id, should be in node_key in the config
                id: '08dd8e2b1968c1323b9460949971132653ece7d8',
                host: 'host.docker.internal',
                port: 26656 + (n * 100),
              });

              // TODO: gather all validators and updated it everywhere
              validators.push({

              });
            }

            // TODO: update genesis time everywhere
            // TODO: update chainId as well (dash_masternode_local_${random_number}) should be equal everywhere

            const configFiles = renderServiceTemplates(ctx[configRefernce]);
            writeServiceConfigs(ctx[configRefernce].getName(), configFiles);
          }
        },
      },
      {
        title: 'Start first masternode',
        task: async () => startNodeTask(
          ctx[configRefernce],
          {
            driveImageBuildPath: ctx.driveImageBuildPath,
            dapiImageBuildPath: ctx.dapiImageBuildPath,
            isMinerEnabled: true,
          },
        ),
      },
      {
        title: 'Wait 20 seconds to ensure all services are running',
        task: async () => {
          await wait(20000);
        },
      },
      {
        title: 'Initialize Platform',
        task: () => initTask(ctx[configRefernce]),
      },
      {
        title: 'Stop first node',
        task: async () => dockerCompose.stop(ctx[configRefernce].toEnvs()),
      },
    ]);
  }

  return setupLocalPresetTask;
}

module.exports = setupLocalPresetTaskFactory;

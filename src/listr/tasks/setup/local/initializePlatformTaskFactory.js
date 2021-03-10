const { Listr } = require('listr2');

const isSeedNode = require('../../../../util/isSeedNode');
const getSeedNodeConfig = require('../../../../util/getSeedNodeConfig');
const isPlatformServicesEnabled = require('../../../../util/isPlatformServicesEnabled');

/**
 *
 * @param {startNodeTask} startNodeTask
 * @param {initTask} initTask
 * @param {waitForNodeToBeReadyTask} waitForNodeToBeReadyTask
 * @param {activateCoreSpork} activateCoreSpork
 * @param {enableCoreQuorums} enableCoreQuorums
 * @param {createRpcClient} createRpcClient
 * @param {DockerCompose} dockerCompose
 * @return {initializePlatformTask}
 */
function initializePlatformTaskFactory(
  startNodeTask,
  initTask,
  waitForNodeToBeReadyTask,
  activateCoreSpork,
  enableCoreQuorums,
  createRpcClient,
  dockerCompose,
) {
  /**
   * @typedef initializePlatformTask
   * @param {Config[]} configGroup
   * @return {Listr}
   */
  function initializePlatformTask(configGroup) {
    return new Listr([
      {
        title: 'Starting nodes',
        task: async (ctx) => {
          const startNodeTasks = configGroup.map((config) => ({
            title: `Starting ${config.getName()} node`,
            task: () => startNodeTask(
              config,
              {
                driveImageBuildPath: ctx.driveImageBuildPath,
                dapiImageBuildPath: ctx.dapiImageBuildPath,
                // run miner only at seed node
                isMinerEnabled: isSeedNode(config),
              },
            ),
          }));

          return new Listr(startNodeTasks);
        },
      },
      {
        title: 'Await for nodes to be ready',
        task: async () => {
          await Promise.all(
            configGroup
              .filter(isPlatformServicesEnabled)
              .map(waitForNodeToBeReadyTask),
          );
        },
      },
      {
        title: 'Enable sporks',
        task: async (ctx) => {
          const seedConfig = getSeedNodeConfig(configGroup);

          ctx.rpcClient = createRpcClient({
            port: seedConfig.get('core.rpc.port'),
            user: seedConfig.get('core.rpc.user'),
            pass: seedConfig.get('core.rpc.password'),
          });

          const sporks = [
            'SPORK_2_INSTANTSEND_ENABLED',
            'SPORK_3_INSTANTSEND_BLOCK_FILTERING',
            'SPORK_9_SUPERBLOCKS_ENABLED',
            'SPORK_17_QUORUM_DKG_ENABLED',
            'SPORK_19_CHAINLOCKS_ENABLED',
          ];

          await Promise.all(
            sporks.map(async (spork) => (
              activateCoreSpork(ctx.rpcClient, spork))),
          );
        },
      },
      {
        title: 'Wait for quorums to be enabled',
        task: async (ctx) => {
          const seedConfig = getSeedNodeConfig(configGroup);
          const network = seedConfig.get('network');

          await enableCoreQuorums(ctx.rpcClient, network);
        },
      },
      {
        task: () => initTask(configGroup[0]),
      },
      {
        task: () => {
          // set platform data contracts
          const [initializedConfig, ...otherConfigs] = configGroup;

          otherConfigs
            .filter((config) => !isSeedNode(config))
            .forEach((config) => {
              config.set('platform.dpns', initializedConfig.get('platform.dpns'));
              config.set('platform.dashpay', initializedConfig.get('platform.dashpay'));
            });
        },
      },
      {
        title: 'Stopping nodes',
        task: async () => {
          // So we stop the miner first, as there's a chance that MNs will get banned
          // if the miner is still running when stopping them
          const stopNodeTasks = configGroup.reverse().map((config) => ({
            title: `Stop ${config.getName()} node`,
            task: () => dockerCompose.stop(config.toEnvs()),
          }));

          return new Listr(stopNodeTasks);
        },
      },
    ]);
  }

  return initializePlatformTask;
}

module.exports = initializePlatformTaskFactory;

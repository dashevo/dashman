const waitForQuorumCommitments = require('./quorum/waitForQuorumCommitements');
const waitForQuorumPhase = require('./quorum/waitForQuorumPhase');
const waitForNodesToHaveTheSameHeight = require('./waitForNodesToHaveTheSameHeight');
const waitForQuorumConnections = require('./quorum/waitForQuorumConnections');
const waitForMasternodeProbes = require('./quorum/waitForMasternodeProbes');

const GENESIS_TIME = 1417713337;

class CoreRegtestNetwork {
  /**
   *
   * @param {CoreService[]} coreServices
   * @param {string} network
   * @param {number} [mocktime]
   * @param network
   */
  constructor(coreServices, network, mocktime= GENESIS_TIME) {
    this.coreServices = coreServices;
    this.mocktime = mocktime;
    this.network = network;
  }

  /**
   *
   * @return {CoreService[]}
   */
  getCoreServices() {
    return this.coreServices;
  }

  /**
   * Bumps mocktime and sets it for all nodes
   * @param {number} time - time to add to the mocktime
   * @return {Promise<void>}
   */
  async bumpMocktime(time) {
    this.mocktime += time;
    for (const rpcClient of this.getAllRpcClients()) {
      await rpcClient.setMockTime(this.mocktime);
    }
  }

  /**
   *
   * @return {RpcClient[]}
   */
  getAllRpcClients() {
    return this.coreServices.map(coreService => coreService.getRpcClient());
  }

  /**
   *
   * @param {number} [param]
   * @return {Promise<*>}
   */
  async quorumList(param) {
    const rpc = this.coreServices[0].getRpcClient();
    const { result } = await rpc.quorum('list', param);

    return result;
  }

  /**
   *
   * @param {number} param
   * @param {string} taram
   * @return {Promise<*>}
   */
  async quorumInfo(param, taram) {
    const rpc = this.coreServices[0].getRpcClient();
    const { result } = await rpc.quorum('info', param, taram);

    return result;
  }

  /**
   *
   * @param {number} count - block count to generate
   * @return {Promise<void>}
   */
  async generate(count) {
    const rpc = this.coreServices[0].getRpcClient();
    await rpc.generate(count);
  }

  /**
   *
   * @return {Promise<void>}
   */
  async waitForAllNodesToHaveTheSameHeight() {
    return waitForNodesToHaveTheSameHeight(this.getAllRpcClients());
  }

  /**
   *
   * @param {string} quorumHash
   * @return {Promise<boolean>}
   */
  async waitForQuorumCommitments(quorumHash) {
    return waitForQuorumCommitments(this.getAllRpcClients(), quorumHash);
  }

  /**
   *
   * @param {string} quorumHash
   * @param {number} phase
   * @param {number} expectedMembersCount
   * @param {string} [checkReceivedMessagesType]
   * @param {number} [receivedMessagesCount]
   * @return {Promise<boolean>}
   */
  async waitForQuorumPhase(quorumHash, phase, expectedMembersCount, checkReceivedMessagesType, receivedMessagesCount= 0) {
    return waitForQuorumPhase(this.getAllRpcClients(), quorumHash, phase, expectedMembersCount, checkReceivedMessagesType, receivedMessagesCount);
  }

  /**
   *
   * @param {number} expectedConnectionsCount
   * @return {Promise<boolean>}
   */
  async waitForQuorumConnections(expectedConnectionsCount) {
    return waitForQuorumConnections(this, expectedConnectionsCount);
  }

  /**
   *
   * @param {number} [timeout]
   * @return {Promise<boolean>}
   */
  async waitForMasternodeProbes(timeout) {
    return waitForMasternodeProbes(this, timeout);
  }
}

module.exports = CoreRegtestNetwork;

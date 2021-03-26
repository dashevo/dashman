const wait = require('../../util/wait');

/**
 *
 * @param {string} quorumHash
 * @param {RpcClient[]} rpcClients
 * @return {Promise<boolean>}
 */
async function checkDKGSessionCommitments(quorumHash, rpcClients) {
  let allOk = true;

  for (const rpc of rpcClients) {
    const { result: dkgStatus } = await rpc.quorum('dkgstatus');

    console.log("Dkg status:");
    console.dir(dkgStatus);
    if (!dkgStatus.minableCommitments) {
      allOk = false;
      break;
    }

    const testQuorumCommitment = dkgStatus.minableCommitments["llmq_test"];
    console.log("Commitment:");
    console.dir(testQuorumCommitment);

    if (!testQuorumCommitment) {
      allOk = false;
      break;
    }

    console.log("Comparing quorum hashes:");
    console.log(testQuorumCommitment.quorumHash, quorumHash);
    if (testQuorumCommitment.quorumHash !== quorumHash) {
      allOk = false;
      break;
    }
  }

  return allOk;
}

/**
 *
 * @param {RpcClient[]} rpcClients
 * @param {string} quorumHash
 * @param {number} [timeout]
 * @param {number} [waitBeforeRetry]
 * @return {Promise<void>}
 */
async function waitForQuorumCommitments(rpcClients,quorumHash, timeout = 15000, waitBeforeRetry = 100) {
  const deadline = Date.now() + timeout;
  let isReady = false;

  while (!isReady) {
    await wait(waitBeforeRetry);

    isReady = await checkDKGSessionCommitments(quorumHash, rpcClients);

    if (Date.now() > deadline) {
      throw new Error(`waitForQuorumCommitments deadline of ${timeout} exceeded`);
    }
  }
}

module.exports = waitForQuorumCommitments;

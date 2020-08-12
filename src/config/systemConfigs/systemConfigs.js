const lodashMerge = require('lodash.merge');

const NETWORKS = require('../../networks');

const defaultConfig = {
  description: null,
  core: {
    docker: {
      image: 'dashpay/dashd',
    },
    version: '0.15',
    p2p: {
      port: 20001,
    },
    masternode: {
      operator: {
        privateKey: null,
      },
    },
  },
  platform: {
    dapi: {
      envoy: {
        docker: {
          image: 'envoyproxy/envoy',
        },
        version: 'v1.14-latest',
      },
      nginx: {
        docker: {
          image: 'nginx',
        },
        version: 'latest',
      },
      api: {
        docker: {
          image: 'dashpay/dapi',
        },
        version: '0.14',
      },
      insight: {
        docker: {
          image: 'dashpay/insight-api',
        },
        version: 'latest',
      },
    },
    drive: {
      mongodb: {
        docker: {
          image: 'mongo',
        },
        version: '4.2',
      },
      abci: {
        docker: {
          image: 'dashpay/drive',
        },
        version: '0.14',
      },
      tendermint: {
        docker: {
          image: 'dashpay/tendermint',
        },
        version: 'v0.32.12',
      },
    },
    dpns: {
      contractId: null,
      ownerId: null,
    },
  },
  externalIp: null,
  network: NETWORKS.TESTNET,
  compose: {
    file: 'docker-compose.yml:docker-compose.platform.yml',
  },
};

module.exports = {
  default: defaultConfig,
  local: lodashMerge({}, defaultConfig, {
    description: 'standalone node for local development',
    externalIp: '127.0.0.1',
    network: NETWORKS.LOCAL,
  }),
  evonet: lodashMerge({}, defaultConfig, {
    description: 'node with Evonet configuration',
    platform: {
      dpns: {
        contractId: 'FiBkhut4LFPMJqDWbZrxVeT6Mr6LsH3mTNTSSHJY2ape',
        ownerId: 'UZ9jAodWiFxRg82HuA1Lf3mTh4fTGSiughxqkZX5kUA',
      },
    },
    network: NETWORKS.EVONET,
  }),
  testnet: lodashMerge({}, defaultConfig, {
    description: 'node with testnet configuration',
    core: {
      p2p: {
        port: 19999,
      },
    },
    network: NETWORKS.TESTNET,
    compose: {
      file: 'docker-compose.yml',
    },
  }),
};
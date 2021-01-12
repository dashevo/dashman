const lodashMerge = require('lodash.merge');

const NETWORKS = require('../../networks');

const baseConfig = {
  description: 'base config for use as template',
  core: {
    docker: {
      image: 'dashpay/dashd:0.17.0.0-rc2',
    },
    p2p: {
      port: 20001,
      seeds: [],
    },
    rpc: {
      port: 20002,
      user: 'dashrpc',
      password: 'rpcpassword',
    },
    spork: {
      address: null,
      privateKey: null,
    },
    masternode: {
      enable: true,
      operator: {
        privateKey: null,
      },
    },
    miner: {
      enable: false,
      interval: '2.5m',
      address: null,
    },
    devnetName: null,
  },
  platform: {
    dapi: {
      envoy: {
        docker: {
          image: 'envoyproxy/envoy:v1.16-latest',
        },
      },
      nginx: {
        http: {
          port: 3000,
        },
        https: {
          port: 443,
        },
        grpc: {
          port: 3010,
        },
        grpcs: {
          port: 1443,
        },
        docker: {
          image: 'nginx:latest',
        },
        ssl: {
          provider: 'zerossl',
          enable: false,
          zerossl: {
            apikey: null,
          },
        },
        rateLimiter: {
          enable: true,
          rate: 120,
          burst: 300,
        },
      },
      api: {
        docker: {
          image: 'dashpay/dapi:0.17',
        },
      },
      insight: {
        docker: {
          image: 'dashpay/insight-api:3.1.1',
        },
      },
    },
    drive: {
      mongodb: {
        docker: {
          image: 'mongo:4.2',
        },
      },
      abci: {
        docker: {
          image: 'dashpay/drive:0.17',
        },
        log: {
          level: 'info',
        },
      },
      tenderdash: {
        docker: {
          image: 'dashpay/tenderdash',
        },
        p2p: {
          port: 26656,
          persistentPeers: [],
        },
        rpc: {
          port: 26657,
        },
        validatorKey: {

        },
        nodeKey: {

        },
        genesis: {

        },
      },
      skipAssetLockConfirmationValidation: false,
      passFakeAssetLockProofForTests: false,
    },
    dpns: {
      contract: {
        id: null,
        blockHeight: null,
      },
      ownerId: null,
    },
    dashpay: {
      contract: {
        id: null,
        blockHeight: null,
      },
    },
  },
  externalIp: null,
  network: NETWORKS.TESTNET,
  compose: {
    file: 'docker-compose.yml:docker-compose.platform.yml',
  },
  environment: 'production',
};

module.exports = {
  base: baseConfig,
  local: lodashMerge({}, baseConfig, {
    description: 'standalone node for local development',
    platform: {
      dapi: {
        nginx: {
          rateLimiter: {
            enable: false,
          },
        },
      },
      drive: {
        skipAssetLockConfirmationValidation: true,
        passFakeAssetLockProofForTests: true,
      },
    },
    externalIp: '127.0.0.1',
    environment: 'development',
    network: NETWORKS.LOCAL,
  }),
  evonet: lodashMerge({}, baseConfig, {
    description: 'node with Evonet configuration',
    core: {
      docker: {
        image: 'dashpay/dashd:0.16',
      },
      p2p: {
        seeds: [
          {
            host: 'seed-1.evonet.networks.dash.org',
            port: 20001,
          },
          {
            host: 'seed-2.evonet.networks.dash.org',
            port: 20001,
          },
          {
            host: 'seed-3.evonet.networks.dash.org',
            port: 20001,
          },
          {
            host: 'seed-4.evonet.networks.dash.org',
            port: 20001,
          },
          {
            host: 'seed-5.evonet.networks.dash.org',
            port: 20001,
          },
        ],
      },
      spork: {
        address: 'yQuAu9YAMt4yEiXBeDp3q5bKpo7jsC2eEj',
      },
      devnetName: 'evonet-8',
    },
    platform: {
      dpns: {
        contract: {
          id: '3VvS19qomuGSbEYWbTsRzeuRgawU3yK4fPMzLrbV62u8',
          blockHeight: 35,
        },
        ownerId: 'Gxiu28Lzfj66aPBCxD7AgTbbauLf68jFLNibWGU39Fuh',
      },
      drive: {
        tenderdash: {
          p2p: {
            persistentPeers: [
              {
                id: '08dd8e2b1968c1323b9460949971132653ece7d8',
                host: '54.69.71.240',
                port: 26656,
              },
              {
                id: '622758cfb580133f2a33b1a9e7f3bf1591da299d',
                host: '34.212.169.216',
                port: 26656,
              },
              {
                id: 'f39664e7d911c42ce17cc0f4c8cc322f1b72c29e',
                host: '34.214.12.133',
                port: 26656,
              },
              {
                id: '27904c3833d4d8d436152bb9138fb7a18fb071fe',
                host: '54.190.136.191',
                port: 26656,
              },
              {
                id: '23e501d4eaf2edc1d5a49f6349327e9d4fb4ccdb',
                host: '34.221.185.231',
                port: 26656,
              },
              {
                id: '520378c6ba73aebab3d1e25388d1b9a6ddc2ad86',
                host: '18.236.73.143',
                port: 26656,
              },
              {
                id: '84b58e977d1e50fb345e03395d6a411adba74da9',
                host: '35.167.241.7',
                port: 26656,
              },
              {
                id: '85f7bb17e40a49d6724504ca5caa6df8e42b74e4',
                host: '52.33.251.111',
                port: 26656,
              },
              {
                id: '2570192e340943293eaba0d7d71182de01fe79a6',
                host: '34.221.226.198',
                port: 26656,
              },
              {
                id: '7ac52a4464c5047d22a84eca3d218202277e6db0',
                host: '54.202.214.68',
                port: 26656,
              },
              {
                id: 'b575d09fe651357dc677b5d5c2ec0982251e7dca',
                host: '54.186.22.30',
                port: 26656,
              },
              {
                id: '86008634cb79d53fb6c286a6e682c0891328ac2e',
                host: '54.186.129.244',
                port: 26656,
              },
              {
                id: '4ab0e5e0c56adf0347d17f67171be54cca0a02e9',
                host: '54.186.145.12',
                port: 26656,
              },
              {
                id: 'c73217945855cedf1fc196b584fa5632538e0664',
                host: '52.88.52.65',
                port: 26656,
              },
              {
                id: '9659193b7d35b0f4935e0ce81e0baed15c19053a',
                host: '54.190.1.129',
                port: 26656,
              },
              {
                id: '3527b5004648540a489492f1e9a5aa272bc0832b',
                host: '34.216.133.190',
                port: 26656,
              },
              {
                id: '9e9e0b8252bd58ea19caa31737b2d2172fb0cef9',
                host: '34.221.5.65',
                port: 26656,
              },
              {
                id: '2b1817b5eca46f5852a4d4865c5bd8f007a85848',
                host: '54.149.181.16',
                port: 26656,
              },
              {
                id: '1ac504d40d879437250622474b636ed1ca723945',
                host: '54.203.2.102',
                port: 26656,
              },
              {
                id: 'd8eb0fa388c3753c9a8444d421a79bf8e6c7143a',
                host: '18.236.235.220',
                port: 26656,
              },
              {
                id: '49fc482748d0426146e21a7e453cc4c9c2438d54',
                host: '18.236.139.199',
                port: 26656,
              },
              {
                id: 'd748a3334109e51793ae735220e19b03fc1ed568',
                host: '34.220.38.59',
                port: 26656,
              },
              {
                id: 'fe6d601370186e71fc1812d3f616b223137fc9a1',
                host: '54.244.159.60',
                port: 26656,
              },
              {
                id: '62a0c0d795424081d9cbb5ab1296398859b736eb',
                host: '18.237.255.133',
                port: 26656,
              },
              {
                id: 'cbf9dad753193e6620d678368240aa5657ab530e',
                host: '34.220.159.57',
                port: 26656,
              },
              {
                id: '8200d0ca52f3296729232f1b741b24d8d7137232',
                host: '18.237.194.30',
                port: 26656,
              },
              {
                id: 'e0c512cd361e49c1117bc1f881223cb558bc37ab',
                host: '52.32.251.203',
                port: 26656,
              },
              {
                id: 'd7ff609df651cf448ad5fba7f35e2de61057ff3a',
                host: '34.222.91.196',
                port: 26656,
              },
              {
                id: 'a3dcfd041b12c6629c41a670377c7a945da3a848',
                host: '34.219.43.9',
                port: 26656,
              },
              {
                id: 'c1499a9650a96a8034e606df5b90f76b36051021',
                host: '54.244.203.43',
                port: 26656,
              },
              {
                id: 'a6045508e21d4946b0b6a8f9924882a6bdf0fbc9',
                host: '54.245.217.116',
                port: 26656,
              },
              {
                id: 'b88de2d0f943f4e0748039c0d6d72c6511032469',
                host: '54.189.121.60',
                port: 26656,
              },
              {
                id: '77316bb767e52216b777f171a1382aa573ec6608',
                host: '52.88.38.138',
                port: 26656,
              },
              {
                id: 'c1b6760ce4267b4ea7e90d54b0e9d4ab95483051',
                host: '54.185.186.111',
                port: 26656,
              },
              {
                id: '7aec8ce958561379eb85ebadec1f0c93c83db6e8',
                host: '35.164.4.147',
                port: 26656,
              },
              {
                id: '881b7d135b29797fcb652c7c7807c9f2b243fe9a',
                host: '54.188.72.112',
                port: 26656,
              },
              {
                id: 'f52237cfc900b26589969bd93b0ca775ebe00f76',
                host: '52.88.13.87',
                port: 26656,
              },
              {
                id: '84804842f805684bb831b5799d3628a5e31e6fef',
                host: '54.149.99.26',
                port: 26656,
              },
              {
                id: 'fc85b3e8212c17f231a332395a3923a7202ba794',
                host: '54.212.206.131',
                port: 26656,
              },
              {
                id: '856d39ed1d493a5436188c14bc2e11d87863f393',
                host: '52.25.73.91',
                port: 26656,
              },
              {
                id: '4ab81caa5be52118e442496e31b51d5e7fb1e020',
                host: '54.187.128.127',
                port: 26656,
              },
              {
                id: 'a97df28a6961287acac36b7e8632e9988e614841',
                host: '34.223.226.20',
                port: 26656,
              },
              {
                id: '74866833db1577a9916a09592f5ab76b455db15d',
                host: '35.167.226.182',
                port: 26656,
              },
              {
                id: 'de7241a53bb157cb78429e79b3074f87801721d8',
                host: '54.189.73.226',
                port: 26656,
              },
              {
                id: '7220ea2cc1474dbb979171932b191643dc508519',
                host: '34.219.79.193',
                port: 26656,
              },
              {
                id: '49b3cd3c6fd8eccd3e81b468512b91a87e22a60a',
                host: '54.186.133.94',
                port: 26656,
              },
              {
                id: '0786707a967d5032ce552d3652de9d724acf820c',
                host: '54.190.26.250',
                port: 26656,
              },
              {
                id: 'bb943d27e94ddeb18cef0bb8772df4b09a727e7d',
                host: '54.184.71.154',
                port: 26656,
              },
              {
                id: 'd45a481e4845fcca3f14f333803190eff05f5b0d',
                host: '54.200.73.105',
                port: 26656,
              },
            ],
          },
          genesis: {
            genesis_time: '2020-10-29T14:54:55.243362093Z',
            chain_id: 'dash-devnet-evonet-8',
            consensus_params: {
              block: {
                max_bytes: '22020096',
                max_gas: '-1',
                time_iota_ms: '5000',
              },
              evidence: {
                max_age: '100000',
              },
              validator: {
                pub_key_types: [
                  'ed25519',
                ],
              },
            },
            validators: [
              {
                address: '8AA28E29CBE6F8C44228AFF79212A05211531D31',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'YY8qJE2Jyl90SN0NeV4G+btces5S2MLxkdHu1dzK9gE=',
                },
                power: '1',
                name: 'masternode-1',
              },
              {
                address: '9776D772EF437DBC550BFCFDF00BA85748F73F05',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'Q2jE22KAsTg+mzcODSuQR7cNFyaDfhn2Bf5+y0Ssm30=',
                },
                power: '1',
                name: 'masternode-2',
              },
              {
                address: 'C8F7D628EED93D33AA6C264BFFB3CD9476058FB1',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'hS+U08pOWjxsvqVS3vq0qD8yjQUHWH1IbEjZpCWsnqo=',
                },
                power: '1',
                name: 'masternode-3',
              },
              {
                address: '09794F8EC5F1998CEA9C3E849F42EA0BC333F524',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'T5J1zf2kANtmtMpsu1EXl9OznOivWlIO5q1jpJ6B5d8=',
                },
                power: '1',
                name: 'masternode-4',
              },
              {
                address: 'BA486FE73F3242ED721C736E480261223FDE287E',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'HsEjBaDtaubMxjlG4iSIOqhflyKIY99BKkM9tcM9yOo=',
                },
                power: '1',
                name: 'masternode-5',
              },
              {
                address: '701C3E9F901B87A49BFA521BF9D504BB8C2BB98A',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'QPC+O0rctfMrfXMDsj9DnDEi8KypCED/UxtAbjK3D3I=',
                },
                power: '1',
                name: 'masternode-6',
              },
              {
                address: 'BFFB2EE1328E733BC6937EB0FDC48DDD88664C87',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'VoVlGN/CzXEkj27SrOVsE4TPYaEOjukUAM+HKKOX9p8=',
                },
                power: '1',
                name: 'masternode-7',
              },
              {
                address: '536D4E4C98F11CF73CE452516F88641E5E98C225',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'S8zd/4Y+Aa4USQqv4zQqxWsUh83J9kzjuGDMZGvs0mg=',
                },
                power: '1',
                name: 'masternode-8',
              },
              {
                address: '426AF75057755FA77DAEB57E84F112EC61BC0C23',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'VgptZSnRGd3mGj9Xw8ThWknkXiq8xchHoYsz5+PdvEY=',
                },
                power: '1',
                name: 'masternode-9',
              },
              {
                address: '07F9D83F23933B9BC5252E7AB0D6F2C1737330CF',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'nOsFaCMtxYtGPu7MsTNs+H8j5NAOFnbH8BEYKXRJOiM=',
                },
                power: '1',
                name: 'masternode-10',
              },
              {
                address: '1676685AF7DE461175E9595A73D5BE2481714EE9',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'IPz4FOI5QDIBQnt6+yohwpoI5hHLXy9dCsJ3UFpLhnw=',
                },
                power: '1',
                name: 'masternode-11',
              },
              {
                address: '7A2585A7E16BAEC975126E01568B722183D2E051',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'f7oR6yK1hYm/i7U06MvGHTFnuMEuHHnlSnqlXQRA8rY=',
                },
                power: '1',
                name: 'masternode-12',
              },
              {
                address: '8F9D9F55AD7EFCD1ECE143A11FCDF9BCC6264682',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: '5co5iELzJnRkppYLWEk31XBlBch8wcdV8FtCYeBf+GI=',
                },
                power: '1',
                name: 'masternode-13',
              },
              {
                address: 'CBFD58CED7CFFC61D6EE3A279E983D211C0639AA',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'rnwGhO9BGtMgAqkIIT4pnkVfrOhcXxsmeoFczXwhisE=',
                },
                power: '1',
                name: 'masternode-14',
              },
              {
                address: '267A351A6263D2C2BF18B7E2B94F83BF2AF0731F',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'vR7nVdkz1b03FxS5t29380qGEy+Rawl+dJBZQst6PUY=',
                },
                power: '1',
                name: 'masternode-15',
              },
              {
                address: 'FE28EDCCB8918F8EEB687771EB1A3B3CCFFBED1E',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'TdkmKdE7h694uzmY2ADVnlLP/QQUohnIhsiGN62U2e8=',
                },
                power: '1',
                name: 'masternode-16',
              },
              {
                address: 'D9A58D252185AFF88D729E82995E98A1805CEC5C',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'qjZIRbD7yU4b+0IQx7ZuAU7weA0+Nt6G1ZeEfpCrfuo=',
                },
                power: '1',
                name: 'masternode-17',
              },
              {
                address: '470CB581A6CBC3ED01AAD9411ECD7C2D9FD5C54D',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'eEQhtx3twf/Jk+QdASZ6VhTTCPB9MrJzvVk72IPRWys=',
                },
                power: '1',
                name: 'masternode-18',
              },
              {
                address: '2188A90F81D3BA3F8CBABABBA03696FE84598D88',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'Lkoq1y+9AaGAN3PzHTPYyALiofYijHeYO998fpGwEl0=',
                },
                power: '1',
                name: 'masternode-19',
              },
              {
                address: 'FCB9FE6B879F7320FB2FB06BDD461BEEBB846B85',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'nDAxHaxWUBxtCLWq8vxiAe0VFolR6Yw4HEgM9zC2egE=',
                },
                power: '1',
                name: 'masternode-20',
              },
              {
                address: '2B67AF00F7738FED12780B02F70AF766B9B5C0F2',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'nsEDH4zcbUC8Dufa17ZxRwAqct7diNoNzgYHb2TQ2mg=',
                },
                power: '1',
                name: 'masternode-21',
              },
              {
                address: 'E6F029EFB7B248C84B320B380B30619EAA22A65E',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'wHBzA9ic/90SbhODRbT9cWzbhqXoXu3X/1NgYKt832A=',
                },
                power: '1',
                name: 'masternode-22',
              },
              {
                address: '1A761A571BD1786897BA4D969A03528039C54381',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'z/wzEYKiEwxP/nkgN11WL6erfTEq4wcBulFCi0bsQgg=',
                },
                power: '1',
                name: 'masternode-23',
              },
              {
                address: '816F57EBC23F03F069E648ECC2E5FD5CB12F6C4A',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'jsB/NVdo24Rsl73P5ymOhSAgK+V7aBodr/EJdarBspA=',
                },
                power: '1',
                name: 'masternode-24',
              },
              {
                address: 'C304B9B9E76DEBFDDB71B66C83E0E04441C5C113',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'KSXR93tqocMmmAfUJY9DagiciomWXnZ+SKgAt64vImg=',
                },
                power: '1',
                name: 'masternode-25',
              },
              {
                address: 'A6CF545577FCAE91D92A091A572B1DFF7FD3A574',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'DxMddyEkMix5lu1CFGSSd+XskrFhq+ZOzXzBRUq/Yyg=',
                },
                power: '1',
                name: 'masternode-26',
              },
              {
                address: '63D4A3B2F0EA3576109A7BA8440C47559732BD92',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'NAW+eCntw8ssgjJ6yY/hGuAlgCMY5gKXPHbya4rPNfs=',
                },
                power: '1',
                name: 'masternode-27',
              },
              {
                address: '04462517B4EEE922E3EAC62D8FC3B39157D4CBF1',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'YLyrpYp/I7EhxCA9yzGwmnXw9VI5t1fv2H7PDpDPFiI=',
                },
                power: '1',
                name: 'masternode-28',
              },
              {
                address: '77A193DC1A73F7DF324482268CE3F03740DACC33',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'mbXb1wqBREq9j9TkX9Hn+ZyP6eJNRQ2UiWiwqgRxN98=',
                },
                power: '1',
                name: 'masternode-29',
              },
              {
                address: 'E9BBE3577D67A63C0B3DA23A8F65C2E4C388E567',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'kECCYzOnEcA5FiqYq7/+VaO/lV8nQuUhSR+zDMoHjW8=',
                },
                power: '1',
                name: 'masternode-30',
              },
              {
                address: '6D9EA83F44A8A309D2979DA0716B6E06CBD8D926',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'wi1tZegVxE/cFa8pjzZVUKInxwqbELarJjlSisuJoSE=',
                },
                power: '1',
                name: 'masternode-31',
              },
              {
                address: '4816F44F85A1EE7EEA6FC6CCC19AEC93631909FC',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'C4O3e/0wAOa902JtcC3okmLq0VkO88DXkbruLVwAc7c=',
                },
                power: '1',
                name: 'masternode-32',
              },
              {
                address: '794389AC17E4C4F92ED18D5DB5458150B0918835',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'TOMdmb/WlzaOp6hMe7vAF9Xbrju//b7az0QLhKraawM=',
                },
                power: '1',
                name: 'masternode-33',
              },
              {
                address: '6C1A743FF3393529A707B55F5EB649EA4FAD5980',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: '0PRvdsjn1APsMDUw/HT/MqdE3Z9HR877Dx60fk997y4=',
                },
                power: '1',
                name: 'masternode-34',
              },
              {
                address: '8EB9F71D65DF48396AF2F6770FD42BAD36A98F69',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'bUZR4IVeHgtfIksl5MTUbGJr2tBGSRHL0G+/vVpgBgE=',
                },
                power: '1',
                name: 'masternode-35',
              },
              {
                address: '50FF638F377821861790A61DA0D6A03FAB10223D',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: '+kCo1Ztc+JA8xq7xuj/ggVfGRQWBseTuf95omfB2HmU=',
                },
                power: '1',
                name: 'masternode-36',
              },
              {
                address: 'B7DEE29CF61EA9455E85E5CC88D39688732799DD',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'tjjQbJ10uwCoZYSvNbZgcEf/Er8e95ymoCsAwhp5Ndk=',
                },
                power: '1',
                name: 'masternode-37',
              },
              {
                address: 'BF01E4C420DB3256C3BDF561D6DE806A6A0FAF72',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'Ti4MSaMJIDO5TTMKyOCVn08ZIfA9558nf/4SuXbqijU=',
                },
                power: '1',
                name: 'masternode-38',
              },
              {
                address: '34A1F4C14D6682E010243E154AB1205F2277084D',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'bexU65YMRfR8b1fEkUwIOUKHNl9V8cT0soi8DDG90As=',
                },
                power: '1',
                name: 'masternode-39',
              },
              {
                address: 'C3EB398E6499A726D083EABEAB9653302F94EF90',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'iPHtYcQTAaq08hq5vf67ufYLNf6i6SW5f5echYKvV3c=',
                },
                power: '1',
                name: 'masternode-40',
              },
              {
                address: 'AFA41D67E999F628EE67C7F00BFF492682180A6B',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'fUF/43vvbaAcaEpuoJmrY66LerYNpTmE8rmE1fraxnM=',
                },
                power: '1',
                name: 'masternode-41',
              },
              {
                address: '80F3F1CB7B2F7EA0151EA1433E62E76B17D5F1A3',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'JIc05l8UK1kGzMeDUu4mhDPCDkLTwkymiQPgIrNqeyU=',
                },
                power: '1',
                name: 'masternode-42',
              },
              {
                address: 'D99C5CE2F15F53B2C4DA37ECCA6A427C612CB86E',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'QkBN043FReHmIndf0zpM1deZTSgjc6pZgLfswxi4LI0=',
                },
                power: '1',
                name: 'masternode-43',
              },
              {
                address: '94DC7A83BCEBDC14DCC8D9AA796A9F3C30758A5A',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'MGzwcGFyj5OM6BQfaF6qERvRwFVLwrEtIjzrD4HJgXM=',
                },
                power: '1',
                name: 'masternode-44',
              },
              {
                address: 'BE664A59B0FE59B6809CE6F3D74AFB6FF9F4F595',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'VwdQNhEKVHYUZK/9YyeZokdbG6xWbUH8UAZJ+0MMPkA=',
                },
                power: '1',
                name: 'masternode-45',
              },
              {
                address: 'B924A4F48AF9B0902E046055A0B9217EA7D8AB31',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'QSVnY9ZBIjh0eQg9E9TQ3C6MqAZcGkH+iCMz2+F4Y4E=',
                },
                power: '1',
                name: 'masternode-46',
              },
              {
                address: '1C4AC45AE3846BCB28427FF80C82E6A1BC66B786',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'W6R5wifl0maN1f+jGOAFRRyUphFtp/6os1We3rfVIAI=',
                },
                power: '1',
                name: 'masternode-47',
              },
              {
                address: 'EC910949C536C9F4EF512BF36A722D00C04C7A59',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: '6OcOw3+BmuW33tmcO8TiG1HLRsA9iMZkDJB2wJQs5so=',
                },
                power: '1',
                name: 'masternode-48',
              },
              {
                address: '856B7A347EB77DB7D9BE1F4748D0B90985B54CF4',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'TbiLMDredczYV6fJdAfrK4dAh8Gdn8rt61nP+od3Nd8=',
                },
                power: '1',
                name: 'masternode-49',
              },
              {
                address: '1E984D356B54AACC996D25C179F2506C18CCC55D',
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: 'pRkdsp3BT9Av2EZDzERzaM/ySuce7YnY5YJc8vVodRI=',
                },
                power: '1',
                name: 'masternode-50',
              },
            ],
            app_hash: '',
          },
        },
      },
    },
    network: NETWORKS.EVONET,
  }),
  testnet: lodashMerge({}, baseConfig, {
    description: 'node with testnet configuration',
    core: {
      p2p: {
        port: 19999,
      },
      rpc: {
        port: 19998,
      },
    },
    platform: {
      dpns: {
        contract: {
          id: '36ez8VqoDbR8NkdXwFaf9Tp8ukBdQxN8eYs8JNMnUyKz',
          blockHeight: 30,
        },
        ownerId: 'G7sYtiobAP2eq79uYR9Pd6u2b6mapf4q6Pq2Q3BHiBK8',
      },
      drive: {
        tenderdash: {
          p2p: {
            persistentPeers: [
              {
                id: '083177d4e7f4dd7dea925a1c117d9312acf3d2b3',
                host: '52.11.85.154',
                port: 26656,
              },
              {
                id: '4936e6f4a4ce388bf7d2fe08178a1d8796fbea15',
                host: '52.38.248.133',
                port: 26656,
              },
              {
                id: '61258fc8ece3501c1d73d2ad13fb7fc3fc578df1',
                host: '34.212.231.240',
                port: 26656,
              },
              {
                id: '2cdf737f728b0ee756004c379f1b07deb7efc976',
                host: '54.185.249.226',
                port: 26656,
              },
              {
                id: '6f1c501e5ab29a1fdda6e5959976041c1ab0d2aa',
                host: '34.215.57.86',
                port: 26656,
              },
              {
                id: '8c4fdca118b61e5ae12e4de1b02d5f00ca87e2c7',
                host: '54.190.73.116',
                port: 26656,
              },
              {
                id: '74077adc1a938a6795bd57599033f102b7a85bf0',
                host: '34.214.2.219',
                port: 26656,
              },
              {
                id: '874b08a2baaed87688a5fbb6dd079372e9b31d16',
                host: '54.212.84.164',
                port: 26656,
              },
              {
                id: '738f7d1d9fb3a0b555f544a857576df3f208f4ec',
                host: '35.164.96.124',
                port: 26656,
              },
              {
                id: 'dbbf5f0bb4822a6213b5fdc1e59b479c543d61e5',
                host: '34.219.81.129',
                port: 26656,
              },
              {
                id: '2e0bfa9928a2be8067114fb07bcaa7247f38fbe8',
                host: '34.221.42.205',
                port: 26656,
              },
              {
                id: 'd69ecb04b8f5253b8b598410c6f568e22a241113',
                host: '34.208.88.128',
                port: 26656,
              },
              {
                id: '78d56d27c3aef4b0e985b1af8177ec6f130c9d55',
                host: '54.189.162.193',
                port: 26656,
              },
              {
                id: '599efb064d83116f52dbad2a924f2718a53525e7',
                host: '34.220.124.90',
                port: 26656,
              },
              {
                id: '93928e0e8f39509f41ba6f82d3422b3c8adfb440',
                host: '54.201.242.241',
                port: 26656,
              },
              {
                id: 'f1f6aa031eab00bea00017600ca7d5c86ddef305',
                host: '54.68.10.46',
                port: 26656,
              },
              {
                id: '08641aaba16452966cf275009b1f81c0100f73cd',
                host: '34.210.81.39',
                port: 26656,
              },
              {
                id: '1c2db77db34f3d79b7b84895e70cf84fe2aa153a',
                host: '18.237.47.243',
                port: 26656,
              },
              {
                id: '4454635fb002954b0d27261f99c059e2538c4bdb',
                host: '54.187.229.6',
                port: 26656,
              },
              {
                id: '791399f8c54198fb7f06f548ddb6abbf6fc33a69',
                host: '34.214.102.160',
                port: 26656,
              },
              {
                id: '2b6d3b6645548383ab03275b91d19da78492b913',
                host: '34.219.93.145',
                port: 26656,
              },
              {
                id: '604905f828428497983ea5679884ca01766ecda5',
                host: '35.165.37.186',
                port: 26656,
              },
              {
                id: '0a22c58b45f35ba4f02ed67cb2e93c7aa8abab9b',
                host: '54.202.157.120',
                port: 26656,
              },
              {
                id: 'fe69d216e1aa2b8ef4dbeb170d21051940f5a04e',
                host: '34.215.144.176',
                port: 26656,
              },
              {
                id: 'a33d701c43ce996098a42d1b9fea225c8f324322',
                host: '52.13.119.69',
                port: 26656,
              },
              {
                id: 'edc06da75dbae1c7905856394f3883515b10321c',
                host: '34.220.12.188',
                port: 26656,
              },
              {
                id: 'cf4e3450c4e4c4286ebfb809c55706018feec933',
                host: '18.237.5.33',
                port: 26656,
              },
              {
                id: 'aca8e2b1b6069acde60c5de79c293d8aba258f80',
                host: '54.191.32.70',
                port: 26656,
              },
              {
                id: 'aa00e8b380d1f0e3b46e0ace2e80c49856897516',
                host: '54.213.219.155',
                port: 26656,
              },
              {
                id: '5fc86aae12512c69b36c4a5c612ad69b6fcb23d7',
                host: '35.167.25.157',
                port: 26656,
              },
              {
                id: 'b51a541d63edea99d077c441757bebeb22fa9261',
                host: '54.213.89.75',
                port: 26656,
              },
              {
                id: 'ecaf7271938a3b8efbdb6bc81252e2c42a6570f0',
                host: '52.32.232.156',
                port: 26656,
              },
              {
                id: '9d6291f557433f21ed20b5a2ec5f7fc8bf276a47',
                host: '34.212.226.44',
                port: 26656,
              },
              {
                id: '2d5b6c6ce4323916f4f7d04e083c60ed0eea5780',
                host: '35.160.140.37',
                port: 26656,
              },
              {
                id: 'f6721a9f4968ecf0617172c31e93511c71da3c78',
                host: '52.11.133.244',
                port: 26656,
              },
              {
                id: '5c67a79c3b0ae3a84d78957c5464e5a43ece2a50',
                host: '54.201.189.185',
                port: 26656,
              },
              {
                id: '186a6370ee79e4fcc5e212dde1ef3f44116d3335',
                host: '34.216.200.22',
                port: 26656,
              },
              {
                id: 'eb611c99d91cc7c01eb2447879bcda747f533ba6',
                host: '34.220.144.226',
                port: 26656,
              },
              {
                id: '3f8044db1e624b837246a530c94e5f7908ef44ca',
                host: '34.216.195.19',
                port: 26656,
              },
              {
                id: '71bf8f7fc2547732426560d9608bc98ff548206e',
                host: '54.185.1.69',
                port: 26656,
              },
              {
                id: '211eb0d62eeb899a3fd1075f7bd4c5077153cba2',
                host: '35.166.29.155',
                port: 26656,
              },
              {
                id: 'c23c5da6ff8f2a95c2e25e64bde421b6a05dc1fc',
                host: '18.237.147.160',
                port: 26656,
              },
              {
                id: 'a747ff41e78b89fc46999d5b8cf8874059cb74f7',
                host: '34.220.228.214',
                port: 26656,
              },
              {
                id: '76fc3cf8d9e8ce937afa0734535b2cfcda1eb3c3',
                host: '54.212.75.8',
                port: 26656,
              },
              {
                id: '94364e1b8336aaab5b0adbfc813fb3747ffe9894',
                host: '35.163.152.74',
                port: 26656,
              },
              {
                id: '39045ca8ef8b560387b0612e02cd591c3d72e9e9',
                host: '18.236.78.191',
                port: 26656,
              },
              {
                id: '7be31054b6b3687c27e9c618912b4bcb114201ef',
                host: '54.148.106.179',
                port: 26656,
              },
              {
                id: '6bdaf339bf7ec90869162934a7145dde93d077c3',
                host: '34.211.46.222',
                port: 26656,
              },
              {
                id: 'e63596025fbe6b0f98088de2b438a72a43722c29',
                host: '35.160.13.25',
                port: 26656,
              },
              {
                id: '325cb600bc296039affda97830ce3496f43bbe28',
                host: '34.220.17.107',
                port: 26656,
              },
            ],
          },
          genesis: {
            genesis_time: '2020-12-30T14:08:02.904199237Z',
            chain_id: 'dash-testnet',
            consensus_params: {
              block: {
                max_bytes: '22020096',
                max_gas: '-1',
                time_iota_ms: '5000',
              },
              evidence: {
                max_age: '100000',
                max_age_num_blocks: '100000',
                max_age_duration: '172800000000000',
              },
              validator: {
                pub_key_types: [
                  'ed25519',
                ],
              },
            },
            initial_core_chain_locked_height: 415765,
            validators: [
              {
                address: '1EBEA21DD88D3BE63AF73FBF3C63E0924C383993',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'i5jzHe+F6Y2KXB+y6aqjMivzRbsWnViFa0isQtjcMetQ+I+/4DeV2bgXrbhEjKO3',
                },
                power: '1',
                name: 'masternode-1',
              },
              {
                address: 'CDA301F28F1EFE8D4777B66F32359C0758B23716',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CHlEEQPlC/Tgt50RytPMSXUzKpgV7b99JCfbo5SwIjarnkeiTjo6p3vQWL55pe4L',
                },
                power: '1',
                name: 'masternode-2',
              },
              {
                address: '98148E4FAA4E0FEF352A6395C06726BF3D8DCF12',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'DujBMSzFxG4YY9fy8edR3AkPyv48z+aEY2X/yc7H+2ZxLX2cQqiH7rr27kQpAZIr',
                },
                power: '1',
                name: 'masternode-3',
              },
              {
                address: 'D39A8DE0F43D5593C78084712BE51B85E3F5ECA5',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'jDGeJvJ/anuztdlhNnh6Lh5dBSSS6enep/N2OFscqwGRUqG2LfGeQt+xwDD++4Yg',
                },
                power: '1',
                name: 'masternode-4',
              },
              {
                address: '030A38B3D3BEDD513B5B688688EB3FCBA45891CF',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CvSOgEMJhw3kYqVMSClcEjazTz5YKDQF2dSZQuQcoOHYjVy06T/cz4RwJFwKArhF',
                },
                power: '1',
                name: 'masternode-5',
              },
              {
                address: 'EAE52660FCD29ADBB9413F8C62B2AEB1530BA930',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CUuqwqy3X6DhqStIjOGm4pzMmICKkGN+clskdedJMClnLpXMJw1WUTVHqah1htgA',
                },
                power: '1',
                name: 'masternode-6',
              },
              {
                address: 'C42BB57CCCE3FBC1B961A25163983DAA49BA7E9E',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'mLN3dHV1iOMZ+6HH6flCGziUCsAQimxA4SBBcIwe2bf7a4z8KfkdZMuwSoB6ku/T',
                },
                power: '1',
                name: 'masternode-7',
              },
              {
                address: '6475387F2739F3427CF303E0509D7D59FF42C83A',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'BmRwmqWjzCwn9h+rdMjstD56OFbsG+vf7Qw5kH2GQqqk5U2Ap4RCw4bOA8PKVP4/',
                },
                power: '1',
                name: 'masternode-8',
              },
              {
                address: 'AABF94B323D690751BE0FAA6E2428D0DCFC12FE3',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'lA9YNOjuuHxQqQrX6ju/7PkvQzRihkurZL2m898nwVus9H0+nMDtfdwIhqX0bjpH',
                },
                power: '1',
                name: 'masternode-9',
              },
              {
                address: 'CED6DD8FD612FEBD5C613B5C982544A57E452793',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'Fyff3hc0+9/xNCtwfx0jZ/SZLsYeeDRqkf8wQ2vHGeq97+2bht5GjiZenWG9GJcI',
                },
                power: '1',
                name: 'masternode-10',
              },
              {
                address: 'E5F9C7E6CC8F6998ADE638F3AD231B3BA84F2CF8',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'A7di/Va23m+WBe9EkcgdVPukH2IOqj+eyfW58bf2Oh3ieI1pDGb8vsIRVKbxp/2d',
                },
                power: '1',
                name: 'masternode-11',
              },
              {
                address: '8172056086CAFC834B62ECE3CBA7422993ECBEC3',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'igJ3TVw9IrLCcoWeaGccz74XZs2k8IogSHmn6dyT2Ds6EqkUznCrX3Am7qPXWaC2',
                },
                power: '1',
                name: 'masternode-12',
              },
              {
                address: '4ADD35B17299141F453853D291892F0AB5749430',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'gGlwT/PBXvdhkt/aw8Pchmtc+dRcxXTpFyIBA194cK76VcFhoL+4B3fErtqro1q0',
                },
                power: '1',
                name: 'masternode-13',
              },
              {
                address: '5A639948DB72533FAC6099661ED14440E589CDD5',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'GdmemSYPhtxOhDdz/oiNWTRGoBXjKIMEznQb2UQi1hmoe4+pWzy7+f8IB5Hir9Rx',
                },
                power: '1',
                name: 'masternode-14',
              },
              {
                address: 'BA447D4EA32286A8DA316F6BCC206092D09BD4A8',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'gfNfKbv1H47o0Bbb6Ot5NFOLTwsLDN0M54Q2cNiA1fvUBE+Wg7upIvJI4KyICXQJ',
                },
                power: '1',
                name: 'masternode-15',
              },
              {
                address: 'E5DE61BA6AC60B21D7B3D4EA7B5F8070CEB96960',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'Fb1kgu4x8JALUdoEPsOFYQDbyIuKkGTBNiWTQiDdtu+ORfW7k3xX6v/zjL+11zVh',
                },
                power: '1',
                name: 'masternode-16',
              },
              {
                address: 'B4DFB2B1031E05C340FCE4CAEA89ABA35DB3E343',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CFXmkqPlcevJiXq6Zs3rllKgvW1yiLUe/tcEq243m2h2mU3tmAoWXgzWolXKnaPf',
                },
                power: '1',
                name: 'masternode-17',
              },
              {
                address: '4DBB37DFA38A1C1D112C69A2C9CA2CD266DCF257',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CUD+5l8sjyrL+QD7qs1hwk/FpirXDMIQuY2pFlmJtrJKUi5PMBMm2JN5lyjyjjRH',
                },
                power: '1',
                name: 'masternode-18',
              },
              {
                address: '989D1396E454B41B78057C8BFEFE2E89E208E92C',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'AEllXrjmwj9rmokacAYqCspuWRl4FCk/SzV1C1s8B4c+u+zT0anm039DbL5hX3Ur',
                },
                power: '1',
                name: 'masternode-19',
              },
              {
                address: 'F7CBA67FC84F30CB41D43541D1533C37646A1AA7',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'gZLbBsgUicmMa/v3OMlXhP+NBQ13wX+Itsmf+bCcJhLfZ/L8gkkTTDvcW6C+lYOE',
                },
                power: '1',
                name: 'masternode-20',
              },
              {
                address: '5967C19F4F9FCE1C6D9BF4DEF8515BE8CC077F0C',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'By6RyRnzqOkwH67eSKZHEyBDUu1nTzcKTeWG+d4Gscq5A49vvi3PpMGIAclL9SoB',
                },
                power: '1',
                name: 'masternode-21',
              },
              {
                address: 'C1E943EF10312454277CF0A7837B9F773D124D9A',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'DB7Er6FvLg8uwT5Gh9NoCl0aAZD64p0ie/Y5xQXMuUvGE1+uR/nrBTlbU9IbQYPO',
                },
                power: '1',
                name: 'masternode-22',
              },
              {
                address: '6E8F97C1DF921F1FC510003F26E7CE6E2D083EEA',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'hefH4frYjhDCISbG99ZHqL8BXu/qK4L8iauAY9CqRHCtbclSeDTk8dUfGGFEIsC7',
                },
                power: '1',
                name: 'masternode-23',
              },
              {
                address: '8B0052703AA5EE4CC8A603CE7312B9889F04C831',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'F3vbFAZ0W/08mclOj1j0heBuA3gyr+VFR9RMg6iqZe2HY5Lym1oDPrqH12QHI5Iy',
                },
                power: '1',
                name: 'masternode-24',
              },
              {
                address: 'A91FF05D096BEF19A7BFEEC8F5249B6A44A7E0D8',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'EIIJW3MBY7Kp6YVVbwVxEejr89VsFFLRLbUQZ2NHQdB8lxtXPX/E1dzfYCcXHWXh',
                },
                power: '1',
                name: 'masternode-25',
              },
              {
                address: 'F93F6EF89B0C92D4B8EEBCD8C25E098CB321102C',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'EwBTb9osBFEjHHAC3nbYvkO5ogd00C4y6j8jO3z7G6fs41PRH4myYLqgjR9Tu/TO',
                },
                power: '1',
                name: 'masternode-26',
              },
              {
                address: 'BE5B9F1734CFB696C230FB3039A3EE9B828DD7DC',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'hCHdKIZmhaH8l4ZPFRYRdSRI4ZY+/iU2BPrigKMiC/snZXzaPJ/d+venQUYjOnVa',
                },
                power: '1',
                name: 'masternode-27',
              },
              {
                address: '68666401A05018E50D8948B1066A8C3F9F5D197C',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'kqs/IZSxhGm59Vtesz3PY1oyZpr0nDmWTXcGm5iC5l6OEd6WvHHlym3+Y7nKzDxL',
                },
                power: '1',
                name: 'masternode-28',
              },
              {
                address: 'D017EFA62E88FA2DEA801D01C2CB4FAC68530986',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'Fy0nV9ABqGtSbqBjGDVuSQ3IhXELiPf3vL8Xe1zXuyk+qWUapfteD//FncqfqWVa',
                },
                power: '1',
                name: 'masternode-29',
              },
              {
                address: '1C0E0B3D4E916A39C8FD3A0A93009C7E9DB51E45',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CJF96qHDpIZ9hMEcZYTj3tLixpBBgwD+BH7NoFWBITMDEkrC3pAYgFXl9GLuyLd4',
                },
                power: '1',
                name: 'masternode-30',
              },
              {
                address: '49F1751ED85E96EA3139AA6E47A1A87155C89F3B',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'GfH3f+vDuRjaspLldbxe0r9z66Wr6AGlShZ5zABvWkYDt1skN4MhuP3+KC54Ybr5',
                },
                power: '1',
                name: 'masternode-31',
              },
              {
                address: 'A2A74CBF859881EEE8ED82CF2C447A4F02545E86',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'FcWrTNKGbMEa7FNQCGNUpDV+RyPJtY/tvlHrFVYZmygjJtLBL24H/CRI+t5ppNtZ',
                },
                power: '1',
                name: 'masternode-32',
              },
              {
                address: '3584086E58E9439A254DE1D023F30579E0ABECDC',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'Btx2e5/kpnc6ULExTdru3iX+DOsXGHPdh6QaxscpkbLs6FmauP+5lHnUXcozsQY/',
                },
                power: '1',
                name: 'masternode-33',
              },
              {
                address: '4145C30B756D6BC4CD44185AF164A381413EBEEF',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'BLd136AB0FiZkTEeWw1c5r4J7tqxk/iZqBbBYeTbmBhjIBbQtFVz8hV0EWtNiLuT',
                },
                power: '1',
                name: 'masternode-34',
              },
              {
                address: 'C4858F331785C217C7EB26C85ACDCC761071390B',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'gzYZml6XxJFANEYNUJq/dp8Y2WvWQJreLiP/GNY5lnixpqvFJnPt/ENX3fW5Ig5L',
                },
                power: '1',
                name: 'masternode-35',
              },
              {
                address: '92FE4F0727BB286983B32F67B9DA75B3727B8078',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'B5z3dYNwjhYPjVO7/RyCboJkA2FCPtWSpURSCs4DQeygRK5JxfSvTnVzwzQ+JbG5',
                },
                power: '1',
                name: 'masternode-36',
              },
              {
                address: '4CEF639E12437BA4811B07BFCCDF14A3A447B7C6',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'AMPJh/mc5FJEp/YV0sIzCUrJCdCgw8SQj3UgdIT4uqhS2GO1USyB3fqYZQD8MR0N',
                },
                power: '1',
                name: 'masternode-37',
              },
              {
                address: '0768F189FE5B7455A9799E14824399946DB0D9C4',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'CYGlY4yJNc8R/AY+6Ih0l+lInYCSX+fSBYuFvBa0ckOx4Ul/99bX8MOaR4Eh7Fgt',
                },
                power: '1',
                name: 'masternode-38',
              },
              {
                address: 'DC868031215A9FCDAD4DE50D1BC3F1CF92953E42',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'BKIYZzGvAI8XwD6j1lhqbPcG6UFcrm7wGIG66UA3SZ1gUsc1kf7p/2ZMZBOWUivD',
                },
                power: '1',
                name: 'masternode-39',
              },
              {
                address: 'B3F1DEC7BC6EBC6780C5A27A8841763551B58305',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'hDHzXRa5T/Ci+0q+ETy8G199Rj72ZvEZxlIyOwBrP7CAoc5MWwVo3DOutkdLEb9a',
                },
                power: '1',
                name: 'masternode-40',
              },
              {
                address: '04437C50C6B9FAE1A1906B7CFAB5192716388B67',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'kkjZpIrA99HJVWhFpKv89oUcDeCLtsAGOy0MY+V0tBVkLmltvwGKYYLJW3Lbou2q',
                },
                power: '1',
                name: 'masternode-41',
              },
              {
                address: '46C1599A1C8610D07BB4B7215720B04C4613B84C',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'kSIl1Zh077twJ6a+tviXsFzIsYXtQE/qZcCujppVeLz2NzSyvsbU5lF/WCp5vzax',
                },
                power: '1',
                name: 'masternode-42',
              },
              {
                address: '7943866D9F50D6229249D86ED31D344AC2DAB7F9',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'l2PeSRJAXTt/mCGlvLs7aFmLQIAKk6Rl0dbnjvCy86nLtUJSFsIQJ2yd0hYrTFGY',
                },
                power: '1',
                name: 'masternode-43',
              },
              {
                address: 'E3ACCB76F4455C8B384AF4D63244EB78A1FF6060',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'jZoe0v4sjAOJql7MJW+3FHe14lL8HsyBNeQELADa8edHTjBsQ5T6Bs/hXB9DK2Uf',
                },
                power: '1',
                name: 'masternode-44',
              },
              {
                address: 'B77DB22D3D089467B1496D55C3872FA02665502B',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'EEUPwsStCtNIICeUYzSzi6K1qrrRWYmkstI6zqFYZv1ayCMc08SSDzXBYfdLPWoJ',
                },
                power: '1',
                name: 'masternode-45',
              },
              {
                address: '1BC727ED0A48DE8B87D2FCF52BCBD7ABF06456C5',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'lxYemf6KwM5QkEpmp+ocxjQ6sH/YQ5pS7CMR5W7GXWPvH+In20gS0jRS1EGSd8PC',
                },
                power: '1',
                name: 'masternode-46',
              },
              {
                address: '44C96778285042612D445253DBFD8C7D01C508BF',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'FEO/iJ7UoJAF7FlqA4lqLXdx7m5T1DkxH8SPew79ZahQjbf5JWIDC+9g1ypJ75xO',
                },
                power: '1',
                name: 'masternode-47',
              },
              {
                address: '84B2CC28A97772BAC263BE89B1C3E7EDF3685560',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'ERb5RWY84nf115UUNqF5EKyluRaGm/iObWl9zzF87+Q/oQhpJlMOrN/pWk8dAK6B',
                },
                power: '1',
                name: 'masternode-48',
              },
              {
                address: '31E6E408485C3B0F28069BDB143D903BE59B710D',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'mWgQhnc6Gd+stIc+k0QCuFpp9ZOyCNdUWorC6OBqCTOUF6WQ6S88KscUa5MfyXlo',
                },
                power: '1',
                name: 'masternode-49',
              },
              {
                address: '0E955EAF6D7ACCB09DB3E5F865551E4E63B7F03C',
                pub_key: {
                  type: 'tendermint/PubKeyBLS12381',
                  value:
                    'Enw3AkvMVDKa0frk2Byp0Ok6E8ztRWl5aOOiMO0aeaWVZGNui51wE9jv1xRLOpMs',
                },
                power: '1',
                name: 'masternode-50',
              },
            ],
            app_hash: '',
          },
        },
      },
    },
    network: NETWORKS.TESTNET,
  }),
};

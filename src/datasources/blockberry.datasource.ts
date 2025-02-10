import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configDotenv as loadEnv} from 'dotenv';

const envData = loadEnv()?.parsed;

const config = {
  name: 'blockberry',
  connector: 'rest',
  baseURL: 'https://api.blockberry.one/sui/v1/',
  crud: false,
  options: {
    headers: {
      //'accept': 'application/json',
      'accept': '*/*',
      'content-type': 'application/json',
      'x-api-key': envData?.BLOCKBERRY_API_KEY,
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://api.blockberry.one/sui/v1/coins/metadata/{coinType}',
        query: {
          coinType: '{coinType}'
        },
      },
      functions: {
        getCoinMetadata: ['coinType'],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'https://api.blockberry.one/sui/v1/coins/{coinType}',
        query: {
          coinType: '{coinType}',
        },
        //responsePath: '$.result.addressMatches[*].coordinates',
      },
      functions: {
        getCoinByCoinType: ['coinType'],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'https://api.blockberry.one/sui/v1/coins/{coinType}/holders?page=0&size=1&orderBy=DESC&sortBy=AMOUNT',
        query: {
          coinType: '{coinType}',
        },
        responsePath: 'totalElements',
      },
      functions: {
        getHoldersCountByCoinType: ['coinType'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BlockberryDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'blockberry';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.blockberry', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

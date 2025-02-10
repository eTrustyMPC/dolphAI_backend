import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configDotenv as loadEnv} from 'dotenv';

const envData = loadEnv()?.parsed;

const config = {
  name: 'searapi',
  connector: 'rest',
  baseURL: 'https://serpapi.com/search.json',
  crud: false,
  options: {
    headers: {
      'accept': 'application/json',
      //'accept': '*/*',
      'content-type': 'application/json',
      'Authorization': `Bearer ${envData?.SEAR_API_KEY}`,
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://serpapi.com/search.json',
        query: {
          q: '{q}',
          tbm: 'nws',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'api_key': envData?.SEAR_API_KEY
        },
        responsePath: "$.news_results",
      },
      functions: {
        searchNews: ['q'],
      },
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SearapiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'searapi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.searapi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

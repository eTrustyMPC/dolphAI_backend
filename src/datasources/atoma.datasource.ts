import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configDotenv as loadEnv} from 'dotenv';

const envData = loadEnv()?.parsed;

const config = {
  debug: true,
  name: 'atoma',
  connector: 'rest',
  baseURL: 'https://api.atoma.network/v1/',
  crud: false,
  options: {
    headers: {
      'accept': 'application/json',
      //'accept': '*/*',
      'content-type': 'application/json',
      'Authorization': `Bearer ${envData?.OPENAI_API_KEY}`,
    },
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: 'https://api.atoma.network/v1/chat/completions',
        //query: {},
        body: {
          model: "meta-llama/Llama-3.3-70B-Instruct",
          messages: '{messages}',
          stream: false,
        },
        responsePath: "$.choices",
      },
      functions: {
        simplePrompt: ['messages'],
      },
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AtomaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'atoma';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.atoma', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

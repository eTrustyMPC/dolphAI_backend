import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configDotenv as loadEnv} from 'dotenv';

const envData = loadEnv()?.parsed;

const config = {
  name: 'postgres',
  connector: 'postgresql',
  //url: '',
  host: envData?.PG_HOST,
  port: envData?.PG_PORT,
  user: envData?.PG_USER,
  password: envData?.PG_PASSWORD,
  database: envData?.PG_DATABASE,
  ssl: false,
  debug: true,
  //idleTimeoutMillis: 60000,
  connectionTimeout: 160000,
};
console.log(config);

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgres';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgres', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

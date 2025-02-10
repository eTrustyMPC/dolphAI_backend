import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {SearapiDataSource} from '../datasources';

export interface NewsItem {
  position: number,
  link: string,
  title: string,
  source: string,
  date: string,
  snippet: string,
  thumbnail: string,
}

export interface Searapi {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  searchNews(q: string): Promise<[NewsItem[]]>;
}

export class SearapiProvider implements Provider<Searapi> {
  constructor(
    // searapi must match the name property in the datasource json file
    @inject('datasources.searapi')
    protected dataSource: SearapiDataSource = new SearapiDataSource(),
  ) { }

  value(): Promise<Searapi> {
    return getService(this.dataSource);
  }
}

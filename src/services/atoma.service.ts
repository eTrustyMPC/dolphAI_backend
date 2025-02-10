import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {AtomaDataSource} from '../datasources';

//export interface AtomaResponse {}

export interface Atoma {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  simplePrompt(messages: Object[]): Promise<Object>;
}

export class AtomaProvider implements Provider<Atoma> {
  constructor(
    // atoma must match the name property in the datasource json file
    @inject('datasources.atoma')
    protected dataSource: AtomaDataSource = new AtomaDataSource(),
  ) { }

  value(): Promise<Atoma> {
    return getService(this.dataSource);
  }
}

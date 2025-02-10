import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Coin, CoinRelations} from '../models';

export class CoinRepository extends DefaultCrudRepository<
  Coin,
  typeof Coin.prototype.id,
  CoinRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Coin, dataSource);
  }
}

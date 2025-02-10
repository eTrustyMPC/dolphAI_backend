import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AccountCoin, AccountCoinRelations} from '../models';

export class AccountCoinRepository extends DefaultCrudRepository<
  AccountCoin,
  typeof AccountCoin.prototype.id,
  AccountCoinRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AccountCoin, dataSource);
  }
}

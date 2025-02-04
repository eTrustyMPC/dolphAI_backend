import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AccountToken, AccountTokenRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class AccountTokenRepository extends DefaultCrudRepository<
  AccountToken,
  typeof AccountToken.prototype.id,
  AccountTokenRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof AccountToken.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(AccountToken, dataSource);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}

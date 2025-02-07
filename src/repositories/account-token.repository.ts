import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Account, AccountToken, AccountTokenRelations, Token} from '../models';
import {AccountRepository} from './account.repository';
import {TokenRepository} from './token.repository';

export class AccountTokenRepository extends DefaultCrudRepository<
  AccountToken,
  typeof AccountToken.prototype.id,
  AccountTokenRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof AccountToken.prototype.id>;

  public readonly token: BelongsToAccessor<Token, typeof AccountToken.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: DbDataSource,
    @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
    @repository.getter('TokenRepository') protected tokenRepositoryGetter: Getter<TokenRepository>,
  ) {
    super(AccountToken, dataSource);
    this.token = this.createBelongsToAccessorFor('token', tokenRepositoryGetter,);
    this.registerInclusionResolver('token', this.token.inclusionResolver);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TokenQuery, TokenQueryRelations, Account, Token} from '../models';
import {AccountRepository} from './account.repository';
import {TokenRepository} from './token.repository';

export class TokenQueryRepository extends DefaultCrudRepository<
  TokenQuery,
  typeof TokenQuery.prototype.id,
  TokenQueryRelations
> {

  public readonly account: BelongsToAccessor<Account, typeof TokenQuery.prototype.id>;

  public readonly token: BelongsToAccessor<Token, typeof TokenQuery.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>, @repository.getter('TokenRepository') protected tokenRepositoryGetter: Getter<TokenRepository>,
  ) {
    super(TokenQuery, dataSource);
    this.token = this.createBelongsToAccessorFor('token', tokenRepositoryGetter,);
    this.registerInclusionResolver('token', this.token.inclusionResolver);
    this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}

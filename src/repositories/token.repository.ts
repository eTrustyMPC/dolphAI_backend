import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Account, Token, TokenQuery, TokenRelations} from '../models';
import {AccountRepository} from './account.repository';
import {TokenQueryRepository} from './token-query.repository';

export class TokenRepository extends DefaultCrudRepository<
  Token,
  typeof Token.prototype.id,
  TokenRelations
> {

  public readonly tokenQueries: HasManyRepositoryFactory<TokenQuery, typeof Token.prototype.id>;

  public readonly accounts: HasManyThroughRepositoryFactory<Account, typeof Account.prototype.id,
    TokenQuery,
    typeof Token.prototype.id
  >;

  constructor(
    @inject('datasources.postgres') dataSource: DbDataSource,
    @repository.getter('TokenQueryRepository') protected tokenQueryRepositoryGetter: Getter<TokenQueryRepository>,
    @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Token, dataSource);
    this.accounts = this.createHasManyThroughRepositoryFactoryFor('accounts', accountRepositoryGetter, tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('accounts', this.accounts.inclusionResolver);
    this.tokenQueries = this.createHasManyRepositoryFactoryFor('tokenQueries', tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('tokenQueries', this.tokenQueries.inclusionResolver);
  }
}

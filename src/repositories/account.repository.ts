import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Account, AccountRelations, AccountToken, Token, TokenQuery} from '../models';
import {AccountTokenRepository} from './account-token.repository';
import {TokenQueryRepository} from './token-query.repository';
import {TokenRepository} from './token.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {

  public readonly tokenQueries: HasManyRepositoryFactory<TokenQuery, typeof Account.prototype.id>;

  public readonly accountTokens: HasManyRepositoryFactory<AccountToken, typeof Account.prototype.id>;

  public readonly tokens: HasManyThroughRepositoryFactory<Token, typeof Token.prototype.id,
    TokenQuery,
    typeof Account.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: DbDataSource, @repository.getter('TokenQueryRepository') protected tokenQueryRepositoryGetter: Getter<TokenQueryRepository>, @repository.getter('AccountTokenRepository') protected accountTokenRepositoryGetter: Getter<AccountTokenRepository>, @repository.getter('TokenRepository') protected tokenRepositoryGetter: Getter<TokenRepository>,
  ) {
    super(Account, dataSource);
    this.tokens = this.createHasManyThroughRepositoryFactoryFor('tokens', tokenRepositoryGetter, tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('tokens', this.tokens.inclusionResolver);
    this.accountTokens = this.createHasManyRepositoryFactoryFor('accountTokens', accountTokenRepositoryGetter,);
    this.registerInclusionResolver('accountTokens', this.accountTokens.inclusionResolver);
    this.tokenQueries = this.createHasManyRepositoryFactoryFor('tokenQueries', tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('tokenQueries', this.tokenQueries.inclusionResolver);
  }
}

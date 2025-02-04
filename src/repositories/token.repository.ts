import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Token, TokenRelations, TokenQuery, Account} from '../models';
import {TokenQueryRepository} from './token-query.repository';
import {AccountRepository} from './account.repository';

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
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TokenQueryRepository') protected tokenQueryRepositoryGetter: Getter<TokenQueryRepository>, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Token, dataSource);
    this.accounts = this.createHasManyThroughRepositoryFactoryFor('accounts', accountRepositoryGetter, tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('accounts', this.accounts.inclusionResolver);
    this.tokenQueries = this.createHasManyRepositoryFactoryFor('tokenQueries', tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('tokenQueries', this.tokenQueries.inclusionResolver);
  }
}

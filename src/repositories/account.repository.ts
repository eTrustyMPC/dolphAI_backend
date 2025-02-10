import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Account, AccountCoin, AccountRelations, Coin, TokenQuery} from '../models';
import {AccountCoinRepository} from './account-coin.repository';
import {AccountTokenRepository} from './account-token.repository';
import {CoinRepository} from './coin.repository';
import {TokenQueryRepository} from './token-query.repository';
import {TokenRepository} from './token.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {

  public readonly tokenQueries: HasManyRepositoryFactory<TokenQuery, typeof Account.prototype.id>;

  //public readonly accountTokens: HasManyRepositoryFactory<AccountToken, typeof Account.prototype.id>;

  /*public readonly tokens: HasManyThroughRepositoryFactory<Token, typeof Token.prototype.id,
    TokenQuery,
    typeof Account.prototype.id
  >;*/

  public readonly coins: HasManyThroughRepositoryFactory<Coin, typeof Coin.prototype.id,
    AccountCoin,
    typeof Account.prototype.id
  >;

  constructor(
    @inject('datasources.postgres') dataSource: DbDataSource,
    @repository.getter('TokenQueryRepository') protected tokenQueryRepositoryGetter: Getter<TokenQueryRepository>,
    @repository.getter('AccountTokenRepository') protected accountTokenRepositoryGetter: Getter<AccountTokenRepository>,
    @repository.getter('TokenRepository') protected tokenRepositoryGetter: Getter<TokenRepository>, @repository.getter('CoinRepository') protected coinRepositoryGetter: Getter<CoinRepository>, @repository.getter('AccountCoinRepository') protected accountCoinRepositoryGetter: Getter<AccountCoinRepository>,
  ) {
    super(Account, dataSource);
    this.coins = this.createHasManyThroughRepositoryFactoryFor('coins', coinRepositoryGetter, accountCoinRepositoryGetter,);
    this.registerInclusionResolver('coins', this.coins.inclusionResolver);
    //this.tokens = this.createHasManyThroughRepositoryFactoryFor('tokens', tokenRepositoryGetter, tokenQueryRepositoryGetter,);
    //this.registerInclusionResolver('tokens', this.tokens.inclusionResolver);
    //this.accountTokens = this.createHasManyRepositoryFactoryFor('accountTokens', accountTokenRepositoryGetter,);
    //this.registerInclusionResolver('accountTokens', this.accountTokens.inclusionResolver);
    this.tokenQueries = this.createHasManyRepositoryFactoryFor('tokenQueries', tokenQueryRepositoryGetter,);
    this.registerInclusionResolver('tokenQueries', this.tokenQueries.inclusionResolver);
  }
}

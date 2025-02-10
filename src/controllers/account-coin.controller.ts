import {
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  put
} from '@loopback/rest';
import {
  Account,
  Coin
} from '../models';
import {AccountCoinRepository, AccountRepository, CoinRepository} from '../repositories';

export class AccountCoinController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
    @repository(CoinRepository) protected coinRepository: CoinRepository,
    @repository(AccountCoinRepository) protected accountCoinRepository: AccountCoinRepository,
  ) { }

  @get('/accounts/{id}/favoriteCoins', {
    responses: {
      '200': {
        description: 'Array of Account has many Coin through AccountCoin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Coin)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
  ): Promise<Coin[]> {
    return this.accountRepository.coins(id).find({});
  }

  @put('/accounts/{id}/addFavoriteCoin', {
    responses: {
      '200': {
        description: 'create a Coin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Coin)}},
      },
    },
  })
  async addFavoriteCoin(
    @param.path.string('id') id: typeof Account.prototype.id,
    @param.query.string('coinId') coinId: typeof Coin.prototype.id,
  ): Promise<void> {
    const hasConnectedAccount = await this.accountRepository.exists(id);
    if (hasConnectedAccount === false) {
      await this.accountRepository.create({id: id});
    }
    //const account = await this.accountRepository.findById(id);
    await this.accountRepository.coins(id).link(coinId);
  }

  @del('/accounts/{id}/removeFavoriteCoin', {
    responses: {
      '200': {
        description: 'create a Coin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Coin)}},
      },
    },
  })
  async removeFavoriteCoin(
    @param.path.string('id') id: typeof Account.prototype.id,
    @param.query.string('coinId') coinId: typeof Coin.prototype.id,
  ): Promise<void> {
    const hasConnectedAccount = await this.accountRepository.exists(id);
    if (hasConnectedAccount === false) {
      await this.accountRepository.create({id: id});
    }
    await this.accountRepository.coins(id).unlink(coinId);

    /*const existingLink = await this.accountCoinRepository.findOne({
      where: {
        accountId: id,
        coinId: coinId,
      }
    });
    if (existingLink === null) {
      return;
    }
    await this.accountCoinRepository.deleteById(existingLink.id);
    */
  }

  /*@patch('/accounts/{id}/coins', {
    responses: {
      '200': {
        description: 'Account.Coin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coin, {partial: true}),
        },
      },
    })
    coin: Partial<Coin>,
    @param.query.object('where', getWhereSchemaFor(Coin)) where?: Where<Coin>,
  ): Promise<Count> {
    return this.accountRepository.coins(id).patch(coin, where);
  }*/

  /*@del('/accounts/{id}/coins', {
    responses: {
      '200': {
        description: 'Account.Coin DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Coin)) where?: Where<Coin>,
  ): Promise<Count> {
    return this.accountRepository.coins(id).delete(where);
  }*/
}

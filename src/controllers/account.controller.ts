import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Account, AccountToken, Token, TokenQuery} from '../models';
import {AccountRepository} from '../repositories';

export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @post('/accounts')
  @response(200, {
    description: 'Account model instance',
    content: {'application/json': {schema: getModelSchemaRef(Account)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccount',
            exclude: ['createdAt', 'updatedAt', 'queryCount']
          }),
        },
      },
    })
    account: Account, //Omit<Account, 'id'>,
  ): Promise<Account> {
    return this.accountRepository.create(account);
  }

  @get('/accounts/count')
  @response(200, {
    description: 'Account model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @get('/accounts')
  @response(200, {
    description: 'Array of Account model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Account, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Account) filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.accountRepository.find(filter);
  }

  /*@patch('/accounts')
  @response(200, {
    description: 'Account PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.updateAll(account, where);
  }*/

  @get('/accounts/{id}')
  @response(200, {
    description: 'Account model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Account, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Account, {exclude: 'where'}) filter?: FilterExcludingWhere<Account>
  ): Promise<Account> {
    return this.accountRepository.findById(id, filter);
  }

  @patch('/accounts/{id}')
  @response(204, {
    description: 'Account PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true, exclude: ['createdAt', 'updatedAt']}),
        },
      },
    })
    account: Account,
  ): Promise<void> {
    await this.accountRepository.updateById(id, account);
  }

  @put('/accounts/{id}')
  @response(204, {
    description: 'Account PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() account: Account,
  ): Promise<void> {
    await this.accountRepository.replaceById(id, account);
  }

  @del('/accounts/{id}')
  @response(204, {
    description: 'Account DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accountRepository.deleteById(id);
  }

  /// Relations

  @get('/accounts/{id}/tokens', {
    responses: {
      '200': {
        description: 'List of favorite tokens for account (as Token objects)',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Token)},
          },
        },
      },
    },
  })
  async findFavoriteTokens(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Token>,
  ): Promise<Token[]> {
    return this.accountRepository.tokens(id).find(filter);
  }

  @get('/accounts/{id}/token-links', {
    responses: {
      '200': {
        description: 'Favorite tokens for this account (as links)',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AccountToken)},
          },
        },
      },
    },
  })
  async findFavoriteTokenLinks(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AccountToken>,
  ): Promise<AccountToken[]> {
    return this.accountRepository.accountTokens(id).find(filter);
  }

  @post('/accounts/{id}/account-tokens', {
    description: "Add favorite token to wallet",
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccountToken)}},
      },
    },
  })
  async addFavoriteToken(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccountToken, {
            title: 'NewAccountTokenInAccount',
            exclude: ['id', 'createdAt', 'updatedAt'],
            optional: ['accountId']
          }),
        },
      },
    }) accountToken: Omit<AccountToken, 'id'>,
  ): Promise<AccountToken> {
    return this.accountRepository.accountTokens(id).create(accountToken);
  }

  /*@patch('/accounts/{id}/account-tokens', {
    responses: {
      '200': {
        description: 'Account.AccountToken PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchAccountToken(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccountToken, {partial: true}),
        },
      },
    })
    accountToken: Partial<AccountToken>,
    @param.query.object('where', getWhereSchemaFor(AccountToken)) where?: Where<AccountToken>,
  ): Promise<Count> {
    return this.accountRepository.accountTokens(id).patch(accountToken, where);
  }*/

  @del('/accounts/{id}/account-tokens', {
    description: "Remove token from favorite tokens for this wallet",
    responses: {
      '200': {
        description: 'Account.AccountToken DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async removeFavoriteToken(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccountToken)) where?: Where<AccountToken>,
  ): Promise<Count> {
    return this.accountRepository.accountTokens(id).delete(where);
  }

  /// QUERIES

  @get('/accounts/{id}/token-queries', {
    description: "Find token query previously executed from this account",
    responses: {
      '200': {
        description: 'Array of Account has many TokenQuery',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TokenQuery)},
          },
        },
      },
    },
  })
  async findTokenQuery(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TokenQuery>,
  ): Promise<TokenQuery[]> {
    return this.accountRepository.tokenQueries(id).find(filter);
  }

  @post('/accounts/{id}/token-queries', {
    description: "Create token query from selected account",
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(TokenQuery)}},
      },
    },
  })
  async createTokenQuery(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {
            title: 'NewTokenQueryInAccount',
            exclude: ['id', 'createdAt', 'updatedAt'],
            optional: ['accountId']
          }),
        },
      },
    }) tokenQuery: Omit<TokenQuery, 'id'>,
  ): Promise<TokenQuery> {
    return this.accountRepository.tokenQueries(id).create(tokenQuery);
  }

  @patch('/accounts/{id}/token-queries', {
    description: "Update token query info",
    responses: {
      '200': {
        description: 'Account.TokenQuery PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchTokenQuery(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {partial: true}),
        },
      },
    })
    tokenQuery: Partial<TokenQuery>,
    @param.query.object('where', getWhereSchemaFor(TokenQuery)) where?: Where<TokenQuery>,
  ): Promise<Count> {
    return this.accountRepository.tokenQueries(id).patch(tokenQuery, where);
  }

  /*@del('/accounts/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Account.TokenQuery DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteTokenQuery(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TokenQuery)) where?: Where<TokenQuery>,
  ): Promise<Count> {
    return this.accountRepository.tokenQueries(id).delete(where);
  }*/
}

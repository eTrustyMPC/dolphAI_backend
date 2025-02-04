import {
  Count,
  CountSchema,
  Filter,
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
  requestBody,
} from '@loopback/rest';
import {
  Account,
  AccountToken,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountAccountTokenController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/account-tokens', {
    responses: {
      '200': {
        description: 'Array of Account has many AccountToken',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AccountToken)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AccountToken>,
  ): Promise<AccountToken[]> {
    return this.accountRepository.accountTokens(id).find(filter);
  }

  @post('/accounts/{id}/account-tokens', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccountToken)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccountToken, {
            title: 'NewAccountTokenInAccount',
            exclude: ['id'],
            optional: ['accountId']
          }),
        },
      },
    }) accountToken: Omit<AccountToken, 'id'>,
  ): Promise<AccountToken> {
    return this.accountRepository.accountTokens(id).create(accountToken);
  }

  @patch('/accounts/{id}/account-tokens', {
    responses: {
      '200': {
        description: 'Account.AccountToken PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
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
  }

  @del('/accounts/{id}/account-tokens', {
    responses: {
      '200': {
        description: 'Account.AccountToken DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccountToken)) where?: Where<AccountToken>,
  ): Promise<Count> {
    return this.accountRepository.accountTokens(id).delete(where);
  }
}

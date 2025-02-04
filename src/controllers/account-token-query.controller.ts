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
  TokenQuery,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountTokenQueryController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/token-queries', {
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
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TokenQuery>,
  ): Promise<TokenQuery[]> {
    return this.accountRepository.tokenQueries(id).find(filter);
  }

  @post('/accounts/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(TokenQuery)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {
            title: 'NewTokenQueryInAccount',
            exclude: ['id'],
            optional: ['accountId']
          }),
        },
      },
    }) tokenQuery: Omit<TokenQuery, 'id'>,
  ): Promise<TokenQuery> {
    return this.accountRepository.tokenQueries(id).create(tokenQuery);
  }

  @patch('/accounts/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Account.TokenQuery PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
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

  @del('/accounts/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Account.TokenQuery DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TokenQuery)) where?: Where<TokenQuery>,
  ): Promise<Count> {
    return this.accountRepository.tokenQueries(id).delete(where);
  }
}

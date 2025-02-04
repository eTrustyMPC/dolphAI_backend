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
Token,
TokenQuery,
Account,
} from '../models';
import {TokenRepository} from '../repositories';

export class TokenAccountController {
  constructor(
    @repository(TokenRepository) protected tokenRepository: TokenRepository,
  ) { }

  @get('/tokens/{id}/accounts', {
    responses: {
      '200': {
        description: 'Array of Token has many Account through TokenQuery',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Account)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.tokenRepository.accounts(id).find(filter);
  }

  @post('/tokens/{id}/accounts', {
    responses: {
      '200': {
        description: 'create a Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Account)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Token.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccountInToken',
            exclude: ['id'],
          }),
        },
      },
    }) account: Omit<Account, 'id'>,
  ): Promise<Account> {
    return this.tokenRepository.accounts(id).create(account);
  }

  @patch('/tokens/{id}/accounts', {
    responses: {
      '200': {
        description: 'Token.Account PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Partial<Account>,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return this.tokenRepository.accounts(id).patch(account, where);
  }

  @del('/tokens/{id}/accounts', {
    responses: {
      '200': {
        description: 'Token.Account DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Account)) where?: Where<Account>,
  ): Promise<Count> {
    return this.tokenRepository.accounts(id).delete(where);
  }
}

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
Token,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountTokenController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/tokens', {
    responses: {
      '200': {
        description: 'Array of Account has many Token through TokenQuery',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Token)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Token>,
  ): Promise<Token[]> {
    return this.accountRepository.tokens(id).find(filter);
  }

  @post('/accounts/{id}/tokens', {
    responses: {
      '200': {
        description: 'create a Token model instance',
        content: {'application/json': {schema: getModelSchemaRef(Token)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Token, {
            title: 'NewTokenInAccount',
            exclude: ['id'],
          }),
        },
      },
    }) token: Omit<Token, 'id'>,
  ): Promise<Token> {
    return this.accountRepository.tokens(id).create(token);
  }

  @patch('/accounts/{id}/tokens', {
    responses: {
      '200': {
        description: 'Account.Token PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Token, {partial: true}),
        },
      },
    })
    token: Partial<Token>,
    @param.query.object('where', getWhereSchemaFor(Token)) where?: Where<Token>,
  ): Promise<Count> {
    return this.accountRepository.tokens(id).patch(token, where);
  }

  @del('/accounts/{id}/tokens', {
    responses: {
      '200': {
        description: 'Account.Token DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Token)) where?: Where<Token>,
  ): Promise<Count> {
    return this.accountRepository.tokens(id).delete(where);
  }
}

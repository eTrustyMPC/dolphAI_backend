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
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Account, Token, TokenQuery} from '../models';
import {TokenQueryRepository} from '../repositories';

export class TokenQueryController {
  constructor(
    @repository(TokenQueryRepository)
    public tokenQueryRepository: TokenQueryRepository,
  ) { }

  @post('/token-queries')
  @response(200, {
    description: 'TokenQuery model instance',
    content: {'application/json': {schema: getModelSchemaRef(TokenQuery)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {
            title: 'NewTokenQuery',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    tokenQuery: Omit<TokenQuery, 'id'>,
  ): Promise<TokenQuery> {
    return this.tokenQueryRepository.create(tokenQuery);
  }

  @get('/token-queries/count')
  @response(200, {
    description: 'TokenQuery model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TokenQuery) where?: Where<TokenQuery>,
  ): Promise<Count> {
    return this.tokenQueryRepository.count(where);
  }

  @get('/token-queries')
  @response(200, {
    description: 'Array of TokenQuery model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TokenQuery, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TokenQuery) filter?: Filter<TokenQuery>,
  ): Promise<TokenQuery[]> {
    return this.tokenQueryRepository.find(filter);
  }

  /*@patch('/token-queries')
  @response(200, {
    description: 'TokenQuery PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {partial: true}),
        },
      },
    })
    tokenQuery: TokenQuery,
    @param.where(TokenQuery) where?: Where<TokenQuery>,
  ): Promise<Count> {
    return this.tokenQueryRepository.updateAll(tokenQuery, where);
  }*/

  @get('/token-queries/{id}')
  @response(200, {
    description: 'TokenQuery model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TokenQuery, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TokenQuery, {exclude: 'where'}) filter?: FilterExcludingWhere<TokenQuery>
  ): Promise<TokenQuery> {
    return this.tokenQueryRepository.findById(id, filter);
  }

  @patch('/token-queries/{id}')
  @response(204, {
    description: 'TokenQuery PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {partial: true, exclude: ['createdAt', 'updatedAt']}),
        },
      },
    })
    tokenQuery: TokenQuery,
  ): Promise<void> {
    await this.tokenQueryRepository.updateById(id, tokenQuery);
  }

  @put('/token-queries/{id}')
  @response(204, {
    description: 'TokenQuery PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tokenQuery: TokenQuery,
  ): Promise<void> {
    await this.tokenQueryRepository.replaceById(id, tokenQuery);
  }

  @del('/token-queries/{id}')
  @response(204, {
    description: 'TokenQuery DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tokenQueryRepository.deleteById(id);
  }

  /// RELATIONS

  @get('/token-queries/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to TokenQuery',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof TokenQuery.prototype.id,
  ): Promise<Account> {
    return this.tokenQueryRepository.account(id);
  }

  @get('/token-queries/{id}/token', {
    responses: {
      '200': {
        description: 'Token belonging to TokenQuery',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Token),
          },
        },
      },
    },
  })
  async getToken(
    @param.path.string('id') id: typeof TokenQuery.prototype.id,
  ): Promise<Token> {
    return this.tokenQueryRepository.token(id);
  }
}

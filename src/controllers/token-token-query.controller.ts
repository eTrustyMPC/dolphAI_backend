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
} from '../models';
import {TokenRepository} from '../repositories';

export class TokenTokenQueryController {
  constructor(
    @repository(TokenRepository) protected tokenRepository: TokenRepository,
  ) { }

  @get('/tokens/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Array of Token has many TokenQuery',
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
    return this.tokenRepository.tokenQueries(id).find(filter);
  }

  @post('/tokens/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Token model instance',
        content: {'application/json': {schema: getModelSchemaRef(TokenQuery)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Token.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenQuery, {
            title: 'NewTokenQueryInToken',
            exclude: ['id'],
            optional: ['tokenId']
          }),
        },
      },
    }) tokenQuery: Omit<TokenQuery, 'id'>,
  ): Promise<TokenQuery> {
    return this.tokenRepository.tokenQueries(id).create(tokenQuery);
  }

  @patch('/tokens/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Token.TokenQuery PATCH success count',
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
    return this.tokenRepository.tokenQueries(id).patch(tokenQuery, where);
  }

  @del('/tokens/{id}/token-queries', {
    responses: {
      '200': {
        description: 'Token.TokenQuery DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TokenQuery)) where?: Where<TokenQuery>,
  ): Promise<Count> {
    return this.tokenRepository.tokenQueries(id).delete(where);
  }
}

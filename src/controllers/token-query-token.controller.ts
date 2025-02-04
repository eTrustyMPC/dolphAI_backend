import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TokenQuery,
  Token,
} from '../models';
import {TokenQueryRepository} from '../repositories';

export class TokenQueryTokenController {
  constructor(
    @repository(TokenQueryRepository)
    public tokenQueryRepository: TokenQueryRepository,
  ) { }

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

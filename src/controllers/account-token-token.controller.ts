import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AccountToken,
  Token,
} from '../models';
import {AccountTokenRepository} from '../repositories';

export class AccountTokenTokenController {
  constructor(
    @repository(AccountTokenRepository)
    public accountTokenRepository: AccountTokenRepository,
  ) { }

  @get('/account-tokens/{id}/token', {
    responses: {
      '200': {
        description: 'Token belonging to AccountToken',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Token),
          },
        },
      },
    },
  })
  async getToken(
    @param.path.string('id') id: typeof AccountToken.prototype.id,
  ): Promise<Token> {
    return this.accountTokenRepository.token(id);
  }
}

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
  Account,
} from '../models';
import {TokenQueryRepository} from '../repositories';

export class TokenQueryAccountController {
  constructor(
    @repository(TokenQueryRepository)
    public tokenQueryRepository: TokenQueryRepository,
  ) { }

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
}

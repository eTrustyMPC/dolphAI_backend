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
  Account,
} from '../models';
import {AccountTokenRepository} from '../repositories';

export class AccountTokenAccountController {
  constructor(
    @repository(AccountTokenRepository)
    public accountTokenRepository: AccountTokenRepository,
  ) { }

  @get('/account-tokens/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to AccountToken',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof AccountToken.prototype.id,
  ): Promise<Account> {
    return this.accountTokenRepository.account(id);
  }
}

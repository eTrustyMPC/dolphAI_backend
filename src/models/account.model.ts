import {Entity, hasMany, model, property} from '@loopback/repository';
import {AccountToken} from './account-token.model';
import {TokenQuery} from './token-query.model';
import {Token} from './token.model';

@model({
  settings: {
    description: "SUI wallet",
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class Account extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    jsonSchema: {
      description: "SUI wallet address",
      examples: [
        "0x3f3b11a18ffe59368cb935771df277ac531bf60b9a0a201c78e9d1aabe7bc214"
      ]
    }
  })
  id?: string;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  queryCount?: number;

  @property({
    index: true,
    type: 'date',
    hidden: true
  })
  createdAt?: string;

  @property({
    index: true,
    type: 'date',
    hidden: true
  })
  updatedAt?: string;

  @hasMany(() => TokenQuery)
  tokenQueries: TokenQuery[];

  @hasMany(() => AccountToken)
  accountTokens: AccountToken[];

  @hasMany(() => Token, {through: {model: () => TokenQuery}})
  tokens: Token[];
  // Define well-known properties here

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;

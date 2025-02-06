import {Entity, hasMany, model, property} from '@loopback/repository';
import {ObjectId} from 'bson';
import {AccountToken} from './account-token.model';
import {TokenQuery} from './token-query.model';
import {Token} from './token.model';

@model({
  settings: {
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
    default: () => (new ObjectId()).toString(),
  })
  id?: string;

  @property({
    index: true,
    type: 'string',
    unique: true,
  })
  address?: string;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  queryCount?: number;

  @property({
    index: true,
    type: 'date',
  })
  createdAt?: string;

  @property({
    index: true,
    type: 'date',
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

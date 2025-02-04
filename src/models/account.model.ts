import {Entity, model, property, hasMany} from '@loopback/repository';
import {ObjectId} from 'bson';
import {TokenQuery} from './token-query.model';
import {AccountToken} from './account-token.model';
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
    type: 'string',
    index: true,
    unique: true,
  })
  address?: string;

  @property({
    type: 'number',
    index: true,
    default: 0,
  })
  queryCount?: number;

  @property({
    type: 'date',
    index: true,
  })
  createdAt?: string;

  @property({
    type: 'date',
    index: true,
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

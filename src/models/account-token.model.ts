import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ObjectId} from 'bson';
import {Account} from './account.model';
import {Token} from './token.model';

@model({
  settings: {
    description: "Favorite tokens for SUI accounts",
    strict: true,
    forceId: true,
    strictObjectIDCoercion: true,
  }
})
export class AccountToken extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    default: () => (new ObjectId()).toString()
  })
  id?: string;
  @property({
    type: 'date',
    index: true,
    hidden: true
  })
  createdAt?: string;

  @property({
    type: 'date',
    index: true,
    hidden: true
  })
  updatedAt?: string;

  @belongsTo(() => Account)
  accountId: string;

  @belongsTo(() => Token)
  tokenId: string;

  constructor(data?: Partial<AccountToken>) {
    super(data);
  }
}

export interface AccountTokenRelations {
  // describe navigational properties here
}

export type AccountTokenWithRelations = AccountToken & AccountTokenRelations;

import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ObjectId} from 'bson';
import {Account} from './account.model';

@model({
  settings: {
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class AccountToken extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    default: () => (new ObjectId()).toString(),
  })
  id?: string;
  @property({
    type: 'string',
  })
  tokenId?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => Account)
  accountId: string;

  constructor(data?: Partial<AccountToken>) {
    super(data);
  }
}

export interface AccountTokenRelations {
  // describe navigational properties here
}

export type AccountTokenWithRelations = AccountToken & AccountTokenRelations;

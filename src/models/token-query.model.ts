import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ObjectId} from 'bson';
import {Account} from './account.model';
import {Token} from './token.model';

@model({
  settings: {
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class TokenQuery extends Entity {
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
  })
  searchStr?: string;

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

  @property({
    index: true,
    type: 'string',
    default: "pending",
  })
  status?: string;

  @belongsTo(() => Account)
  accountId: string;

  @belongsTo(() => Token)
  tokenId: string;

  constructor(data?: Partial<TokenQuery>) {
    super(data);
  }
}

export interface TokenQueryRelations {
  // describe navigational properties here
}

export type TokenQueryWithRelations = TokenQuery & TokenQueryRelations;

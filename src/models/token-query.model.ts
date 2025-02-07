import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ObjectId} from 'bson';
import {Account} from './account.model';
import {Token} from './token.model';

@model({
  settings: {
    description: "Search query from user wallet about Token",
    strict: true,
    forceId: true,
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
    jsonSchema: {
      description: "User input used for search"
    }
  })
  searchStr?: string;

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

  @property({
    index: true,
    type: 'string',
    default: "pending",
    hidden: true
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

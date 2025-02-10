import {Entity, model, property} from '@loopback/repository';
import {ObjectId} from 'bson';

@model({
  settings: {
    description: "Favorite tokens for SUI accounts",
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class AccountCoin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    default: () => (new ObjectId()).toString(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'string',
    required: true,
  })
  coinId: string;


  constructor(data?: Partial<AccountCoin>) {
    super(data);
  }
}

export interface AccountCoinRelations {
  // describe navigational properties here
}

export type AccountCoinWithRelations = AccountCoin & AccountCoinRelations;

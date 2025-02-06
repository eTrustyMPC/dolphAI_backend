import {Entity, hasMany, model, property} from '@loopback/repository';
import {ObjectId} from 'bson';
import {Account} from './account.model';
import {TokenQuery} from './token-query.model';

@model({
  settings: {
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class Token extends Entity {
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
  address?: string;

  @property({
    index: true,
    type: 'string',
  })
  coinType?: string;

  @property({
    index: true,
    type: 'string',
  })
  coinName?: string;

  @property({
    index: true,
    type: 'string',
  })
  coinSymbol?: string;

  @property({
    type: 'string',
  })
  imgUrl?: string;

  @property({
    index: true,
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  securityMessage?: string;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  decimals?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  price?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  dominance?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  marketCap?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  circulatingSupply?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  totalSupply?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  maxSupply?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  volume?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  fdv?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  holdersCount?: number;

  @property({
    index: true,
    type: 'boolean',
  })
  isVerified?: boolean;

  @property({
    index: true,
    type: 'boolean',
  })
  isBridged?: boolean;

  @property({
    index: true,
    type: 'string',
  })
  socialWebsite?: string;

  @property({
    type: 'string',
  })
  socialDiscord?: string;

  @property({
    type: 'string',
  })
  socialGitHub?: string;

  @property({
    type: 'string',
  })
  socialTelegram?: string;

  @property({
    type: 'string',
  })
  socialTwitter?: string;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  queryCount?: number;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  uniqueQueryCount?: number;

  @property({
    index: true,
    type: 'string',
  })
  gptSummary?: string;

  @property({
    index: true,
    type: 'date',
  })
  onChainAt?: string;

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

  @hasMany(() => Account, {through: {model: () => TokenQuery}})
  accounts: Account[];

  constructor(data?: Partial<Token>) {
    super(data);
  }
}

export interface TokenRelations {
  // describe navigational properties here
}

export type TokenWithRelations = Token & TokenRelations;

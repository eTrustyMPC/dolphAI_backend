import {Entity, model, property, hasMany} from '@loopback/repository';
import {ObjectId} from 'bson';
import {TokenQuery} from './token-query.model';
import {Account} from './account.model';

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
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  coinType?: string;

  @property({
    type: 'string',
  })
  coinName?: string;

  @property({
    type: 'string',
  })
  coinSymbol?: string;

  @property({
    type: 'string',
  })
  imgUrl?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  securityMessage?: string;

  @property({
    type: 'number',
    default: 0,
  })
  decimals?: number;

  @property({
    type: 'number',
    default: 0,
  })
  price?: number;

  @property({
    type: 'number',
    default: 0,
  })
  dominance?: number;

  @property({
    type: 'number',
    default: 0,
  })
  marketCap?: number;

  @property({
    type: 'number',
    default: 0,
  })
  circulatingSupply?: number;

  @property({
    type: 'number',
    default: 0,
  })
  totalSupply?: number;

  @property({
    type: 'number',
    default: 0,
  })
  maxSupply?: number;

  @property({
    type: 'number',
    default: 0,
  })
  volume?: number;

  @property({
    type: 'number',
    default: 0,
  })
  fdv?: number;

  @property({
    type: 'number',
    default: 0,
  })
  holdersCount?: number;

  @property({
    type: 'boolean',
  })
  isVerified?: boolean;

  @property({
    type: 'boolean',
  })
  isBridged?: boolean;

  @property({
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
    type: 'number',
    default: 0,
  })
  queryCount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  uniqueQueryCount?: number;

  @property({
    type: 'string',
  })
  gptSummary?: string;

  @property({
    type: 'date',
  })
  onChainAt?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
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

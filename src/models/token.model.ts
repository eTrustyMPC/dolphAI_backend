import {Entity, hasMany, model, property} from '@loopback/repository';
import {Account} from './account.model';
import {TokenQuery} from './token-query.model';

@model({
  settings: {
    description: "SUI token",
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
    jsonSchema: {
      description: "SUI token address",
      //examples: [
      //  "0xaf9ef585e2efd13321d0a2181e1c0715f9ba28ed052055d33a8b164f6c146a56::tusdt::TUSDT"
      //]
    }
  })
  id?: string;

  @property({
    index: true,
    type: 'string',
    jsonSchema: {
      description: "Address in hex (tail metadata removed)",
      //examples: [
      //  "0xaf9ef585e2efd13321d0a2181e1c0715f9ba28ed052055d33a8b164f6c146a56"
      //]
    }
  })
  address?: string | null;

  @property({
    index: true,
    type: 'string',

  })
  coinType?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  coinName?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  coinSymbol?: string | null;

  @property({
    type: 'string',
  })
  imgUrl?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  description?: string | null;

  @property({
    type: 'string',
  })
  securityMessage?: string | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  decimals?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  price?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  dominance?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  marketCap?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  circulatingSupply?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  totalSupply?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  maxSupply?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  volume?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  fdv?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  holdersCount?: number | null;

  @property({
    index: true,
    type: 'boolean',
  })
  isVerified?: boolean | null;

  @property({
    index: true,
    type: 'boolean',
  })
  isBridged?: boolean | null;

  @property({
    index: true,
    type: 'string',
  })
  socialWebsite?: string | null;

  @property({
    type: 'string',
  })
  socialDiscord?: string | null;

  @property({
    type: 'string',
  })
  socialGitHub?: string | null;

  @property({
    type: 'string',
  })
  socialTelegram?: string | null;

  @property({
    type: 'string',
  })
  socialTwitter?: string | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  queryCount?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  uniqueQueryCount?: number | null;

  @property({
    index: true,
    type: 'string',
  })
  gptSummary?: string | null;

  @property({
    index: true,
    type: 'date',
  })
  onChainAt?: string | null;

  @property({
    index: true,
    type: 'date',
    hidden: true
  })
  createdAt?: string | null;

  @property({
    index: true,
    type: 'date',
    hidden: true
  })
  updatedAt?: string | null;

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

import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class TokenLinks extends Model {
  @property({
    type: 'string',
  })
  website?: string | null;

  @property({
    type: 'string',
  })
  whitepaper?: string | null;

  @property({
    type: 'string',
  })
  contract?: string | null;

  @property({
    type: 'string',
  })
  explorer?: string | null;

  @property({
    type: 'string',
  })
  telegram?: string | null;

  @property({
    type: 'string',
  })
  twitter?: string | null;

  @property({
    type: 'string',
  })
  discord?: string | null;
}

@model()
export class TokenMetrics extends Model {
  @property({
    type: 'number',
  })
  holders?: number | null;

  @property({
    type: 'number',
  })
  volume24h?: number | null;

  @property({
    type: 'number',
  })
  marketCap?: number | null;
}

@model()
export class TokenDynamics extends Model {
  @property({
    type: 'number',
  })
  weeklyActiveUsers?: number | null;

  @property({
    type: 'number',
  })
  weeklyTxCount?: number | null;

  @property({
    type: 'number',
  })
  weeklyVolumeChange?: number | null;

  @property({
    type: 'number',
  })
  weeklyHolderChange?: number | null;

  @property({
    type: 'number',
  })
  topHoldersConcentration?: number | null;
}


@model({
  settings: {
    description: "Full coin data",
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class Coin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    index: true,
    type: 'string',
  })
  name?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  address?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  symbol?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  description?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  llmSummary?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  icon?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  price?: string | null;

  @property({
    index: true,
    type: 'number',
  })
  priceChange24h?: number | null;

  @property({
    index: true,
    type: 'string',
  })
  marketCapChange?: string | null;

  @property({
    index: true,
    type: 'number',
  })
  marketCap?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  volume24h?: number | null;

  @property({
    index: true,
    type: 'string',
  })
  volumeChange24h?: string | null;

  @property({
    index: true,
    type: 'number',
  })
  fdv?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  volMktCap?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  holders?: number | null;

  @property({
    index: true,
    type: 'number',
    default: 0,
  })
  queryCount?: number;

  @property({
    type: TokenMetrics,
  })
  metrics?: TokenMetrics | null;

  @property({
    type: TokenDynamics,
  })
  dynamics?: TokenDynamics | null;

  @property({
    type: 'array',
    itemType: 'string',
  })
  recentArticles?: string[] | null;

  @property({
    type: 'array',
    itemType: 'string',
  })
  recentUpdates?: string[] | null;

  @property({
    type: TokenLinks,
  })
  links?: TokenLinks | null;

  @property({
    type: 'array',
    itemType: 'string',
  })
  stakingPools?: string[] | null;


  constructor(data?: Partial<Coin>) {
    super(data);
  }
}

export interface CoinRelations {
  // describe navigational properties here
}

export type CoinWithRelations = Coin & CoinRelations;

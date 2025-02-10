import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    description: "Extracted token data",
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
  name?: string;

  @property({
    index: true,
    type: 'string',

  })
  address?: string;

  @property({
    index: true,
    type: 'string',

  })
  symbol?: string;

  @property({
    index: true,
    type: 'string',

  })
  description?: string;

  @property({
    index: true,
    type: 'string',

  })
  llmSummary?: string;

  @property({
    index: true,
    type: 'string',

  })
  icon?: string;

  @property({
    index: true,
    type: 'string',

  })
  price?: string;

  @property({
    index: true,
    type: 'number',

  })
  priceChange24h?: number;

  @property({
    index: true,
    type: 'string',

  })
  marketCapChange?: string;

  @property({
    index: true,
    type: 'number',

  })
  marketCap?: number;

  @property({
    index: true,
    type: 'number',

  })
  volume24h?: number;

  @property({
    index: true,
    type: 'string',

  })
  volumeChange24h?: string;

  @property({
    index: true,
    type: 'number',

  })
  fdv?: number;

  @property({
    index: true,
    type: 'number',

  })
  volMktCap?: number;

  @property({
    index: true,
    type: 'number',

  })
  holders?: number;

  constructor(data?: Partial<Coin>) {
    super(data);
  }
}

export interface CoinRelations {
  // describe navigational properties here
}

export type CoinWithRelations = Coin & CoinRelations;

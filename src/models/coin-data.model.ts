import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    description: "Cached coin data",
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class CoinData extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    //required: true,
  })
  coinType?: string;

  @property({
    index: true,
    type: 'string',
  })
  objectId?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  coinName?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  coinDenom?: string | null;

  @property({
    index: true,
    type: 'number',
  })
  decimals?: number | null;

  @property({
    index: true,
    type: 'string',
  })
  coinSymbol?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  imgUrl?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  description?: string | null;

  @property({
    index: true,
    type: 'number',
  })
  supply?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  supplyInUsd?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  price?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  dominance?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  circulatingSupply?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  marketCap?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  totalVolume?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  maxSupply?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  fdv?: number | null;

  @property({
    index: true,
    type: 'number',
  })
  holdersCount?: number | null;

  @property({
    index: true,
    type: 'string',
  })
  packageId?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  packageSecurityMessage?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  creatorAddress?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  creatorName?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  creatorImg?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  creatorSecurityMessage?: string | null;

  @property({
    index: true,
    type: 'string',
  })
  createTimestamp?: number | null;

  @property({
    index: true,
    type: 'string',
  })
  isVerified?: boolean | null;

  @property({
    index: true,
    type: 'string',
  })
  isBridged?: boolean | null;

  @property({
    index: true,
    type: 'string',
  })
  securityMessage?: string | null;

  //@hasOne(() => CoinMetaData, {keyTo: 'coinType'})
  //coinMetaData?: CoinMetaData | null;

  constructor(data?: Partial<CoinData>) {
    super(data);
  }
}

export interface CoinDataRelations {
  // describe navigational properties here
}

export type CoinDataWithRelations = CoinData & CoinDataRelations;

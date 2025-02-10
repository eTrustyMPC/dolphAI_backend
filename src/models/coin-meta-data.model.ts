import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    description: "Cached coin metadata",
    strict: true,
    forceId: false,
    strictObjectIDCoercion: true,
  }
})
export class CoinMetaData extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    //required: true,
  })
  //@belongsTo(() => CoinData, {name: 'coinData'})
  coinType?: string;

  @property({
    index: true,
    type: 'number',
  })
  totalSupply?: number;

  @property({
    index: true,
    type: 'number',
  })
  volume?: number;

  @property({
    index: true,
    type: 'string',
  })
  socialWebsite?: string;

  @property({
    index: true,
    type: 'string',
  })
  socialDiscord?: string;

  @property({
    index: true,
    type: 'string',
  })
  socialEmail?: string;

  @property({
    index: true,
    type: 'string',
  })
  socialGitHub?: string;

  @property({
    index: true,
    type: 'string',
  })
  socialTelegram?: string;

  @property({
    index: true,
    type: 'string',
  })
  socialTwitter?: string;

  //
  //coinType: string;

  constructor(data?: Partial<CoinMetaData>) {
    super(data);
  }
}

export interface CoinMetaDataRelations {
  // describe navigational properties here
}

export type CoinMetaDataWithRelations = CoinMetaData & CoinMetaDataRelations;

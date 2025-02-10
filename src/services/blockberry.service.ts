import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {BlockberryDataSource} from '../datasources';

export interface CoinMetadata {
  coinType: string,
  coinName: string,
  coinSymbol: string,
  decimals: number,
  imgUrl: string,
  description: string,
  circulatingSupply: number,
  marketCap: number,
  securityMessage: string,
  // unique fields
  totalSupply: number,
  volume: number,
  socialWebsite: string,
  socialDiscord: string,
  socialEmail: string,
  socialGitHub: string,
  socialTelegram: string,
  socialTwitter: string,
}

export interface CoinData {
  coinType: string,
  objectId: string,
  coinName: string,
  coinDenom: string,
  decimals: number,
  coinSymbol: string,
  imgUrl: string,
  description: string,
  supply: number,
  supplyInUsd: number,
  price: number,
  dominance: number,
  circulatingSupply: number,
  marketCap: number,
  totalVolume: number,
  maxSupply: number,
  fdv: number,
  holdersCount: number,
  packageId: string,
  packageSecurityMessage: string,
  creatorAddress: string,
  creatorName: string,
  creatorImg: string,
  creatorSecurityMessage: string,
  createTimestamp: number,
  isVerified: boolean,
  isBridged: boolean,
  securityMessage: string
}

export interface Blockberry {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getCoinMetadata(coinType: string): Promise<CoinMetadata>;
  getCoinByCoinType(coinType: string): Promise<CoinData>;
  getHoldersCountByCoinType(coinType: string): Promise<number>;
}

export class BlockberryProvider implements Provider<Blockberry> {
  constructor(
    // blockberry must match the name property in the datasource json file
    @inject('datasources.blockberry')
    protected dataSource: BlockberryDataSource = new BlockberryDataSource(),
  ) { }

  value(): Promise<Blockberry> {
    return getService(this.dataSource);
  }
}

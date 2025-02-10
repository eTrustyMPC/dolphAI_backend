import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CoinData, CoinDataRelations} from '../models';
import {CoinMetaDataRepository} from './coin-meta-data.repository';

export class CoinDataRepository extends DefaultCrudRepository<
  CoinData,
  typeof CoinData.prototype.coinType,
  CoinDataRelations
> {

  //public readonly coinMetaData: HasOneRepositoryFactory<CoinMetaData, typeof CoinData.prototype.coinType>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CoinMetaDataRepository') protected coinMetaDataRepositoryGetter: Getter<CoinMetaDataRepository>,
  ) {
    super(CoinData, dataSource);
    //this.coinMetaData = this.createHasOneRepositoryFactoryFor('coinMetaData', coinMetaDataRepositoryGetter);
    //this.registerInclusionResolver('coinMetaData', this.coinMetaData.inclusionResolver);
  }
}

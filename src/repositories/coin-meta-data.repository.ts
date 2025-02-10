import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CoinMetaData, CoinMetaDataRelations} from '../models';
import {CoinDataRepository} from './coin-data.repository';

export class CoinMetaDataRepository extends DefaultCrudRepository<
  CoinMetaData,
  typeof CoinMetaData.prototype.coinType,
  CoinMetaDataRelations
> {

  //public readonly coinData: BelongsToAccessor<CoinData, typeof CoinMetaData.prototype.coinType>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CoinDataRepository') protected coinDataRepositoryGetter: Getter<CoinDataRepository>,
  ) {
    super(CoinMetaData, dataSource);
    //this.coinData = this.createBelongsToAccessorFor('coinData', coinDataRepositoryGetter,);
    //this.registerInclusionResolver('coinData', this.coinData.inclusionResolver);
  }
}

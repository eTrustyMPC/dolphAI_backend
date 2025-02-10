/*import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';*/
import {repository} from '@loopback/repository';
/*import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';*/
/*import {
  CoinData,
  CoinMetaData,
} from '../models';*/
import {CoinDataRepository} from '../repositories';

export class CoinDataCoinMetaDataController {
  constructor(
    @repository(CoinDataRepository) protected coinDataRepository: CoinDataRepository,
  ) { }

  /*@get('/coin-data/{id}/coin-meta-data', {
    responses: {
      '200': {
        description: 'CoinData has one CoinMetaData',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CoinMetaData),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CoinMetaData>,
  ): Promise<CoinMetaData> {
    return this.coinDataRepository.coinMetaData(id).get(filter);
  }

  @post('/coin-data/{id}/coin-meta-data', {
    responses: {
      '200': {
        description: 'CoinData model instance',
        content: {'application/json': {schema: getModelSchemaRef(CoinMetaData)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CoinData.prototype.coinType,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoinMetaData, {
            title: 'NewCoinMetaDataInCoinData',
            exclude: ['coinType'],
            optional: ['coinType']
          }),
        },
      },
    }) coinMetaData: Omit<CoinMetaData, 'coinType'>,
  ): Promise<CoinMetaData> {
    return this.coinDataRepository.coinMetaData(id).create(coinMetaData);
  }

  @patch('/coin-data/{id}/coin-meta-data', {
    responses: {
      '200': {
        description: 'CoinData.CoinMetaData PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CoinMetaData, {partial: true}),
        },
      },
    })
    coinMetaData: Partial<CoinMetaData>,
    @param.query.object('where', getWhereSchemaFor(CoinMetaData)) where?: Where<CoinMetaData>,
  ): Promise<Count> {
    return this.coinDataRepository.coinMetaData(id).patch(coinMetaData, where);
  }

  @del('/coin-data/{id}/coin-meta-data', {
    responses: {
      '200': {
        description: 'CoinData.CoinMetaData DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CoinMetaData)) where?: Where<CoinMetaData>,
  ): Promise<Count> {
    return this.coinDataRepository.coinMetaData(id).delete(where);
  }*/
}

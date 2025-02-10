import {inject} from '@loopback/core';
import {
  get,
  Request,
  response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {Blockberry, Searapi} from '../services';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.blockberry') protected blockberry: Blockberry,
    @inject('services.searapi') protected searapi: Searapi,
  ) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  async ping(): Promise<object> {
    //const coinType = encodeURIComponent('0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN');
    //const holdersCount = await this.blockberry.getHoldersCountByCoinType(coinType);
    //console.log(holdersCount);
    const q = "CETUS crypto token";
    const searchResults = await this.searapi.searchNews(q);
    console.log(searchResults);

    await delay(100);

    //const coinMetadata = await this.blockberry.getCoinMetadata(coinType);
    //console.log('coinMetadata');
    //console.log(coinMetadata);

    //await delay(15000);

    //const coinData = await this.blockberry.getCoinByCoinType(coinType);
    //console.log(coinData);


    // Reply with a greeting, the current time, the url, and request headers
    return {
      data: {
        //coinMetadata: coinMetadata,
        //coinData: coinData,
        //holdersCount: holdersCount,
        searchResults: searchResults,
      },
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      //headers: Object.assign({}, this.req.headers),
    };
  }
}

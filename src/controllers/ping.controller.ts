import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  Request,
  response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {CoinRepository} from '../repositories';
import {Atoma, Blockberry, Searapi} from '../services';

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
    @repository(CoinRepository) public coinRepository: CoinRepository,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.blockberry') protected blockberry: Blockberry,
    @inject('services.searapi') protected searapi: Searapi,
    @inject('services.atoma') protected atoma: Atoma,
  ) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  async ping(): Promise<object> {
    //const coinType = encodeURIComponent('0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN');
    //const holdersCount = await this.blockberry.getHoldersCountByCoinType(coinType);
    //console.log(holdersCount);
    //const q = "CETUS crypto token";
    //const searchResults = await this.searapi.searchNews(q);
    //console.log(searchResults);

    const coinType = '0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9::ocean::OCEAN';
    const coin = await this.coinRepository.findById(coinType);
    //console.log(coin);

    const prompt = "I have a default description of crypto token: " +
      `'${coin.description}'` +
      "Could you please transfrom and make value proposition " +
      "more clear and human readable (for basic crypto user) of the project, " +
      "base on the information you have and you can search. " +
      "Otherwise return provided basic value. 2-3 sentances max.";

    const messages = [
      {
        "role": "user",
        "content": prompt,
      }
    ];
    //const messages_s = JSON.stringify(messages);
    console.log(messages);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let llmResponse: any = await this.atoma.simplePrompt(messages);
      llmResponse = llmResponse[0];
      llmResponse = llmResponse[0];
      console.log(llmResponse);
    } catch (e) {
      console.log(e);
    }


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
        //searchResults: searchResults,
      },
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      //headers: Object.assign({}, this.req.headers),
    };
  }
}

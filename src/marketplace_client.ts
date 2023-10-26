import axios, { AxiosInstance } from 'axios';
import { OrdinalsBotError } from './OrdinalsBotError';
import {
  MarketplaceCheckPaddingOutputRequest,
  MarketplaceCheckPaddingOutputResponse,
  MarketplaceCreateBuyOfferRequest,
  MarketplaceCreateBuyOfferResponse,
  MarketplaceCreatePaddingOutputsRequest,
  MarketplaceCreatePaddingOutputsResponse,
  MarketplaceCreateRequest,
  MarketplaceCreateResponse,
  MarketplaceGetListingResponse,
  MarketplaceListOridnalForSaleRequest,
  MarketplaceListOridnalForSaleResponse,
  MarketplaceSubmitBuyOfferRequest,
  MarketplaceSubmitBuyOfferResponse,
} from './types/markeplace_types';

export class MarketPlaceClient {
  private api_key: string;
  private instanceV1: AxiosInstance;

  constructor(key: string = '') {
    this.api_key = key;

    const createInstance = (): AxiosInstance => {
      const client = axios.create({
        baseURL: 'https://api.ordinalsbot.com/marketplace/',
        headers: {
          'x-api-key': this.api_key,
          Connection: 'Keep-Alive',
          'Content-Type': 'application/json',
        },
      });

      client.interceptors.response.use(
        ({ data }) => ('data' in data ? data.data : data),
        (err) => {
          if (axios.isAxiosError(err)) {
            throw new OrdinalsBotError(
              err.message,
              err.response?.statusText,
              err.response?.status
            );
          }

          if (err instanceof Error) throw err;

          return err;
        }
      );

      return client;
    };

    this.instanceV1 = createInstance();
  }

  async createMarketPlace(
    createMarketplaceRequest: MarketplaceCreateRequest
  ): Promise<MarketplaceCreateResponse> {
    return this.instanceV1.post(`/create-marketplace`, {
      params: createMarketplaceRequest,
    });
  }

  async listSaleForOrdinal(
    listSaleForOrdinalRequest: MarketplaceListOridnalForSaleRequest
  ): Promise<MarketplaceListOridnalForSaleResponse> {
    return this.instanceV1.post(`/create-listing`, {
      params: listSaleForOrdinalRequest,
    });
  }

  async createBuyOffer(
    createBuyOfferRequest: MarketplaceCreateBuyOfferRequest
  ): Promise<MarketplaceCreateBuyOfferResponse> {
    return this.instanceV1.post(`/create-offer`, {
      params: createBuyOfferRequest,
    });
  }

  async submitBuyOffer(
    submitBuyOfferRequest: MarketplaceSubmitBuyOfferRequest
  ): Promise<MarketplaceSubmitBuyOfferResponse> {
    return this.instanceV1.post(`/submit-offer`, {
      params: submitBuyOfferRequest,
    });
  }

  async checkPaddingOutput(
    checkPaddingOutputRequest: MarketplaceCheckPaddingOutputRequest
  ): Promise<MarketplaceCheckPaddingOutputResponse> {
    return this.instanceV1.post(`/confirm-padding-outputs`, {
      params: checkPaddingOutputRequest,
    });
  }

  async createPaddingOutput(
    createPaddingOutputRequest: MarketplaceCreatePaddingOutputsRequest
  ): Promise<MarketplaceCreatePaddingOutputsResponse> {
    return this.instanceV1.post(`/setup-padding-outputs`, {
      params: createPaddingOutputRequest,
    });
  }

  async getListing(): Promise<MarketplaceGetListingResponse> {
    return this.instanceV1.get(`/get-listing`);
  }
}

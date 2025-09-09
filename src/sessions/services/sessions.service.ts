import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '@tresdoce-nestjs-toolkit/http-client';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { SessionResponseDto, SessionErrorDto } from '../dtos/session-response.dto';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);
  private readonly adyenApiUrl: string;
  private readonly adyenApiKey: string;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.adyenApiUrl =
      this.configService.get<string>('services.adyen.url') || 'https://checkout-test.adyen.com/v69';
    this.adyenApiKey = this.configService.get<string>('services.adyen.apiKey') || '';
  }

  async createPaymentSession(createSessionDto: CreateSessionDto): Promise<SessionResponseDto> {
    try {
      this.logger.log(`Creating payment session for reference: ${createSessionDto.reference}`);

      // Validate required configuration
      if (!this.adyenApiKey) {
        throw new InternalServerErrorException('Adyen API key not configured');
      }

      const requestBody = {
        amount: createSessionDto.amount,
        merchantAccount: createSessionDto.merchantAccount,
        reference: createSessionDto.reference,
        returnUrl: createSessionDto.returnUrl,
        ...(createSessionDto.countryCode && { countryCode: createSessionDto.countryCode }),
        ...(createSessionDto.shopper && { shopper: createSessionDto.shopper }),
        ...(createSessionDto.billingAddress && { billingAddress: createSessionDto.billingAddress }),
        ...(createSessionDto.channel && { channel: createSessionDto.channel }),
        ...(createSessionDto.metadata && { metadata: createSessionDto.metadata }),
        ...(createSessionDto.expiresAt && { expiresAt: createSessionDto.expiresAt }),
      };

      const headers = {
        'X-API-Key': this.adyenApiKey,
        'Content-Type': 'application/json',
      };

      this.logger.debug('Sending request to Adyen sessions API', {
        url: `${this.adyenApiUrl}/sessions`,
        reference: createSessionDto.reference,
      });

      const response = await this.httpClientService.post(`${this.adyenApiUrl}/sessions`, {
        data: requestBody,
        headers,
      });

      this.logger.log(`Payment session created successfully: ${response.data.id}`);

      return this.mapAdyenResponse(response.data);
    } catch (error) {
      this.logger.error('Error creating payment session', error);

      if (error.response?.status === 400) {
        throw new BadRequestException(
          this.mapAdyenError(error.response.data),
          'Invalid request parameters',
        );
      }

      if (error.response?.status === 401) {
        throw new InternalServerErrorException('Authentication failed with Adyen');
      }

      if (error.response?.status === 422) {
        throw new BadRequestException(this.mapAdyenError(error.response.data), 'Validation failed');
      }

      throw new InternalServerErrorException('Failed to create payment session');
    }
  }

  async getSession(sessionId: string): Promise<SessionResponseDto> {
    try {
      this.logger.log(`Retrieving payment session: ${sessionId}`);

      if (!this.adyenApiKey) {
        throw new InternalServerErrorException('Adyen API key not configured');
      }

      const headers = {
        'X-API-Key': this.adyenApiKey,
        'Content-Type': 'application/json',
      };

      const response = await this.httpClientService.get(
        `${this.adyenApiUrl}/sessions/${sessionId}`,
        {
          headers,
        },
      );

      this.logger.log(`Payment session retrieved successfully: ${sessionId}`);

      return this.mapAdyenResponse(response.data);
    } catch (error) {
      this.logger.error(`Error retrieving payment session: ${sessionId}`, error);

      if (error.response?.status === 404) {
        throw new BadRequestException('Payment session not found');
      }

      if (error.response?.status === 401) {
        throw new InternalServerErrorException('Authentication failed with Adyen');
      }

      throw new InternalServerErrorException('Failed to retrieve payment session');
    }
  }

  private mapAdyenResponse(adyenResponse: any): SessionResponseDto {
    return {
      id: adyenResponse.id,
      sessionData: adyenResponse.sessionData,
      amount: {
        currency: adyenResponse.amount.currency,
        value: adyenResponse.amount.value,
      },
      merchantAccount: adyenResponse.merchantAccount,
      reference: adyenResponse.reference,
      returnUrl: adyenResponse.returnUrl,
      expiresAt: adyenResponse.expiresAt,
      countryCode: adyenResponse.countryCode,
      paymentMethods: adyenResponse.paymentMethods?.map((pm: any) => pm.type) || [],
    };
  }

  private mapAdyenError(adyenError: any): SessionErrorDto {
    return {
      errorCode: adyenError.errorCode || 'unknown',
      message: adyenError.message || 'An error occurred',
      status: adyenError.status || 500,
      details: adyenError.details || {},
    };
  }
}

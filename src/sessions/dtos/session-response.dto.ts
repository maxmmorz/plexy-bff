import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SessionAmountResponseDto {
  @ApiProperty({
    description: 'The three-character ISO currency code',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    description: 'The amount value in minor units',
    example: 1000,
  })
  value: number;
}

export class SessionResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the session',
    example: 'CSD9CAC34EBAE225DD',
  })
  id: string;

  @ApiProperty({
    description: 'The encrypted session data for frontend use',
    example: 'Ab02b4c...',
  })
  sessionData: string;

  @ApiProperty({
    description: 'The amount information',
    type: SessionAmountResponseDto,
  })
  amount: SessionAmountResponseDto;

  @ApiProperty({
    description: 'Your merchant account identifier',
    example: 'YourMerchantAccount_TEST',
  })
  merchantAccount: string;

  @ApiProperty({
    description: 'Your unique reference for this payment',
    example: 'order_123456',
  })
  reference: string;

  @ApiProperty({
    description: 'The return URL',
    example: 'https://your-website.com/return',
  })
  returnUrl: string;

  @ApiProperty({
    description: 'The date and time when the session expires (ISO 8601 format)',
    example: '2024-12-31T23:59:59Z',
  })
  expiresAt: string;

  @ApiPropertyOptional({
    description: 'Two-character ISO country code',
    example: 'US',
  })
  countryCode?: string;

  @ApiPropertyOptional({
    description: 'Available payment methods for this session',
    example: ['card', 'paypal', 'googlepay'],
  })
  paymentMethods?: string[];
}

export class SessionErrorDto {
  @ApiProperty({
    description: 'Error code',
    example: 'validation',
  })
  errorCode: string;

  @ApiProperty({
    description: 'Error message',
    example: 'Invalid merchant account',
  })
  message: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  status: number;

  @ApiPropertyOptional({
    description: 'Additional error details',
    example: { field: 'merchantAccount', reason: 'not_found' },
  })
  details?: Record<string, any>;
}

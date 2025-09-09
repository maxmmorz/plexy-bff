import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsObject,
  IsEnum,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AmountDto {
  @ApiProperty({
    description: 'The three-character ISO currency code',
    example: 'USD',
    minLength: 3,
    maxLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    description: 'The amount value in minor units (e.g., cents for USD)',
    example: 1000,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  value: number;
}

export class ShopperDto {
  @ApiPropertyOptional({
    description: 'The shopper email address',
    example: 'shopper@example.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'The shopper reference (unique identifier)',
    example: 'user_123',
  })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({
    description: 'The shopper locale',
    example: 'en-US',
  })
  @IsOptional()
  @IsString()
  locale?: string;
}

export class BillingAddressDto {
  @ApiPropertyOptional({
    description: 'Street address',
    example: '123 Main St',
  })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'State or province',
    example: 'NY',
  })
  @IsOptional()
  @IsString()
  stateOrProvince?: string;

  @ApiPropertyOptional({
    description: 'Postal code',
    example: '10001',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({
    description: 'Two-character ISO country code',
    example: 'US',
  })
  @IsOptional()
  @IsString()
  country?: string;
}

export enum ChannelEnum {
  WEB = 'Web',
  IOS = 'iOS',
  ANDROID = 'Android',
}

export class CreateSessionDto {
  @ApiProperty({
    description: 'The amount to be paid',
    type: AmountDto,
  })
  @ValidateNested()
  @Type(() => AmountDto)
  @IsObject()
  amount: AmountDto;

  @ApiProperty({
    description: 'Your merchant account identifier',
    example: 'YourMerchantAccount_TEST',
  })
  @IsString()
  @IsNotEmpty()
  merchantAccount: string;

  @ApiProperty({
    description: 'Your unique reference for this payment',
    example: 'order_123456',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty({
    description: 'The URL to redirect the shopper back to your website after payment',
    example: 'https://your-website.com/return',
  })
  @IsString()
  @IsNotEmpty()
  returnUrl: string;

  @ApiPropertyOptional({
    description: 'Two-character ISO country code where the payment is processed',
    example: 'US',
  })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiPropertyOptional({
    description: 'Shopper information',
    type: ShopperDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShopperDto)
  shopper?: ShopperDto;

  @ApiPropertyOptional({
    description: 'Billing address information',
    type: BillingAddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BillingAddressDto)
  billingAddress?: BillingAddressDto;

  @ApiPropertyOptional({
    description: 'The platform where the payment is processed',
    enum: ChannelEnum,
    example: ChannelEnum.WEB,
  })
  @IsOptional()
  @IsEnum(ChannelEnum)
  channel?: ChannelEnum;

  @ApiPropertyOptional({
    description: 'Additional metadata for the payment',
    example: { orderId: '12345', customerId: 'cust_123' },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'The date and time when the payment expires (ISO 8601 format)',
    example: '2024-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsString()
  expiresAt?: string;
}

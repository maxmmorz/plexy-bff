import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ResponseInterceptor } from '@tresdoce-nestjs-toolkit/paas';
import { SessionsService } from '../services/sessions.service';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { SessionResponseDto, SessionErrorDto } from '../dtos/session-response.dto';

@ApiTags('Sessions')
@Controller('sessions')
@UseInterceptors(ResponseInterceptor)
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);

  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a payment session',
    description:
      'Creates a new Adyen payment session with the provided payment details. The session can be used by the frontend to initiate the payment flow.',
  })
  @ApiBody({
    type: CreateSessionDto,
    description: 'Payment session creation data',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payment session created successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request data',
    type: SessionErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: SessionErrorDto,
  })
  async createSession(@Body() createSessionDto: CreateSessionDto): Promise<SessionResponseDto> {
    this.logger.log(`Creating session for reference: ${createSessionDto.reference}`);
    return await this.sessionsService.createPaymentSession(createSessionDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a payment session',
    description:
      'Retrieves an existing payment session by its ID. Returns session details including status and configuration.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique session identifier',
    example: 'CSD9CAC34EBAE225DD',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment session retrieved successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Session not found',
    type: SessionErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: SessionErrorDto,
  })
  async getSession(@Param('id') id: string): Promise<SessionResponseDto> {
    this.logger.log(`Retrieving session: ${id}`);
    return await this.sessionsService.getSession(id);
  }
}

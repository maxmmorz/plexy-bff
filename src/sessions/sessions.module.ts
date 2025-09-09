import { Module } from '@nestjs/common';
import { HttpClientModule } from '@tresdoce-nestjs-toolkit/http-client';
import { SessionsController } from './controllers/sessions.controller';
import { SessionsService } from './services/sessions.service';

@Module({
  imports: [HttpClientModule],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}

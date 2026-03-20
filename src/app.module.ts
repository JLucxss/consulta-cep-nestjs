import { Module } from '@nestjs/common';
import { BuscaCepController } from './app.controller';
import { BuscaCepService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BuscaCepController],
  providers: [BuscaCepService],
})
export class AppModule {}

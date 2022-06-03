import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { CatsService } from '../cats/cats.service';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService],
  imports: [CatsService],
})
export class OwnersModule {}

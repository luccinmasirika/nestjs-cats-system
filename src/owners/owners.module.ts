import { Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService],
  imports: [CatsModule],
})
export class OwnersModule {}

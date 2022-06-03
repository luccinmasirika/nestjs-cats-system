import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [CatsModule, OwnersModule],
  controllers: [AppController],
})
export class AppModule {}

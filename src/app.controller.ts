import { Get, Injectable, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Injectable()
@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Welcome to the cats API!';
  }
}

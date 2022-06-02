import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Get('breed/:breed')
  findOneByBreed(@Param('breed') breed: string) {
    return this.catsService.findOneByBreed(breed);
  }

  @Get('/average-age')
  averageAge() {
    return 'this.catsService.averageAge()';
  }

  @Get('/oldest')
  oldest() {
    return this.catsService.findOldest();
  }

  @Get('/youngest')
  youngest() {
    return this.catsService.findYoungest();
  }

  @Get('/count')
  count() {
    return this.catsService.count();
  }

  @Get('sort/:order')
  sortByAge(@Param('order') order: 'asc' | 'desc') {
    return this.catsService.sortByAge(order);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }

  @Delete('/remove-all')
  removeAll() {
    return this.catsService.removeAll();
  }

  @Delete('/remove-by-breed/:breed')
  removeByBreed(@Param('breed') breed: string) {
    return this.catsService.removeByBreed(breed);
  }
}

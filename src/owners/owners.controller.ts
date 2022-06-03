import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Owners')
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Patch('/adopt/:catId/:ownerId')
  adopt(@Param('catId') catId: string, @Param('ownerId') ownerId: string) {
    return this.ownersService.adopt(+ownerId, +catId);
  }

  @Patch('/adopt/:catId/:oldOwnerId/:newOwnerId')
  transfer(
    @Param('catId') catId: string,
    @Param('oldOwnerId') oldOwnerId: string,
    @Param('newOwnerId') newOwnerId: string,
  ) {
    return this.ownersService.transfer(+oldOwnerId, +newOwnerId, +catId);
  }

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownersService.remove(+id);
  }

  @Delete('delete/all')
  removeAll() {
    return this.ownersService.removeAll();
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNumber()
  id: number;

  @ApiProperty({ type: String, example: 'Kitty' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, example: 3 })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ type: String, example: 'Birman' })
  @IsString()
  @IsNotEmpty()
  breed: string;
}

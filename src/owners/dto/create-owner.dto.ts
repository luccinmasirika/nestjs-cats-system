import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsNumber()
  id: number;

  @ApiProperty({ type: String, example: 'Kitty' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: [{ catId: 1, adoptedOn: '01-06-2022' }],
  })
  cats: { catId: number; adoptedOn: Date }[];
}

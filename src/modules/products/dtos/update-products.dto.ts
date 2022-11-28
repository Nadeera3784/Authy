import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  export class UpdateProductsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    price: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description  : string;
  }
import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  export class EmailAvailabilityDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

  }
  
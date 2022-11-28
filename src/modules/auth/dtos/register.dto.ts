import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Match } from '../decorators/match.decorator';
  
  export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    password: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    @Match<RegisterDto>('password')
    password_confirmation: string;

  }
  
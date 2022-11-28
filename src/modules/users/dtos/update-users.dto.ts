import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Roles } from '../enums/roles.enum';

  export class UpdateUsersDto {
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
    @IsOptional()
    @MinLength(8)
    @ApiProperty()
    password?: string;
  
    @IsOptional()
    @ApiProperty()
    role?: Roles;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    provider?: string;
  }
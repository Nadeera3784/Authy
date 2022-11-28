import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    Validate,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { Roles } from '../enums/roles.enum';
  import { EmailFilter } from '../filters/email.filter';

  export class CreateUsersDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Validate(EmailFilter, ['email'])
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
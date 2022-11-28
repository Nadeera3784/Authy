import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsersService } from '../services/users.service';    

@ValidatorConstraint({ name: 'emailFilter', async: true })
@Injectable()
export class EmailFilter {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string) {
    const user = await this.usersService.getByParameter({ email: email});
    return !user;

  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}

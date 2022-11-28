import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';
import { AuthService } from '../../auth/services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserCreatedListener {
  constructor(
    private readonly authService:  AuthService,
    private readonly usersService:  UsersService
  ) {  
  }

  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    const id = event.id;
    const user = await this.usersService.getById(id);
    await this.authService.sendWelcomeGreeting(user);
  }
  
}

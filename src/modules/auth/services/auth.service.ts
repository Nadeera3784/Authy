import { InjectQueue } from "@nestjs/bull";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Queue } from "bull";

import { HashService } from "../../util/services/hash.service";
import { UsersService } from "../../users/services/users.service";

@Injectable()
export class AuthService {

    constructor(
        @InjectQueue('welcome-greeting') private welcomeGreetingQueue: Queue,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
        private readonly usersService: UsersService,
    ) {}

    public async login(password: string, user: any) {
        const isPasswordMatching = await this.hashService.compare(
            password,
            user.password,
        );
        return isPasswordMatching;
    }

    public async createToken(payload: object) {
        const accessToken = await this.jwtService.sign(payload);
        return {
          type: 'Bearer',
          accessToken : accessToken
        };
    }

    public async parseToken(token:any){
      return this.jwtService.decode(token);
    }

    public async sendWelcomeGreeting(user: any) {
        const url = 'www.authy.com';
        const options = {
          to: user.email,
          from: 'noreply@authy.com',
          subject: 'Welcome to Authy',
          template: 'new-account',
          context: {
            url: url,
            username: user.name,
          },
        };
        await this.welcomeGreetingQueue.add('send-welcome-greeting', options, {
          attempts: 3,
        });
    }
    
    public async validateBasicAuthUser(payload: any) {
      const user = await this.usersService.getById(payload.id);
      if (!user) {
        throw new HttpException(
          'Invalid token',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    }

    public async validateSocialAuthUser(payload: any, provider: string) {
      const user = await this.usersService.getByParameter({email : payload.email});
      if (!user) {
        const newUser = await this.usersService.create({
          email: payload.email,
          name: payload.firstName + ' ' + payload.lastName,
          provider: provider,
        });
        return newUser;
      }
      return user;
    }
    
    public async syncSocialAuth(payload: any){
      const token = {
        id : payload.id
      }
      return await this.createToken(token);
    }

}
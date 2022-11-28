import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EventEmitter2 } from '@nestjs/event-emitter';

import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";
import { EmailAvailabilityDto } from "../dtos/email-availability.dto";
import { UsersService } from '../../users/services/users.service';
import { AuthService } from '../services/auth.service';
import { Response as ResponseType  } from '../../util/enums/response.enum';
import { UserCreatedEvent } from '../../users/events/user-created.event';
import JwtGuard from "../guards/jwt.guard";
import {GoogleGuard} from "../guards/google.guard";
import {FacebookGuard} from "../guards/facebook.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
      private readonly usersService : UsersService,
      private readonly authService : AuthService,
      private eventEmitter: EventEmitter2,
    ){}

    @Post('/login')
    @ApiOperation({ summary: 'Auth login' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Login successfully',
    })
    public async login(@Res() response, @Body() loginDto: LoginDto){        
        try {
          const user = await this.usersService.getByParameter({email: loginDto.email});
          if(user){
            const isPasswordMatching = await this.authService.login(loginDto.password, user);
            if(isPasswordMatching){
              const payload = {
                id: user.id
              };
              const token = await this.authService.createToken(payload);
              return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'Login successfully',
                data: token,
              });
            }else{
              return response.status(HttpStatus.BAD_REQUEST).json({
                type: ResponseType.ERROR,
                message: 'Invalid credentials',
                data: null,
              });
            }           
          }
          return response.status(HttpStatus.BAD_REQUEST).json({
            type: ResponseType.ERROR,
            message: 'There is no user associated with this email',
            data: null,
          });
        } catch (error) {
          return response.status(HttpStatus.BAD_REQUEST).json({
            type: ResponseType.ERROR,
            message: 'Something went wrong, Please try again later',
            data: null,
          });
        }  
    }   

    @Post('/register')
    @ApiOperation({ summary: 'Auth register' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'You have been successfully registered',
    })
    public async register(@Res() response, @Body() registerDto: RegisterDto){
        try {
            delete registerDto.password_confirmation;
            const user = await this.usersService.create(registerDto);
            if(user){
              const payload = {
                id: user.id
              };
              const token = await this.authService.createToken(payload);
              const userCreatedEvent = new UserCreatedEvent(user.id);
              this.eventEmitter.emit('user.created', userCreatedEvent);
              return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'You have been successfully registered',
                data: token,
              });
            }
        } catch (error) {
          return response.status(HttpStatus.BAD_REQUEST).json({
            type: ResponseType.ERROR,
            message: 'Something went wrong, Please try again later',
            data: null,
          });
        }
    }

    @Post('/email-availability')                          
    @ApiOperation({ summary: 'Check email availability' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'This email address is  available',
    })
    public async emailAvailability(@Res() response, @Body() emailAvailabilityDto: EmailAvailabilityDto){
      try {
        const user = await this.usersService.getByParameter({email:emailAvailabilityDto.email});
        if(user){
          return response.status(HttpStatus.OK).json({
            type: ResponseType.SUCCESS,
            message: 'This email address is not available',
            data : {
              availability :  false
            }
          });
        }
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'This email address is  available',
          data : {
            availability :  true
          }
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }

    @Get('/me')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Me' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'User data been successfully fetched successfully',
    })
    public async me(@Req() request, @Res() response){
        const user = {
          id: request.user.id,
          name: request.user.name,
          email: request.user.email,
          role: request.user.role
        };
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'You have been successfully registered',
          data: user,
        });
    }

  @Get('auth/google')
  @UseGuards(GoogleGuard)
  @ApiOperation({ summary: 'Google auth' })
  public async googleLogin() {}


  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  @ApiOperation({ summary: 'Google callback URL' })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong, Please try again later',
  })
  @ApiResponse({
    status: 200,
    description: '',
  })
  public async googleAuthCallback(@Req() request, @Res() response) {
    try {
       return this.authService.syncSocialAuth(request.user);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  
  @Get('auth/facebook')
  @UseGuards(FacebookGuard)
  @ApiOperation({ summary: 'Facebook auth' })
  public async facebookLogin() {}


  @Get('/facebook/callback')
  @UseGuards(FacebookGuard)
  @ApiOperation({ summary: 'Facebook callback URL' })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong, Please try again later',
  })
  @ApiResponse({
    status: 200,
    description: '',
  })
  public async facebookAuthCallback(@Req() request, @Res() response) {
    try {
      return this.authService.syncSocialAuth(request.user);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseType.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

}
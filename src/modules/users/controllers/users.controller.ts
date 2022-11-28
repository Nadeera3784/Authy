import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UsersService } from '../services/users.service';
import { Response as ResponseType  } from '../../util/enums/response.enum';
import { CreateUsersDto } from "../dtos/create-users.dto";
import { UpdateUsersDto } from "../dtos/update-users.dto";
import { RoleGuard } from "../../auth/guards/role.guard";
import JwtGuard from "../../auth/guards/jwt.guard";
import {Roles} from "../enums/roles.enum";
import { RolesAllowed } from '../../auth/decorators/role.decorator';
import {IdParamValidation} from '../../util/decorators/id-param-validation.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtGuard, RoleGuard)
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Get users' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Users has been fetched successfully',
    })
    public async getAll(
      @Res() response,
      @Query('orderBy') orderBy?: 'asc' | 'desc', 
    ){        
      try {
        const users = await this.usersService.getAll({ orderBy: {updatedAt: orderBy}});
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'Users has been fetched successfully',
          data: users,
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }   

    @Get('/:id')
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Get user' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'User has been fetched successfully',
    })
    public async getById(@Res() response, @Param() {id} : IdParamValidation) {
      try {
        const user = await this.usersService.getById(id);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'User has been fetched successfully',
          data: user,
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }

    @Post()
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'User has been created successfully',
    })
    public async create(@Res() response, @Body() createUsersDto: CreateUsersDto) {
      try {
        const user = await this.usersService.create(createUsersDto);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'User has been created successfully',
          data: user,
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }

    @Put('/:id')
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'User has been updated successfully',
    })
    public async update(@Res() response,  @Param() {id} : IdParamValidation, @Body() updateUsersDto: UpdateUsersDto) {
      try {
        const user = await this.usersService.update(id, updateUsersDto);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'User has been updated successfully',
          data: user,
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }  
    
    @Delete('/:id')
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'User has been deleted successfully',
    })
    public async delete(@Res() response,  @Param() {id} : IdParamValidation) {
      try {
        const user = await this.usersService.delete(id);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'User has been deleted successfully',
          data: user,
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }

}
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ProductsService } from '../services/products.service';
import { CacheService } from '../../util/services/Cache.service';
import { Response as ResponseType  } from '../../util/enums/response.enum';
import { CreateProductsDto } from "../dtos/create-products.dto";
import { UpdateProductsDto } from "../dtos/update-products.dto";
import { RoleGuard } from "../../auth/guards/role.guard";
import JwtGuard from "../../auth/guards/jwt.guard";
import {Roles} from "../../users/enums/roles.enum";
import { RolesAllowed } from '../../auth/decorators/role.decorator';
import {IdParamValidation} from '../../util/decorators/id-param-validation.decorator';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtGuard, RoleGuard)
export class ProductsController {

    constructor(
        private readonly cacheService: CacheService,
        private readonly productsService: ProductsService
    ){}

    @Get()
    @RolesAllowed(Roles.USER, Roles.ADMIN)
    @ApiOperation({ summary: 'Get products' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Products has been fetched successfully',
    })
    public async getAll(
      @Res() response,
      @Query('orderBy') orderBy?: 'asc' | 'desc', 
    ){        
      try {
        const cacheKey = 'product:getAll';
        const cachedData =  await this.cacheService.get(cacheKey);
        if(cachedData){
          return response.status(HttpStatus.OK).json({
            type: ResponseType.SUCCESS,
            message: 'Products has been fetched successfully',
            data: cachedData,
          });
        }
        const products = await this.productsService.getAll({ orderBy: {updatedAt: orderBy}});
        await this.cacheService.set(cacheKey, 60, products);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'Products has been fetched successfully',
          data: products,
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
    @RolesAllowed(Roles.USER, Roles.ADMIN)
    @ApiOperation({ summary: 'Get product' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Product has been fetched successfully',
    })
    public async getById(@Res() response, @Param() {id} : IdParamValidation) {
      try {
        const product = await this.productsService.getById(id);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'Product has been fetched successfully',
          data: product,
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
    @ApiOperation({ summary: 'Create product' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Product has been created successfully',
    })
    public async create(@Res() response, @Body() createProductsDto: CreateProductsDto) {
      try {
        const product = await this.productsService.create(createProductsDto);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'Product has been created successfully',
          data: product,
        });
      } catch (error) {
        console.log('error', error);
        return response.status(HttpStatus.BAD_REQUEST).json({
          type: ResponseType.ERROR,
          message: 'Something went wrong, Please try again later',
          data: null,
        });
      }
    }

    @Put('/:id')
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Update product' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Product has been updated successfully',
    })
    public async update(@Res() response, @Param() {id} : IdParamValidation, @Body() updateProductsDto: UpdateProductsDto) {
      try {
        const product = await this.productsService.update(id, updateProductsDto);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'Product has been updated successfully',
          data: product,
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
    @ApiOperation({ summary: 'Delete product' })
    @ApiResponse({
      status: 400,
      description: 'Something went wrong, Please try again later',
    })
    @ApiResponse({
      status: 200,
      description: 'Product has been deleted successfully',
    })
    public async delete(@Res() response, @Param() {id} : IdParamValidation) {
      try {
        const product = await this.productsService.delete(id);
        return response.status(HttpStatus.OK).json({
          type: ResponseType.SUCCESS,
          message: 'Product has been deleted successfully',
          data: product,
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
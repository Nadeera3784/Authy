import { Injectable } from "@nestjs/common";

import { PrismaService } from '../../util/services/prisma.service';
import { CreateProductsDto } from "../dtos/create-products.dto";
import { UpdateProductsDto } from "../dtos/update-products.dto";

@Injectable()
export class ProductsService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    public async getAll(query:object) {
        return await this.prisma.product.findMany(query);
    }

    public async getById(id: number) {
        return await this.prisma.product.findFirst({where: {id : id}});
    }

    public async getByParameter(query: object) {
        return await this.prisma.product.findFirst({where : query});
    }

    public async create(createProductsDto:CreateProductsDto) {
        const product =  await this.prisma.product.create({data: createProductsDto});
        return product;

    }

    public async update(id: number, updateProductsDto: UpdateProductsDto) {
        return await this.prisma.product.update({
            data : updateProductsDto,
            where : {
                id : id
            }
        });
    }
    
    public async delete(id: number) {
        return await this.prisma.product.delete({
            where : {
                id : id
            }
        });
    }

}
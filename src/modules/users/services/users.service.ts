import { Injectable } from "@nestjs/common";

import { PrismaService } from '../../util/services/prisma.service';
import { HashService } from '../../util/services/hash.service';
import { CreateUsersDto } from "../dtos/create-users.dto";
import { UpdateUsersDto } from "../dtos/update-users.dto";

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashService : HashService,
    ) {}

    public async getAll(query:object) {
        return await this.prisma.user.findMany(query);
    }

    public async getById(id: number) {
        return await this.prisma.user.findFirst({where: {id : id}});
    }

    public async getByParameter(query: object) {
        return await this.prisma.user.findFirst({where : query});
    }

    public async create(createUsersDto:CreateUsersDto) {
        if(createUsersDto.password){
            createUsersDto.password = await this.hashService.make(createUsersDto.password);
        }
        const user =  await this.prisma.user.create({data: createUsersDto});
        return user;
    }

    public async update(id: number, updateUsersDto: UpdateUsersDto) {
        return await this.prisma.user.update({
            data : updateUsersDto,
            where : {
                id : id
            }
        });
    }
    
    public async delete(id: number) {
        return await this.prisma.user.delete({
            where : {
                id : id
            }
        });
    }

}
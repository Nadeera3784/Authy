import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../util/services/prisma.service';
import {CreateProductsDto} from '../dtos/create-products.dto';

const IProduct = new CreateProductsDto();
IProduct.name = "HP OMEN 16.1";
IProduct.price = "1349";
IProduct.description = "Play your best from anywhere with the OMEN by HP 16.1 Gaming Laptop PC"

describe('ProductsService', () => {
  let productsService: ProductsService;
  const mockPrismaService = {
    product: {
       findMany  : () => Promise.resolve([{id: 99, ...IProduct}]),
       findFirst : () => Promise.resolve({id: 99, ...IProduct}),
       create    : () => Promise.resolve({id : 100, ...IProduct}),
       update    : () => Promise.resolve({id : 100, ...IProduct}),
       delete    : () => Promise.resolve({id : 100, ...IProduct}),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        PrismaService
      ],
    })
    .overrideProvider(PrismaService)
    .useValue(mockPrismaService)
    .compile();
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('getAll method', () => {
    it('should have defined', async () => {
      expect(productsService.getAll).toBeDefined();
    });
    it('return array should contains id', async () => {
      const products = await productsService.getAll([]);
      expect(products[0]).toHaveProperty('id');
    });
    it('return array should contains name', async () => {
      const products = await productsService.getAll([]);
      expect(products[0]).toHaveProperty('name');
    });
    it('return array should contains price', async () => {
      const products = await productsService.getAll([]);
      expect(products[0]).toHaveProperty('price');
    });
    it('return array should contains description', async () => {
      const products = await productsService.getAll([]);
      expect(products[0]).toHaveProperty('description');
    });
  });

  describe('getById method', () => {
    it('should have defined', async () => {
      expect(productsService.getById).toBeDefined();
    });
    it('return array should contains id', async () => {
      const product = await productsService.getById(99);
      expect(product).toHaveProperty('id');
    });
    it('should get id equal to return id', async () => {
      const product = await productsService.getById(99);
      expect(product.id).toEqual(99)
    });
    it('return array should contains id', async () => {
      const product = await productsService.getById(99);
      expect(product).toHaveProperty('id');
    });
    it('return array should contains name', async () => {
      const product = await productsService.getById(99);
      expect(product).toHaveProperty('name');
    });
    it('return array should contains price', async () => {
      const product = await productsService.getById(99);
      expect(product).toHaveProperty('price');
    });
    it('return array should contains description', async () => {
      const product = await productsService.getById(99);
      expect(product).toHaveProperty('description');
    });
  });


  describe('getByParameter method', () => {
    it('should have defined', async () => {
      expect(productsService.getByParameter).toBeDefined();
    });
    it('return array should contains id', async () => {
      const product = await productsService.getByParameter({name : IProduct.name});
      expect(product).toHaveProperty('id');
    });
    it('should get parameter equal to return parameter', async () => {
      const product = await productsService.getByParameter({name : IProduct.name});
      expect(product.name).toEqual(IProduct.name)
    });
    it('return array should contains name', async () => {
      const product = await productsService.getByParameter({name : IProduct.name});
      expect(product).toHaveProperty('name');
    });
    it('return array should contains price', async () => {
      const product = await productsService.getByParameter({name : IProduct.name});
      expect(product).toHaveProperty('price');
    });
    it('return array should contains description', async () => {
      const product = await productsService.getByParameter({name : IProduct.name});
      expect(product).toHaveProperty('description');
    });
  });

  describe('create method', () => {
    it('should have defined', async () => {
      expect(productsService.create).toBeDefined();
    });
    it('should create a new product', async () => {
      expect(await productsService.create(IProduct)).toEqual({id:100, ...IProduct})
    });
  });


  describe('delete method', () => {
    it('should have defined', async () => {
      expect(productsService.delete).toBeDefined();
    });
    it('should delete the product', async () => {
      expect(await productsService.delete(100)).toEqual({id:100, ...IProduct});
    });
  });

});

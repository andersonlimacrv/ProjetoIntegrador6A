import { ProductRepository } from "../product.repository";
import { Product } from "../../../entities/product";
import { PrismaClient } from "@prisma/client";

export class ProductRepositoryPrisma implements ProductRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new ProductRepositoryPrisma(prisma);
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
    await this.prisma.product.create({
      data,
    });
  }

  public async update(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data,
    });
  }

  public async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return Product.with(
      product.id,
      product.name,
      product.price,
      product.quantity
    );
  }

  public async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    if (!products) {
      return [];
    }
    return products.map((product) =>
      Product.with(product.id, product.name, product.price, product.quantity)
    );
  }
}

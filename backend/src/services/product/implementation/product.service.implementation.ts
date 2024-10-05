import {
  ProductService,
  BuyOutputDto,
  ListOutputDto,
  SellOutputDto,
  CreateOutPutDto,
} from "../product.service";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { Product } from "../../../entities/product";
export class ProductServiceImplementation implements ProductService {
  private constructor(readonly repository: ProductRepository) {}

  public static build(repository: ProductRepository) {
    return new ProductServiceImplementation(repository);
  }

  public async sell(id: string, amount: number): Promise<SellOutputDto> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error("Product " + id + "not found");
    } else {
      try {
        product.sell(amount);
        await this.repository.update(product);

        const output: SellOutputDto = {
          id: product.id,
          balance: product.quantity,
        };

        return output;
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    }
  }
  public async buy(id: string, amount: number): Promise<BuyOutputDto> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error("Product " + id + "not found");
    } else {
      try {
        product.buy(amount);
        await this.repository.update(product);

        const output: BuyOutputDto = {
          id: product.id,
          balance: product.quantity,
        };

        return output;
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    }
  }

  public async create(name: string, price: number): Promise<CreateOutPutDto> {
    const product = Product.create(name, price);
    await this.repository.save(product);
    const output: CreateOutPutDto = {
      id: product.id,
      balance: product.quantity,
    };
    return output;
    
  }
  public async list(): Promise<ListOutputDto> {
    const aProducts = await this.repository.list();
    if (!aProducts) {
      throw new Error("Products not found");
    }
    const products = aProducts.map((p) => {
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        balance: p.quantity,
      };
    });
    const output: ListOutputDto = {
      products,
    };

    return output;
  }
}

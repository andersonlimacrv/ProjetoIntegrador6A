/* Contrato -> Interface:
    Contratos são uma boa prática, pois permitem fazer a conexão entre servico e controler com as implentações concretas, 
    sem que alguem que dependa de um respositorio precise conhecer a implementação concreta.
*/
import { Product } from "../../entities/product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  list(): Promise<Product[]>;
}

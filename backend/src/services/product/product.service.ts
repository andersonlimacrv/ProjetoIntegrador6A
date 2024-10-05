export type SellOutputDto = {
  id: string;
  balance: number;
};

export type BuyOutputDto = {
  id: string;
  balance: number;
};

export type ListOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    balance: number;
  }[];
};


export type CreateOutPutDto = {
  id: string;
  balance: number;
};


export interface ProductService {
  sell(id: string, amount: number): Promise<SellOutputDto>;
  buy(id: string, amount: number): Promise<BuyOutputDto>;
  create(name: string, price: number): Promise<CreateOutPutDto>;
  list(): Promise<ListOutputDto>;
}

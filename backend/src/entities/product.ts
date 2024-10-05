export type ProducsProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
export class Product {
  private constructor(readonly props: ProducsProps) {}

  public static create(name: string, price: number) {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      price,
      quantity: 0,
    });
  }

  public static with(
    id: string,
    name: string,
    price: number,
    quantity: number
  ) {
    return new Product({
      id,
      name,
      price,
      quantity,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get quantity() {
    return this.props.quantity;
  }
  public buy(amount: number) {
    this.props.quantity += amount;
  }
  public sell(amount: number) {
    if (amount > this.props.quantity) {
      throw new Error("O saldo do produto não é suficiente.");
    }
    this.props.quantity -= amount;
  }
}

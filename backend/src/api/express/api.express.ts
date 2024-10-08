import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public addGetRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.get(path, handle);
  }

  public addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.post(path, handle);
  }

  public addPutRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.put(path, handle);
  }

  public addDeleteRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.delete(path, handle);
  }

  public async start(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      this.printRouter();
    });
  }

  private printRouter() {
    const routes = this.app._router.stack
      .filter((r: any) => r.route)
      .map((r: any) => {
        return {
          path: r.route?.path,
          method: r.route?.stack[0].method,
        };
      });
    console.table(routes);
  }
}

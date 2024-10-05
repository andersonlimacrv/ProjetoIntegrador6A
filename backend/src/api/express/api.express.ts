import { Api } from "../api";
import express, { Express, Request } from "express";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public addGeRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.get(path, handle);
  }
}

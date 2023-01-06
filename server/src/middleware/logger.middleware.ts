import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  // console.log(`Request headers: ${JSON.stringify(req.headers)}`);
  // console.log(`Request body: ${JSON.stringify(req.body)}`);
  next();
}

import { User } from "@prisma/client";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user: {
    userId: User["id"];
    email: User["email"];
    refreshToken?: string;
  };
}

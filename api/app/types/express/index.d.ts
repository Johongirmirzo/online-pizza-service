import { Request } from 'express';
import { Role } from "../token";
import { CustomerStatus } from "../customer";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        email: string;
        role: Role;
      };
      customer: {
        id: number;
        phone: string;
        status: CustomerStatus;
      }
    }
  }
}
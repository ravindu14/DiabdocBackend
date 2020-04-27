import { Request } from "express";
import { User } from "../../authentication/authentication.interface";

export default interface AuthorizedRequest extends Request {
  user: User;
  headers: any;
  body: any;
}

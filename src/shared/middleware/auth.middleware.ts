import * as jwt from "jsonwebtoken";

import userModel from "../../authentication/authentication.model";
import AuthorizedRequest from "../interfaces/authorizedRequest.interface";

import { NextFunction, Response } from "express";
import { DataInToken } from "../../authentication/authentication.interface";
import {
  AuthenticationTokenMissingException,
  InvalidAuthenticationTokenException
} from "../exceptions/request.exception";
import { JWT_SECRET } from "../config/keys";

async function authMiddleware(
  request: AuthorizedRequest,
  response: Response,
  next: NextFunction
) {
  const header = request.headers;
  if (header && header.authorization) {
    try {
      const { _id } = jwt.verify(
        header.authorization,
        JWT_SECRET
      ) as DataInToken;
      const user = await userModel.findOne({ _id });
      if (user) {
        request.user = user;
        next();
      } else {
        next(new InvalidAuthenticationTokenException());
      }
    } catch (error) {
      next(new InvalidAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;

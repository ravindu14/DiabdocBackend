import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import Controller from "../shared/interfaces/controller.interface";
import validationMiddleware from "../shared/middleware/validation.middleware";
import authMiddleware from "../shared/middleware/auth.middleware";
import userModel from "./authentication.model";

import { JWT_SECRET } from "../shared/config/keys";
import {
  UserNotFoundException,
  WrongCredentialsException,
  UserAlreadyExistsException,
} from "./authentication.exceptions";
import { User, TokenData, DataInToken } from "./authentication.interface";
import { CreateUserDto, LogInDto } from "./authentication.dto";

export default class AuthenticationController implements Controller {
  public router = express.Router();
  private user = userModel;
  private path = "/auth";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.signIn
    );
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.signUp
    );

    this.router.get(`${this.path}/userData`, authMiddleware, this.getUser);

    this.router.put(`${this.path}/profile`, authMiddleware, this.updateUser);
  }

  private signIn = async (
    { body: { username, password } }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const user = await this.user.findOne({ username }).select({
      password: 1,
      username: 1,
      gender: 1,
      risk: 1,
    });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const token = this.createToken(user);
        response.send({
          token,
          success: true,
          gender: user.gender,
          risk: user.risk,
        });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new UserNotFoundException());
    }
  };

  private signUp = async (
    {
      body: {
        email,
        password,
        username,
        age,
        gender,
        height,
        weight,
        sbp,
        dbp,
        chol,
        trigl,
        hdl,
        ldl,
        smoke,
        drink,
        family,
        risk,
      },
    }: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    console.log("came here");
    if (await this.user.findOne().or([{ email }, { username }])) {
      next(new UserAlreadyExistsException(email, username));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData: {
        email: string;
        username: string;
        password: string;
        age: number;
        gender: string;
        height: number;
        weight: number;
        sbp: number;
        dbp: number;
        chol: number;
        trigl: number;
        hdl: number;
        ldl: number;
        smoke: boolean;
        drink: boolean;
        family: boolean;
        risk: number;
      } = {
        username,
        email,
        age,
        password: hashedPassword,
        gender,
        height,
        weight,
        sbp,
        dbp,
        chol,
        trigl,
        hdl,
        ldl,
        smoke,
        drink,
        family,
        risk,
      };

      const user = await this.user.create(userData);

      const token = this.createToken(user);

      response.send({
        token,
        gender,
        success: true,
        risk,
      });
    }
  };

  private getUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData = await this.user.findOne(request.user);

    if (!userData) {
      return response.status(404).json("No User found");
    }
    response.status(200).json({ success: true, data: userData });
  };

  private updateUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = await this.user.findOneAndUpdate(
        { _id: request.user._id },
        request.body
      );

      if (user === null) {
        return response.status(400).json({
          success: false,
          data: {
            errorCode: 400,
            errorMessage: "User could not be found",
          },
        });
      } else {
        const updatedUser = {
          ...request.body,
        };
        response.status(200).json({ success: true, data: updatedUser });
      }
    } catch (error) {
      return response.status(500).json({
        success: false,
        data: {
          errorCode: 500,
          errorMessage: error,
        },
      });
    }
  };

  private createToken({ _id, username }: User): TokenData {
    const expiresIn = 31536000;
    const dataStoredInToken: DataInToken = {
      _id,
      username,
    };
    return {
      expiresIn,
      key: jwt.sign(dataStoredInToken, JWT_SECRET, {
        expiresIn,
      }),
    };
  }
}

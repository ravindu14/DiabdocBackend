import HttpException from "../shared/exceptions/HttpException";

export class UserNotFoundException extends HttpException {
  constructor() {
    super(404, `User not found`);
  }
}

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(400, `Your email is password is incorrect.`);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string, username: string) {
    super(
      400,
      `User with email ${email} or username ${username} already exists.`
    );
  }
}

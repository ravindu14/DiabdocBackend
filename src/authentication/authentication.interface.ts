export interface User {
  _id: string;
  username: string;
  email: string;
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
}

export interface TokenData {
  key: string;
  expiresIn: number;
}

export interface DataInToken {
  _id: string;
  username: string;
}

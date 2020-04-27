import { IsString, IsEmail, IsNumber, IsBoolean } from "class-validator";

export class LogInDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsNumber()
  public age: number;

  @IsString()
  public gender: string;

  @IsNumber()
  public height: number;

  @IsNumber()
  public weight: number;

  @IsNumber()
  public sbp: number;

  @IsNumber()
  public dbp: number;

  @IsNumber()
  public chol: number;

  @IsNumber()
  public trigl: number;

  @IsNumber()
  public hdl: number;

  @IsNumber()
  public ldl: number;

  @IsBoolean()
  public smoke: boolean;

  @IsBoolean()
  public drink: boolean;

  @IsBoolean()
  public family: boolean;

  @IsNumber()
  public risk: number;
}
